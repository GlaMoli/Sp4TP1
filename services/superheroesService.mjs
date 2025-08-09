
import superHeroRepository from '../repositories/SuperHeroRepository.mjs';
import { obtenerHeroePorNombre } from '../repositories/SuperHeroRepository.mjs';


export async function obtenerSuperheroePorId(id) {
    try {
        const superheroeEncontrado = await superHeroRepository.obtenerPorId(id);
        console.log("DEBUG [superheroesService]: Superhéroe encontrado por ID:", superheroeEncontrado); // <-- ¡Esta línea es clave!
        return superheroeEncontrado;
    } catch (error) {
        console.error("Error en servicio 'obtenerSuperheroePorId':", error);
        throw error;
    }
}

export async function obtenerTodosLosSuperheroes() {
  return await superHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor) {
  return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30() {
  return await superHeroRepository.obtenerMayoresDe30();
}

export async function crearSuperheroe(data) {
  return await superHeroRepository.crear(data);
}

export async function actualizarSuperheroePorId(id, data) {
  return await superHeroRepository.actualizarPorId(id, data);
}

export async function eliminarSuperheroePorId(id) {
  return await superHeroRepository.eliminarPorId(id);
}

export async function eliminarSuperheroePorNombre(nombre) {
  return await superHeroRepository.eliminarPorNombre(nombre);
}


export async function agregarSuperheroe(data) {
  return await superHeroRepository.crear(data); 
}

export const buscarHeroePorNombre = async (nombre) => {
  return await obtenerHeroePorNombre(nombre);
};

