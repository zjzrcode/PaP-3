class Tarea {
  constructor({ id, titulo, descripcion, estado, dificultad = 1, fechaVencimiento }) {
    this.id = id || this.generarId();
    this.titulo = titulo;
    this.descripcion = descripcion || "";
    this.estado = estado || "Pendiente";
    this.dificultad = this.validarDificultad(dificultad);
    this.fechaCreacion = new Date();
    this.fechaVencimiento = fechaVencimiento ? new Date(fechaVencimiento) : null;
    this.ultimaEdicion = new Date();
  }

  generarId() {
    return Math.random().toString(36).substr(2, 8);
  }

  validarDificultad(valor) {
    const num = parseInt(valor, 10);
    if (isNaN(num) || num < 1) return 1;
    if (num > 5) return 5;
    return num;
  }

  getDificultadEstrellas() {
    return "⭐".repeat(this.dificultad);
  }

  mostrarInformacion() {
    return `
Título: ${this.titulo}
Descripción: ${this.descripcion || "Sin datos"}
Estado: ${this.estado}
Dificultad: ${this.getDificultadEstrellas()} (${this.dificultad})
Creada: ${this.fechaCreacion.toLocaleString()}
Última edición: ${this.ultimaEdicion.toLocaleString()}
Vencimiento: ${this.fechaVencimiento ? this.fechaVencimiento.toLocaleDateString() : "Sin fecha"}
    `;
  }

  editar({ titulo, descripcion, estado, dificultad, fechaVencimiento }) {
    if (titulo) this.titulo = titulo;
    if (descripcion) this.descripcion = descripcion;
    if (estado) {
      const validos = ["Pendiente", "En Curso", "Completada"];
      const nuevo = estado.trim().toLowerCase();
      const encontrado = validos.find((v) => v.toLowerCase() === nuevo);
      if (encontrado) this.estado = encontrado;
    }
    if (dificultad) this.dificultad = this.validarDificultad(dificultad);
    if (fechaVencimiento !== undefined)
      this.fechaVencimiento = fechaVencimiento ? new Date(fechaVencimiento) : null;
    this.ultimaEdicion = new Date();
  }
}
module.exports = Tarea;