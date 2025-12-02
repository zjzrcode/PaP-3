const readline = require("readline");
const GestorTareas = require("./GestorTareas");

class Aplicacion {
  constructor(archivo) {
    this.gestor = new GestorTareas(archivo);
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  preguntar(texto) {
    return new Promise((res) => this.rl.question(texto, (resp) => res(resp)));
  }

  async mostrarMenuPrincipal() {
    while (true) {
        console.clear();
      console.log("\n--- MENÚ PRINCIPAL ---");
      console.log("1. Ver tareas");
      console.log("2. Buscar tarea por título");
      console.log("3. Agregar tarea");
      console.log("0. Salir");

      const opcion = await this.preguntar("Opción: ");

      switch (opcion.trim()) {
        case "1":
          await this.verTareas();
          break;
        case "2":
          await this.verTareas(true);
          break;
        case "3":
          await this.agregarTarea();
          break;
        case "0":
          this.rl.close();
          return;
        default:
          console.log("Opción no válida.");
      }
    }
  }

  async verTareas(buscarPorTitulo = false) {
    const tareas = this.gestor.obtenerTareas();
    if (tareas.length === 0) {
      console.log("No hay tareas.");
      return;
    }

    let filtradas = tareas;

    if (buscarPorTitulo) {
      const palabra = await this.preguntar("Ingrese palabra clave del título: ");
      filtradas = tareas.filter((t) =>
        t.titulo.toLowerCase().includes(palabra.toLowerCase())
      );
      if (filtradas.length === 0) {
        console.log("No se encontraron tareas con ese título.");
        return;
      }
    }

    console.log("\n--- LISTADO DE TAREAS ---");
    filtradas.forEach((t, i) => console.log(`${i + 1}. ${t.titulo} [${t.estado}]`));

    const seleccion = await this.preguntar(
      "\nIngrese el número de la tarea para ver detalles (0 para volver): "
    );
    const idx = parseInt(seleccion, 10) - 1;

    if (!isNaN(idx) && idx >= 0 && idx < filtradas.length) {
      await this.mostrarDetallesTarea(filtradas[idx]);
    } else if (seleccion.trim() !== "0") {
      console.log("Opción no válida. Volviendo...");
    }
  }

  async mostrarDetallesTarea(tarea) {
    console.log("\n--- DETALLES DE LA TAREA ---");
    console.log(tarea.mostrarInformacion());

    const opcion = await this.preguntar(
      "\n'e' para editar, 'e' para eliminar, cualquier otra tecla para volver: "
    );
    if (opcion.trim().toLowerCase() === "e") {
      await this.editarTareaIndividual(tarea.id);
    } else if (opcion.trim().toLowerCase() === "d") {
      await this.eliminarTareaIndividual(tarea.id);
    }
  }

  async editarTareaIndividual(id) {
    const titulo = await this.preguntar("Nuevo título (ENTER para mantener): ");
    const descripcion = await this.preguntar(
      "Nueva descripción (ENTER para mantener): "
    );
    const estado = await this.preguntar(
      "Nuevo estado (Pendiente/En Curso/Completada) (ENTER para mantener): "
    );
    const dificultad = await this.preguntar(
      "Nueva dificultad (1-5) (ENTER para mantener): "
    );
    const fechaV = await this.preguntar(
      "Nueva fecha de vencimiento (YYYY-MM-DD) (ENTER para mantener): "
    );

    try {
      this.gestor.editarTarea(id, {
        titulo: titulo || undefined,
        descripcion: descripcion || undefined,
        estado: estado || undefined,
        dificultad: dificultad || undefined,
        fechaVencimiento: fechaV || undefined,
      });
      console.log("Tarea editada correctamente.");
    } catch (e) {
      console.log(e.message);
    }
  }

  async eliminarTareaIndividual(id) {
    try {
      this.gestor.eliminarTarea(id);
      console.log("Tarea eliminada.");
    } catch (e) {
      console.log(e.message);
    }
  }

  async agregarTarea() {
    const titulo = await this.preguntar("Título de la tarea: ");
    if (!titulo.trim()) {
      console.log("El título es obligatorio.");
      return;
    }
    const descripcion = await this.preguntar("Descripción (opcional): ");
    const estado = await this.preguntar("Estado (Pendiente/En Curso/Completada): ");
    const dificultad = await this.preguntar("Dificultad (1-5) [1]: ");
    const fechaV = await this.preguntar("Fecha de vencimiento (YYYY-MM-DD) (opcional): ");

    try {
      this.gestor.agregarTarea({
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        estado: estado || "Pendiente",
        dificultad: dificultad || 1,
        fechaVencimiento: fechaV || null,
      });
      console.log("Tarea agregada correctamente.");
    } catch (e) {
      console.log(e.message);
    }
  }
}
module.exports = Aplicacion;