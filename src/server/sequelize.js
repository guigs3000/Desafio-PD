var Sequelize = require('sequelize');
var DiscoModel = require('./models/disco');
var ColecaoModel = require('./models/colecao');


var sequelize = new Sequelize('desafiopd', 'root', '50CEd470!@',
{
	host: 'localhost',
	dialect: 'mysql'
},
{
   sync: true,
   forceSync: false 
});

const Disco = DiscoModel(sequelize, Sequelize);
const Colecao = ColecaoModel(sequelize, Sequelize);

Colecao.belongsToMany(Disco, {
	through: "item_colecao",
	foreignKey: "colecaoId"
});

Disco.belongsToMany(Colecao, {
	through: "item_colecao",
	foreignKey: "discoId"
});

sequelize.sync().then(()=>{
	console.log("ok");
});

module.exports = {
	Disco,
	Colecao
}