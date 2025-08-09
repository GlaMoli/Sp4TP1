import { body } from 'express-validator';

export const validarSuperheroe = [
    // Nombre del superhéroe
    body('nombreSuperheroe')
        .trim()
        .notEmpty().withMessage('El nombre del superhéroe es obligatorio.')
        .isLength({ min: 3, max: 60 }).withMessage('Debe tener entre 3 y 60 caracteres.'),

    // Nombre real
    body('nombreReal')
        .trim()
        .notEmpty().withMessage('El nombre real es obligatorio.')
        .isLength({ min: 3, max: 60 }).withMessage('Debe tener entre 3 y 60 caracteres.'),

    // Edad
    body('edad')
        .notEmpty().withMessage('La edad es obligatoria.')
        .isInt({ min: 0 }).withMessage('Debe ser un número entero no negativo.'),

    // Poderes
    body('poder')
            .customSanitizer(value => {
            // Si el valor es un string (viene del input del formulario), lo convertimos en array
            if (typeof value === 'string') {
                return value.split(',').map(s => s.trim()).filter(s => s.length > 0);
            }
            // Si ya es un array, o si es undefined/null (y no es requerido), lo pasamos tal cual.
            // Si no es array ni string, lo convertimos a array vacío para que isArray no falle si es opcional.
            return Array.isArray(value) ? value : [];
        })
        .isArray({ min: 1 }).withMessage('Debe ser un array con al menos un poder.'),

    // Validación para cada elemento dentro del array poderes (se ejecuta después del sanitizer)
    body('poder.*')
        .isString().withMessage('Cada poder debe ser una cadena.')
        .trim()
        .notEmpty().withMessage('Ningún poder puede estar vacío.')
        .isLength({ min: 3, max: 60 }).withMessage('Cada poder debe tener entre 3 y 60 caracteres.'),

    
    body('aliado')
        .customSanitizer(value => {
            if (typeof value === 'string') {
                return value.split(',').map(s => s.trim()).filter(s => s.length > 0);
            }
            return Array.isArray(value) ? value : [];
        })
        .isArray().withMessage('Los aliados deben ser un array.'), // Si es opcional, quitar { min: 1 }
    body('aliado.*')
        .isString().withMessage('Cada aliado debe ser una cadena.')
        .trim()
        .notEmpty().withMessage('Ningún aliado puede estar vacío.')
        .isLength({ min: 3, max: 60 }).withMessage('Cada aliado debe tener entre 3 y 60 caracteres.'),

    // Ejemplo para 'enemigo':
    body('enemigo')
        .customSanitizer(value => {
            if (typeof value === 'string') {
                return value.split(',').map(s => s.trim()).filter(s => s.length > 0);
            }
            return Array.isArray(value) ? value : [];
        })
        .isArray().withMessage('Los enemigos deben ser un array.'), // Si es opcional, quitar { min: 1 }
    body('enemigo.*')
        .isString().withMessage('Cada enemigo debe ser una cadena.')
        .trim()
        .notEmpty().withMessage('Ningún enemigo puede estar vacío.')
        .isLength({ min: 3, max: 60 }).withMessage('Cada enemigo debe tener entre 3 y 60 caracteres.')
];