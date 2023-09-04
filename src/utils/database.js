import { Sequelize } from "sequelize";

// Aqui se crea la instancia de la base de datos 
const dataBase = new Sequelize({
  server: 'localhost',
  database: 'project2_db',
  port: 5432,
  username: 'postgres',
  password: 'root',
  dialect: 'postgres'
});

export default dataBase;