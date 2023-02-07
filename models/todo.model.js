module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todos", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.STRING
        },
        trasnlation: {
            type: Sequelize.STRING
        },
    });

    return Todo;
};