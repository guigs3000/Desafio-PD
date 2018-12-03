module.exports = (sequelize, type) => {
    return sequelize.define('disco', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome_album: {
            type: type.STRING,
            allowNull: false
        },
        ano_lancamento: {
            type: type.STRING,
            allowNull: true
        },
        genero: {
            type: type.STRING,
            allowNull: true
        },
        image: {
            type: type.STRING,
            allowNull: true
        },
        gravadora: {
            type: type.STRING,
            allowNull: true
        }
    });
}