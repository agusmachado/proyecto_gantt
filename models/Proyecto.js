// models/Proyecto.js
import mongoose from 'mongoose';

const esquemaProyecto = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    descripcion: {
      type: String,
      trim: true,
      required: true,
    },
    fechaInicio: {
      type: Date,
      default: Date.now,
      required: true,
    },
    fechaCierre: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          // Verifica que la fecha de cierre sea posterior a la fecha de inicio
          return value >= this.fechaInicio;
        },
        message: 'La fecha de cierre debe ser posterior a la fecha de inicio.',
      },
    },
    cliente: {
      type: String,
      trim: true,
      required: true,
    },
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
    },
    colaboradores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Proyecto = mongoose.model('Proyecto', esquemaProyecto);

export default Proyecto;

