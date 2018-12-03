const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require("multer");
const { Disco, Colecao} = require('./sequelize');
const fs = require('fs');


const dirName = "./public/imagens";

const app = express();
app.use(bodyParser.json());

const port = 3001
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
});


// configure storage
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, dirName);
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname.replace(/ /g,''));
      },
    });
    const upload = multer({ storage });

//funcoes Disco

//Adicionar disco
app.post('/api/disco', upload.single('file'), (req, res) => {
    const file = req.file;
    const meta = req.body;

    let data = JSON.parse(meta.data);
    Disco.create(data)
        .then(disco => res.json(disco));

});

//Obter todos discos
app.get("/api/discos", (req, res) => {
	Disco.findAll().then(discos => res.json(discos));
});

//Busca pelo nome exato
app.get("/api/disco/:nome", (req, res) => {
	var nome = req.params.nome;
	Disco.findOne({ where: {nome_album: nome}})
		.then(disco => res.json(disco));
});

//Editar informacoes do disco
app.put("/api/disco", (req, res) => {
	var discoUpdate  = req.body;
    Disco.findById(discoUpdate.id)
    .then( disco => {
        Disco.update(
        { nome_album: discoUpdate.nome_album ? discoUpdate.nome_album : disco.nome_album, 
          ano_lancamento: discoUpdate.ano_lancamento ? discoUpdate.ano_lancamento : disco.ano_lancamento,
          genero: discoUpdate.genero ? discoUpdate.genero : disco.genero,
          gravadora: discoUpdate.gravadora ? discoUpdate.gravadora : disco.gravadora
        },
        {where: {id: discoUpdate.id}}
        ).then( result => res.json(result));
    })
	
});

//Exclusao de Disco
app.delete("/api/disco", (req, res) => {
	Disco.findOne({ where: {id: req.body.id}})
        .then(disco => {
            if(disco.image){
                fs.unlink(dirName +"/" + disco.image, (err) => {
                  if (err) throw err;
                  
                });
            }
        }
        );
    Disco.destroy({
		where: { id: req.body.id}
	}).then( rows => res.json(rows));

});

//funcoes Colecoes

//Criacao de colecao
app.post('/api/colecao', (req, res) => {
    Colecao.create(req.body)
        .then(colecao => res.json(colecao));
});

//obter todas colecoes
app.get('/api/colecoes', (req, res) => {
    Colecao.findAll({
        include: [{
            model: Disco,
            required: false,
            attributes: ["id", "nome_album", "image", "ano_lancamento"],
            through: {attributes: []}
        }]
    })
    .then(colecoes => res.json(colecoes));
});

//exclusao de colecao
app.delete("/api/colecao", (req, res) => {
    
    Colecao.destroy({
        where: { id: req.body.id}
    }).then( rows => res.json(rows));

});

//busca discos de uma colecao especifica
app.get("/api/getDiscosDeColecao/:colecaoId", (req, res) => {
    var colecaoId = req.params.colecaoId;

    Colecao.findAll({ 
        include: [{
            model: Disco,
            required: false,
            attributes: ["id", "nome_album", "image", "ano_lancamento"],
            through: {attributes: []}
        }],
        where: {id: colecaoId}
    })
    .then(col => {

        res.json(col[0]);    
    })

})

//adiciona disco a uma colecao
app.post("/api/addDiscoToColecao", (req, res) =>{
    const data = req.body;

    Colecao.find({
        
        include: [{
            model: Disco,
            required: true,
            attributes: ["id", "nome_album", "ano_lancamento"],
            through: {where: {$and: [{colecaoId: data.colecaoId}, {discoId: data.discoId}]}}
        }],
        where: {id: data.colecaoId}

    })
    .then(col => {
        if(col){
            res.json(col.discos);
        }else{
            Colecao.find({
                include: [{
                model: Disco,
                required: false,
                attributes: ["id", "nome_album", "ano_lancamento", "image"],
                through: {attributes: []}
                }],
                where: {id: data.colecaoId}

            })
            .then(c => {
                c.addDisco(data.discoId);
                console.log(c);
                res.json(c.discos);    
            })
        }
    })
})

//deleta disco de uma colecao
app.delete("/api/deleteDiscoFromColecao", (req, res) =>{
    const data = req.body;
    Colecao.find({
        include: [{
            model: Disco,
            required: true,
            attributes: ["id", "nome_album", "ano_lancamento", "image"],
            through: {attributes: []}
        }],
        where: {id: data.colecaoId}
    })
    .then( col =>  {
        col.removeDisco(data.discoId);
        res.json(col.discos);
    })
})

