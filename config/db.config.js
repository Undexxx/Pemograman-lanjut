import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const dbname = process.env.DB_NAME
const dbport = process.env.DB_PORT
const dbhost = process.env.DB_HOST
const dbuser = process.env.DB_USER
const dbpassword = process.env.DB_PASSWORD

const db = new Sequelize(dbname, dbuser, dbpassword, {
  host: dbhost,
  dialect: "mysql",
  port: dbport,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  define: {
    timestamps: false,
  },
});

export default db;

/*(async()=>{
await db.sync({ alter: true });
})()*/
