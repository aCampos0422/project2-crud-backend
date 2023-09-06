import express from 'express';
import dataBase from './utils/database.js';
import Task from './models/task.models.js';
import 'dotenv/config';



// inicializando servidor basico
const app = express();
const PORT = process.env.PORT ?? 8000;

// ejecutando la info de la tabla creada en models
Task;

// ejecutando el middleware integrado para insertar info en el body
app.use(express.json());


// haciendo la conexion a la base de datos en postgres
dataBase.authenticate()
.then(() => console.log('conexion exitosa a la db'))
.catch((error) => console.log(error));

// sincronizando la base de datos con los modelos
dataBase.sync()
.then(() => console.log('base de datos sincronizada'))
.catch((error) => console.log(error));


// creando la peticion post para crear tareas
app.post('/tasks', async (req, res) => {
  try{
    const {body} = req;
    const tasks = await Task.create(body);
    res.status(201).json(alls);
  }catch(error) {
    res.status(400).json(error);
  }
});

// creando la peticion GET para todas las tareas
app.get('/tasks', async (req, res) => {
  try{
    const task = await Task.findAll();
    res.json(task);
  }catch(error) {
    res.status(400).json(error);
  }
});

// creando la peticion GET por id con path params
app.get('/tasks/:id', async (req, res) => {
  try{
    const {id} = req.params;
    const tasks = await Task.findByPk(id);
    res.json(tasks);
  }catch(error) {
    res.status(400).json(error);
  }
});

// creando la peticion put para actualizar la info
app.put('/tasks/:id', async (req, res) => {
  try{
    const {id} = req.params;
    const {body} = req;
    const tasks = await Task.update(body, {
      where: {id}
    });
    res.json(tasks);
  }catch(error){
    res.status(400).json(error);
  }
});

// creando la peticion delete de la tarea
app.delete('/tasks/:id', async (req, res) => {
  try{
    const {id} = req.params;
    await Task.destroy({
      where: {id}
    });
    res.status(204).end();
  }catch(error) {
    res.status(400).json(error)
  }
});




app.listen(PORT, () => {
  console.log(`servidor funcionando y corriendo en el puerto ${PORT}`)
});