import mongoose from 'mongoose';

const esquemaLineaTiempo = mongoose.Schema({
  // Nombre de la línea de tiempo, cadena de texto, requerido y sin espacios al inicio o al final
  nombre: {
    type: String,
    trim: true,
    required: true,
  },
  // Fecha de inicio de la línea de tiempo, tipo de dato fecha, requerido
  fechaInicio: {
    type: Date,
    required: true,
  },
  // Fecha de fin de la línea de tiempo, tipo de dato fecha, requerido, con validación personalizada
  fechaFin: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        // Verifica que la fecha de fin sea posterior o igual a la fecha de inicio
        return value >= this.fechaInicio;
      },
      // Mensaje de error en caso de que la validación no sea exitosa
      message: 'La fecha de fin debe ser posterior o igual a la fecha de inicio.',
    },
  },
});

// Creamos el modelo 'LineaTiempo' utilizando el esquema definido
const LineaTiempo = mongoose.model('LineaTiempo', esquemaLineaTiempo);

// Exportamos el modelo para ser utilizado en otras partes de la aplicación
export default LineaTiempo;
