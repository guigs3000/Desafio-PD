import {Button, Search} from 'semantic-ui-react';
import _ from 'lodash';	
import React from 'react';
import {Link} from "react-router-dom";
import DiscoForm from '../components/DiscoForm';
import DiscoItem from '../components/DiscoItem';
import DiscoEditor from "../components/DiscoEditor";
import axios from 'axios';

class HomePage extends React.Component{

	state = { 
		isOpenModalAddDisco: false,
		isOpenModalEditDisco: false,
		editDiscoId: "",
		listaTodosDiscos: [],
		listaDiscosFiltrados: [],
		listaDiscosFiltradosMini: [],
		results:[],
		value: "",
		isLoading: false
	}

	componentDidMount(){
		this.getDiscos();
	}

	componentWillMount() {
    	this.resetComponent()
  	}

	resetComponent = () =>{
        this.setState({ isLoading: false, results: [], value: "" });
        this.setState({listaDiscosFiltrados: this.state.listaTodosDiscos});
	}

	searchToDisco = (lista) => {

		const listaDisco = [];
		lista.map( (item, index) => {
			console.log(item.key)
			const itemFound = this.state.listaTodosDiscos.filter( obj => {
				return obj.id === item.key
			})
			console.log(itemFound);
			listaDisco.push(itemFound[0])
			/*
			const i = _.indexOf(this.state.listaTodosDiscos, {id: item.key})
			console.log(i);	
			if( i != -1) {
				listaDisco.push(this.state.listaTodosDiscos[i]);
			}*/
		})
		
		console.log(listaDisco);
		return listaDisco;
	}

	handleResultSelect = (e, { result }) => {
		this.setState({ value: result.title })
		this.setState({ listaDiscosFiltrados: this.searchToDisco(this.state.results) })
	}

	onSearchChange = (e, {value}) => {
		this.setState({isLoading: true, value});

		setTimeout(() => {
            if (this.state.value.length < 1) this.resetComponent();

            const re = new RegExp(_.escapeRegExp(this.state.value), "i");
            
            const isMatch = result => {
            	console.log(result)
            	return re.test(result.title);
            }
            console.log(this.state.listaDiscosFiltradosMini)
            this.setState({
                isLoading: false,
                results: _.filter(this.state.listaDiscosFiltradosMini, isMatch)
            });

        }, 500);

	}

  	openModalAddDisco = () => this.setState({ isOpenModalAddDisco: true })
  	closeModalAddDisco = () => this.setState({ isOpenModalAddDisco: false })

  	openModalEditDisco = (id) => this.setState({ isOpenModalEditDisco: true , editDiscoId: id})
  	closeModalEditDisco = () => this.setState({ isOpenModalEditDisco: false , editDiscoId: ""})

  	deleteItem = (id) => {
  		console.log(id);
  		axios.delete("/api/disco", {data: {id: id}})
  			.then(res => {
  				console.log(res);
  				this.getDiscos();
  			})
  			.catch((error) => {
  				console.log(error);
  			})

	}

  	getDiscos = () => {
  		axios.get("/api/discos")
            .then((response) => {
                const lista = response.data;
                this.setState({listaTodosDiscos: lista});
                this.setState({listaDiscosFiltrados: lista});
                const listaPequisa = [];
                lista.map((item, index) => {
                	const disco = {key: item.id, title: item.nome_album, image: process.env.PUBLIC_URL + "/imagens/" + item.image}
                	listaPequisa.push(disco)
                })
                this.setState({listaDiscosFiltradosMini: listaPequisa})

            }).catch((error) => {
        		console.log(error);
        	});
  	}

	addDisco = data => {
		console.log(data)
		if(data.imageFile){
			data.data.image = data.imageFile.name.replace(/ /g,'');
		}
		const dataForm = new FormData();

		dataForm.append('file', data.imageFile);
		dataForm.append('data', JSON.stringify(data.data));
		const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
		axios.post("/api/disco",dataForm,config)
            .then((response) => {
                this.getDiscos();
            }).catch((error) => {	
        		alert(error)
        	});
	}

	editDisco = data => {
		console.log(data)
		data.id = this.state.editDiscoId;
		axios.put("/api/disco",data)
            .then((response) => {
                this.getDiscos();
            }).catch((error) => {
        		alert(error);
        	});
	}

	render(){

		return(
			<div>
			
			<div className="ui inverted segment">
			  <div className="ui inverted secondary menu">
			    <Link to="/" className="active item">
			      Home
			    </Link>
			    <Link to="/colecao" className="item">
			      Colecao
			    </Link>
			  </div>
			</div>

				<h1 style={{display: "inline-block"}}>Discos</h1>
				<Button id="addDisco-btn" className="mini ui primary button" style={{position: "relative", left:"1em"}} onClick={this.openModalAddDisco}>+</Button>
				<Search
					onSearchChange={this.onSearchChange}
					onResultSelect={this.handleResultSelect}
					loading={this.state.isLoading} 
					results={this.state.results}
					value={this.state.value}
					type="text" placeholder="pesquisar discos..." size="small"
					
				></Search>
			<hr/>

			<div className="ui cards">
				{this.state.listaDiscosFiltrados.map( (item, index) => {
					console.log("cards")
					console.log(item);
					return <DiscoItem key={item.id} data={item} 
					deleteItem={this.deleteItem} 
					openModalEditDisco={this.openModalEditDisco}></DiscoItem>
				})}
			</div>

			<DiscoForm submit={this.addDisco} open={this.state.isOpenModalAddDisco} onOpen={this.openModalAddDiscopen} onClose={this.closeModalAddDisco}/>
			<DiscoEditor submit={this.editDisco} open={this.state.isOpenModalEditDisco} onOpen={this.openModalEditDisco} onClose={this.closeModalEditDisco}></DiscoEditor>
			</div>	
		);
	}
	
}

export default HomePage;