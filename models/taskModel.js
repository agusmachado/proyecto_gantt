import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    dependencies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      }],
  });
  
  const Task = mongoose.model('Task', taskSchema);
  
  export default Task;
  

