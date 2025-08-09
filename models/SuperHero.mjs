
import mongoose from 'mongoose';

const superheroSchema = new mongoose.Schema({
  nombreSuperheroe: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 60
  },
  nombreReal: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 60
  },
  edad: {
    type: Number,
    required: true,
    min: 0
  },
  planetaOrigen: {
    type: String,
    default: 'Desconocido'
  },
  debilidad: {
    type: String
  },
  poder: {
    type: [String],
    required: true,
    validate: {
      validator: arr => Array.isArray(arr) && arr.length > 0,
      message: 'Debe incluir al menos un poder válido.'
    }
  },
  aliado: {
    type: [String]
  },
  enemigo: {
    type: [String]
  },
  creador: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const SuperHero = mongoose.model('SuperHero', superheroSchema, 'Grupo-11');

export default SuperHero;
