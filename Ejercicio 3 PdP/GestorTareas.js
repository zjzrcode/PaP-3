const fs = require("fs");
const path = require("path");
const Tarea = require("./Tarea");
class GestorTareas {
  constructor(archivo) {
    this.archivo = archivo;
    this.tareas = [];
    this._asegurarArchivo();
    this._cargar();
  }

  _asegurarArchivo() {
    try {
      if (!fs.existsSync(this.archivo)) {
        fs.writeFileSync(this.archivo, JSON.stringify({ tareas: [] }, null, 2), "utf8");
      }
    } catch (e) {
      console.error("Error creando archivo:", e.message);
    }
  }

  _cargar() {
    try {
      const raw = fs.readFileSync(this.archivo, "utf8");
      const obj = JSON.parse(raw);
      this.tareas = (obj.tareas || []).map((t) => new Tarea(t));
    } catch (e) {
      console.error("Error cargando tareas:", e.message);
      this.tareas = [];
    }
  }

  _guardar() {
    try {
      fs.writeFileSync(this.archivo, JSON.stringify({ tareas: this.tareas }, null, 2), "utf8");
    } catch (e) {
      console.error("Error guardando tareas:", e.message);
    }
  }

  obtenerTareas() {
    this._cargar();
    return this.tareas;
  }

  agregarTarea(data) {
    const t = new Tarea(data);
    this.tareas.push(t);
    this._guardar();
    return t;
  }

  editarTarea(id, updates) {
    const idx = this.tareas.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error("Tarea no encontrada");
    this.tareas[idx].editar(updates);
    this._guardar();
    return this.tareas[idx];
  }

  eliminarTarea(id) {
    const idx = this.tareas.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error("Tarea no encontrada");
    this.tareas.splice(idx, 1);
    this._guardar();
  }
}
module.exports = GestorTareas;