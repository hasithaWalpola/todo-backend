module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "147258369",
    DB: "todo-DB",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};