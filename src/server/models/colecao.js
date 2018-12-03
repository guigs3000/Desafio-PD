module.exports = (sequelize, type) => {
    return sequelize.define('colecao', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: type.STRING,
            allowNull: false
        },
        descricao: {
            type: type.STRING,
            allowNull: false
        }
    });
}