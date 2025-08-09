
import { 
  obtenerTodosLosSuperheroes, 
  obtenerSuperheroePorId,
  crearSuperheroe,
  agregarSuperheroe, 
  actualizarSuperheroePorId,
  eliminarSuperheroePorId,
  eliminarSuperheroePorNombre,
  buscarSuperheroesPorAtributo,
  } from '../services/superheroesService.mjs';


import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';

export async function obtenerSuperheroePorIdController(req, res) {
  try {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);

    if (!superheroe) {
      return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
    }

    const superheroeFormateado = renderizarSuperheroe(superheroe);
    res.status(200).json(superheroeFormateado);
    
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al obtener el superhéroe', error: error.message });
  }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
  try {
    const { atributo, valor } = req.params;
    const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
    if (superheroes.length === 0) {
      return res.status(404).send({ mensaje: 'No se encontraron superhéroes con ese atributo' });
    }
    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    return res.status(200).json(superheroesFormateados);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al buscar los superhéroes', error: error.message });
  }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
  try {
    const superheroes = await obtenerSuperheroesMayoresDe30();
    if (superheroes.length === 0) {
      return res.status(404).send({ mensaje: 'No se encontraron superhéroes mayores de 30 años' });
    }
    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).json(superheroesFormateados);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al obtener superhéroes mayores de 30', error: error.message });
  }
}
// POST - Crear nuevo superhéroe
export async function crearSuperheroeController(req, res) {
  try {
    const nuevoSuperheroe = await crearSuperheroe(req.body);
    const formateado = renderizarSuperheroe(nuevoSuperheroe);
    res.status(201).json(formateado);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error interno al crear el superhéroe', error: error.message });
  }
}

// PUT - Actualizar superhéroe por ID
export async function actualizarSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const actualizado = await actualizarSuperheroePorId(id, req.body);

        if (!actualizado) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }

        res.redirect('/api/dashboard'); 

    } catch (error) {
        console.error('Error al actualizar el superhéroe:', error); // Añadir log para depuración
        res.status(400).send({ mensaje: 'Error al actualizar el superhéroe', error: error.message });
    }
}

// DELETE - Eliminar superhéroe por ID
export async function eliminarSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const eliminado = await eliminarSuperheroePorId(id);

        if (!eliminado) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }
        
        res.redirect('/api/dashboard'); // Redirige al dashboard después de eliminar

    } catch (error) {
        console.error('Error al eliminar el superhéroe por ID:', error); // Log para depuración
        res.status(400).send({ mensaje: 'Error al eliminar el superhéroe', error: error.message });
    }
}

// DELETE - Eliminar superhéroe por nombre
export async function eliminarSuperheroePorNombreController(req, res) {
    try {
        const { nombre } = req.params;
        const eliminado = await eliminarSuperheroePorNombre(nombre);

        if (!eliminado) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado con ese nombre' });
        }
        
        res.redirect('/api/dashboard'); // Redirige al dashboard después de eliminar

    } catch (error) {
        console.error('Error al eliminar el superhéroe por nombre:', error); // Log para depuración
        res.status(400).send({ mensaje: 'Error al eliminar el superhéroe por nombre', error: error.message });
    }
}


export async function obtenerTodosLosSuperheroesController(req, res) {
  try {
    const superheroes = await obtenerTodosLosSuperheroes(); // ← volver a la versión original
    console.log("DEBUG: Renderizando vista con:", superheroes); // ← para ver en consola
    res.render('dashboard', { superheroes });
  } catch (error) {
    console.error("Error al cargar el dashboard:", error);
    res.status(500).send("Error interno del servidor.");
  }
}

export const agregarSuperheroeController = async (req, res) => {
    try {          
        const { 
            nombreSuperheroe,
            nombreReal,
            edad,
            planetaOrigen,
            debilidad,
            poder, 
            aliado,
            enemigo,
            creador,
        } = req.body;
        // El customSanitizer en validarSuperheroe.mjs se encarga de eso.
        await agregarSuperheroe({
            nombreSuperheroe,
            nombreReal,
            edad,
            planetaOrigen,
            debilidad,
            poder, // <--- Ahora es el array correcto
            aliado,
            enemigo,
            creador
        });

        // Redirigir a la vista del dashboard
        res.redirect('/api/dashboard');
    } catch (error) {
        console.error('Error al agregar superhéroe:', error);
        // Es buena práctica enviar el mensaje de error para depuración
        res.status(500).send('Hubo un error al agregar el superhéroe: ' + error.message);
    }
};


export async function mostrarFormularioEditarController(req, res) {
    console.log("DEBUG: Entrando a mostrarFormularioEditarController"); // <-- ¡Esta línea también es clave!
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);

        if (!superheroe) {
            console.log("DEBUG: Superhéroe no encontrado para ID:", id);
            return res.status(404).send('Superhéroe no encontrado');
        }

        console.log("DEBUG: Datos del superhéroe para edición (antes de renderizar):", superheroe); 
        res.render('editSuperhero', { superheroe });
    } catch (error) {
        console.error('Error al cargar el formulario de edición:', error);
        res.status(500).send('Error al cargar el formulario de edición: ' + error.message);
    }
}

export function procesarFormularioContacto(req, res) {
  const { nombre, email, mensaje } = req.body;

  // Acá podrías guardar los datos o enviarlos por email
  console.log('Contacto recibido:', { nombre, email, mensaje });

  res.render('contactoConfirmacion', {
    nombre,
    mensaje: '¡Gracias por contactarnos! Te responderemos pronto.'
  });
}

