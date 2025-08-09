
import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {
  async obtenerPorId(id) {
    return await SuperHero.findById(id);
  }

  async obtenerTodos() {
    return await SuperHero.find({});
  }

  async buscarPorAtributo(atributo, valor) {
    return await SuperHero.find({ [atributo]: valor });
  }

  async obtenerMayoresDe30() {
    return await SuperHero.find({ edad: { $gt: 30 } });
  }
  
  async crear(data) {
    const nuevoSuperheroe = new SuperHero(data);
    return await nuevoSuperheroe.save();
  }

  async actualizarPorId(id, data) {
    return await SuperHero.findByIdAndUpdate(id, data, { new: true });
  }

  async eliminarPorId(id) {
    return await SuperHero.findByIdAndDelete(id);
  }

  async eliminarPorNombre(nombre) {
    return await SuperHero.findOneAndDelete({ nombre });
  }


  async buscarSuperheroePorNombre(nombre) {
    return await SuperHero.find ({ nombre });
    }
}
export function obtenerHeroePorNombre(nombre) {
  // lógica para buscar el héroe en la base de datos
}

export default new SuperHeroRepository();
