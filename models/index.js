const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

// Postgres Configuration
// const { Pool } = require('pg');

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT
// });


// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
// pool.on('error', (err, client) => {
//     console.error('Unexpected Error:', err);
//     process.exit(-1);
// });

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.users = require("./user.model.js")(sequelize, Sequelize);
db.todos = require("./todo.model.js")(sequelize, Sequelize);
db.translations = require("./translations.model.js")(sequelize, Sequelize);

module.exports = db;