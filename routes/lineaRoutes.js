import express from 'express';
import Project from '../models/Project.js';
import Task from '../models/taskModel.js';

const router = express.Router();

router.get('/index', async (req, res) => {
    try {
        // Obtiene todos los proyectos con sus tareas asociadas
        const proyectos = await Project.find().populate({
            path: 'tareas',
            model: 'Task'
        });
        console.log('Proyectos y Tareas:', proyectos);

        // Formatea fechas en formato ISOString
        const proyectosFormateados = proyectos.map(project => ({
            ...project.toObject(),
            tareas: project.tareas.map(task => ({
                ...task.toObject(),
                startDate: task.startDate.toISOString(),
                endDate: task.endDate.toISOString()
            }))
        }));

        res.render('index', { proyectos: proyectosFormateados });
    } catch (error) {
        console.error('Error al obtener datos del proyecto:', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        res.status(500).send('Error interno del servidor');
    }
});


router.post('/addProject', async (req, res) => {
  const { projectName, inicioProyecto, finProyecto } = req.body;

  const startDate = new Date(inicioProyecto);
  const endDate = new Date(finProyecto);
  const durationInDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  try {
    const newProject = new Project({
      projectName,
      inicioProyecto,
      finProyecto,
      duracion: durationInDays,
    });

    await newProject.save();
    console.log('Proyecto agregado con éxito');
    res.redirect('index');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al guardar el proyecto');
  }
});


router.post('/addTask', async (req, res) => {
    const { taskTitle, projectSelect, inicioTarea, finTarea, dependencies } = req.body;
  
    try {
      const newTask = new Task({
        title: taskTitle,
        project: projectSelect,
        startDate: inicioTarea,
        endDate: finTarea,
        dependencies: dependencies, // Asegúrate de que dependencies es un array de ObjectId
      });
  
      await newTask.save();
      console.log('Tarea agregada con éxito');
      res.redirect('/index');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al guardar la tarea');
    }
  });

  

  router.get('/gantt', (req, res) =>{
    res.render('gantt')
});


export default router;











/* router.get('/dashboard', (req, res) =>{
    res.render('dashboard')
}); */