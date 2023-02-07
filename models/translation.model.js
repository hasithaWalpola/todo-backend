module.exports = (sequelize, Sequelize) => {
    const Translation = sequelize.define("translations", {
        language: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.STRING
        },
    });

    return Translation;
};