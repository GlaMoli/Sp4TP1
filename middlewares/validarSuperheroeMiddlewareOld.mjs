/*
export const validarSuperheroeMiddleware = (req, res, next) => {
  const {
    nombreSuperheroe,
    nombreReal,
    edad,
    poderes
  } = req.body;

  // Validación de nombreSuperheroe
  if (
    !nombreSuperheroe ||
    typeof nombreSuperheroe !== 'string' ||
    nombreSuperheroe.trim().length < 3 ||
    nombreSuperheroe.trim().length > 60
  ) {
    return res.status(400).send('El nombre del superhéroe es obligatorio, sin espacios vacíos, y debe tener entre 3 y 60 caracteres.');
  }

  // Validación de nombreReal
  if (
    !nombreReal ||
    typeof nombreReal !== 'string' ||
    nombreReal.trim().length < 3 ||
    nombreReal.trim().length > 60
  ) {
    return res.status(400).send('El nombre real es obligatorio y debe tener entre 3 y 60 caracteres, sin espacios vacíos.');
  }

  // Validación de edad
  if (
    edad === undefined ||
    isNaN(edad) ||
    Number(edad) < 0
  ) {
    return res.status(400).send('La edad es obligatoria, debe ser un número válido y mayor o igual a 0.');
  }

  // Validación de poderes
  if (
    !Array.isArray(poderes) ||
    poderes.length === 0 ||
    poderes.some(
      poder =>
        typeof poder !== 'string' ||
        poder.trim().length < 3 ||
        poder.trim().length > 60
    )
  ) {
    return res.status(400).send('Los poderes deben ser un array con al menos un poder válido, cada uno entre 3 y 60 caracteres, sin espacios vacíos.');
  }

  next();
};
*/