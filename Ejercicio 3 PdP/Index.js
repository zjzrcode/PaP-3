const path = require("path");
const Aplicacion = require("./Aplicacion");

const ARCHIVO_TAREAS = path.join(__dirname, "tareas.json");

(async () => {
  const app = new Aplicacion(ARCHIVO_TAREAS);
  await app.mostrarMenuPrincipal();
})();