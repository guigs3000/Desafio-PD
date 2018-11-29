module.exports = (sequelize, type) => {
	return sequelize.define('disco', {
		 id: {
				type: type.INTEGER, 
				primaryKey: true, 
				autoIncrement: true
		 },
		 nome_album:{
				type: type.STRING, 
				allowNull: false
		 },
		 data_lancamento:{
				type: type.DATE, 
				allowNull: true
		 },
		 genero: {
				type: type.STRING,
				allowNull: true
		},
		 image: {
				type: type.BLOB,
		},
		 gravadora: {
				type: type.STRING,
				allowNull: true
		}
	});
}