import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    projectName: {
      type: String,
      required: true,
    },
    inicioProyecto: {
      type: Date,
      required: true,
    },
    finProyecto: {
      type: Date,
      required: true,
    },
    duracion: {
      type: Number,
      required: true,
    },
    tareas: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
    }],  
  });
  

const Project = mongoose.model('Project', projectSchema);

export default Project;




