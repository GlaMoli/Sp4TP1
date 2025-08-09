
class IRepository {
  obtenerPorId(id) {
    throw new Error("Método 'obtenerPorId()' no implementado");
  }

  obtenerTodos() {
    throw new Error("Método 'obtenerTodos()' no implementado");
  }

  buscarPorAtributo(atributo, valor) {
    throw new Error("Método 'buscarPorAtributo()' no implementado");
  }

  obtenerMayoresDe30() {
    throw new Error("Método 'obtenerMayoresDe30()' no implementado");
  }

  crear(data) {
    throw new Error("Método 'crear()' no implementado");
  }

  actualizarPorId(id, data) {
    throw new Error("Método 'actualizarPorId()' no implementado");
  }

  eliminarPorId(id) {
    throw new Error("Método 'eliminarPorId()' no implementado");
  }

  eliminarPorNombre(nombre) {
    throw new Error("Método 'eliminarPorNombre()' no implementado");
  }
}

export default IRepository;
