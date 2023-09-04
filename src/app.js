import express from 'express';
import dataBase from './utils/database.js';
import All from './models/all.models.js';



// inicializando servidor basico
const app = express();
const PORT = 8000;

// ejecutando la info de la tabla creada en models
All;

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
app.post('/alls', async (req, res) => {
  try{
    const {body} = req;
    const alls = await All.create(body);
    res.status(201).json(alls);
  }catch(error) {
    res.status(400).json(error);
  }
});

// creando la peticion GET para todas las tareas
app.get('/alls', async (req, res) => {
  try{
    const alls = await All.findAll();
    res.json(alls);
  }catch(error) {
    res.status(400).json(error);
  }
});

// creando la peticion GET por id con path params
app.get('/alls/:id', async (req, res) => {
  try{
    const {id} = req.params;
    const all = await All.findByPk(id);
    res.json(all);
  }catch(error) {
    res.status(400).json(error);
  }
});

// creando la peticion put para actualizar la info
app.put('/alls/:id', async (req, res) => {
  try{
    const {id} = req.params;
    const {body} = req;
    const all = await All.update(body, {
      where: {id}
    });
    res.json(all);
  }catch(error){
    res.status(400).json(error);
  }
});

// creando la peticion delete de la tarea
app.delete('/alls/:id', async (req, res) => {
  try{
    const {id} = req.params;
    await All.destroy({
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