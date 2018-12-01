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
    //console.log(req.file);
    const file = req.file;
    const meta = req.body;
    console.log(meta.data);
    let data = JSON.parse(meta.data);
    //data.image = 
    //res.send();
    Disco.create(data)
        .then(disco => res.json(disco));

});

//Obter todos discos
app.get("/api/discos", (req, res) => {
    console.log(storage);
	Disco.findAll().then(discos => res.json(discos));
});

app.get("/api/disco/:nome", (req, res) => {
	var nome = req.params.nome;
	Disco.findOne({ where: {nome_album: nome}})
		.then(disco => res.json(disco));
});

app.put("/api/disco", (req, res) => {
	var discoUpdate  = req.body;
    console.log(discoUpdate);
	Disco.update(
		{ nome_album: discoUpdate.nome_album ? discoUpdate.nome_album : this.nome_album, 
		  data_lancamento: discoUpdate.data_lancamento ? discoUpdate.data_lancamento : this.data_lancamento,
		  genero: discoUpdate.genero ? discoUpdate.genero : this.genero,
		  gravadora: discoUpdate.gravadora ? discoUpdate.gravadora : this.gravadora
        },
		{where: {id: discoUpdate.id}}
	).then( result => res.json(result));
});

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
app.post('/api/colecao', (req, res) => {
    Colecao.create(req.body)
        .then(colecao => res.json(colecao));
});

app.post('/api/colecoes', (req, res) => {
    Colecao.findAll()
        .then(colecoes => res.json(colecoes));
});

