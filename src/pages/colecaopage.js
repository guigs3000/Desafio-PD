import { Button } from 'semantic-ui-react';
import React from 'react';
import { Link } from "react-router-dom";
import ColecaoItem from "../components/ColecaoItem";
import ColecaoForm from "../components/ColecaoForm";
import ListaDisco from "../components/ListaDisco"


import axios from 'axios';

class ColecaoPage extends React.Component {

	state = {
		listaColecao: [],
		listaDisco: [],
		colecaoSelected: "",
		colecaoIdSelected: "",
		discosDeColecaoSelected: [],
		isOpenModal: false,
		isOpenModalListaDisco: false,
	}

	componentDidMount(){
		this.getColecoes();
		this.getDiscos();
	}

	//Api Requests
	getDiscos = () => {
  		axios.get("/api/discos")
            .then((response) => {
                const lista = response.data;
                this.setState({listaDisco: lista});
            }).catch((error) => {
        		console.log(error);
        	});
  	}

	getColecoes = () => {
  		axios.get("/api/colecoes")
            .then((response) => {
                const lista = response.data;
                this.setState({listaColecao: lista});
                if(this.state.colecaoIdSelected){
                	const col = this.state.listaColecao.find( c => (c.id===this.state.colecaoIdSelected));
                	this.setState({discosDeColecaoSelected: col.discos})
                }
                console.log(response);
            }).catch((error) => {
        		console.log(error);
        	});
  	}

  	getDiscosDeColecao = (colecaoId) => {
		console.log("Atualizar discos de colecao");
		axios.get("/api/getDiscosDeColecao/" + colecaoId)
            .then((response) => {
                console.log(response.data);
                const lista = response.data.discos;
                
                const listaCopy = this.state.listaColecao.slice();
                listaCopy.forEach((col) =>{
                	if(col.id === colecaoId){
                		col.discos = lista;
                	}
                })

                this.setState({listaColecao: listaCopy });
                if(this.state.colecaoIdSelected === colecaoId){
                	this.setState({discosDeColecaoSelected: lista})
                }
            }).catch((error) => {
        		console.log(error);
        	});
	}

  	submit = data => {
		console.log(data);
		data.id = this.state.editDiscoId;
		axios.post("/api/colecao",data)
            .then((response) => {
                console.log(response);
            }).catch((error) => {
        		console.log(error);
        	});
	}

	addDiscoToColecao = (discoId, colecaoId) => {
		const data = {discoId: discoId, colecaoId: colecaoId};
		const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
		axios.post("/api/addDiscoToColecao", data, config)
            .then((response) => {
            	//set discos de colecao
            	console.log(response.data);
            	const lista = response.data;
            	const listaCopy = this.state.listaColecao.slice();
                listaCopy.forEach((col) =>{
                	if(col.id === colecaoId){
                		col.discos = lista;
                	}
                })
                //this.setState({listaColecao: listaCopy });
                //this.setState({discosDeColecaoSelected: lista})
                this.getColecoes();
            }).catch((error) => {
        		console.log(error)
        	});
	}

	deleteDiscoFromColecao = (data) => {
		const dataSend = {
  			discoId: data.discoId,
  			colecaoId: data.colecaoId	
  		}

  		axios.delete("/api/deleteDiscoFromColecao", {data: dataSend}) 
  			.then(res => {
  				//set discos de colecao
  				const lista = res.data;
  				console.log(res.data);
            	const listaCopy = this.state.listaColecao.slice();
                listaCopy.forEach((col) =>{
                	if(col.id === data.colecaoId){
                		col.discos = lista;
                	}
                })
                console.log(listaCopy)
                /*this.setState({listaColecao: listaCopy });
                this.setState({discosDeColecaoSelected: lista});*/
                //this.getDiscosDeColecao(data.colecaoId);
                this.getColecoes();
  			})
  			.catch((error) => {
  				console.log(error);
  			})
	}

	deleteItem = (id) => {
  		console.log(id);
  		axios.delete("/api/colecao", {data: {id: id}})
  			.then(res => {
  				console.log(res);
  			})
  			.catch((error) => {
  				console.log(error);
  			})

	}

	//modais
	openModal = () => this.setState({ isOpenModal: true })
  	closeModal = () => this.setState({ isOpenModal: false })

  	openModalListaDisco = (colecao) => {
  		//if(discosDeColecao.colecaoId)
  		this.setState(
  		{ 
  			isOpenModalListaDisco: true,
  			colecaoSelected: colecao.nome,
  			colecaoIdSelected: colecao.id,
  			discosDeColecaoSelected: colecao.discos
  		})
  	}

  	closeModalListaDisco = () => this.setState({ isOpenModalListaDisco: false })


	render() {
		return (
			<div>
				<div className="ui inverted segment">
					<div className="ui inverted secondary menu">
					<Link to="/" className="item">
					Home
					</Link>
					<Link to="/colecao" className="active item">
					Colecao
					</Link>
					</div>
				</div>
				

				<h1 style={{display: "inline-block"}}>Colecoes</h1>
				<Button id="addColecao-btn" className="mini ui primary button" style={{position: "relative", left:"1em"}} onClick={this.openModal}>+</Button>
				<hr/>

				<div className="ui relaxed divided list">
				{this.state.listaColecao.map( (item, index) => {
					return <ColecaoItem key={item.id} colecao={item} listaAdicionavel={this.state.listaDisco}
					deleteItem={this.deleteItem} 
					openModal={this.openModalListaDisco}
					addDiscoToColecao={this.addDiscoToColecao}>
					</ColecaoItem>
				})}
				</div>

				<ListaDisco 
				open={this.state.isOpenModalListaDisco} 
				onOpen={this.openModalListaDisco} 
				onClose={this.closeModalListaDisco}
				colecaoNome={this.state.colecaoSelected}
				colecaoId={this.state.colecaoIdSelected}
				listaDisco={this.state.discosDeColecaoSelected}
				deleteDiscoFromColecao={this.deleteDiscoFromColecao}
				></ListaDisco>

				<ColecaoForm submit={this.submit} open={this.state.isOpenModal} onOpen={this.openModal} onClose={this.closeModal} />

			</div>
		);
	}
}
export default ColecaoPage;