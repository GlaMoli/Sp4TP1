
import express from 'express';
import {
  obtenerTodosLosSuperheroesController,
  mostrarFormularioEditarController,
  crearSuperheroeController,
  agregarSuperheroeController,
  actualizarSuperheroePorIdController,
  eliminarSuperheroePorIdController,
  eliminarSuperheroePorNombreController,
  procesarFormularioContacto,
  } from '../controllers/superheroesController.mjs';

// Validaciones específicas del modelo
import { validarSuperheroe } from '../middlewares/validacionesSuperheroes.mjs';

// Middleware para manejar errores de validación
import { validarResultados } from '../middlewares/validarResultados.mjs';

const router = express.Router();
console.log("DEBUG: Router de superhéroes cargado");

// Rutas GET
router.get('/dashboard', obtenerTodosLosSuperheroesController); // Muestra el dashboard con los superhéroes
router.get('/add', (req, res) => res.render('addSuperhero')); // Muestra el formulario para agregar
router.get('/edit/:id', mostrarFormularioEditarController); // Muestra el formulario para editar un superhéroe específico
router.get('/heroes', obtenerTodosLosSuperheroesController);



// Ruta POST con validaciones y manejo de errores para agregar un superheroe
router.post('/heroes/agregar', validarSuperheroe, validarResultados, agregarSuperheroeController);
router.post('/enviarContacto', procesarFormularioContacto);

// Rutas PUT y DELETE
router.put('/heroes/:id/editar', validarSuperheroe, validarResultados, actualizarSuperheroePorIdController);
router.delete('/heroes/:id', eliminarSuperheroePorIdController);
router.delete('/heroes/nombre/:nombre', eliminarSuperheroePorNombreController);

export default router;

