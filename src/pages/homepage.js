import {Button} from 'semantic-ui-react';
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
		listaDisco: []
	}

	componentDidMount(){
		this.getDiscos();
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
                this.setState({listaDisco: lista});
                console.log(response);
            }).catch((error) => {
        		console.log(error);
        	});
  	}

	addDisco = data => {
		if(data.imageFile){
			data.data.image = data.imageFile.name.replace(/ /g,'');
		}
		//console.log(data);

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
                alert("The file is successfully uploaded");
                this.getDiscos();
            }).catch((error) => {
        
        	});
	};

	editDisco = data => {
		console.log(data);
		data.id = this.state.editDiscoId;
		axios.put("/api/disco",data)
            .then((response) => {
                alert("The file is successfully uploaded");
                this.getDiscos();
            }).catch((error) => {
        		console.log(error);
        	});
	};


	

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
			<hr/>

			<div className="ui cards">
				{this.state.listaDisco.map( (item, index) => {
					return <DiscoItem key={item.id} data={item} deleteItem={this.deleteItem} openModalEditDisco={this.openModalEditDisco}></DiscoItem>
				})}
			</div>

			<DiscoForm submit={this.addDisco} open={this.state.isOpenModalAddDisco} onOpen={this.openModalAddDiscopen} onClose={this.closeModalAddDisco}/>
			<DiscoEditor submit={this.editDisco} open={this.state.isOpenModalEditDisco} onOpen={this.openModalEditDisco} onClose={this.closeModalEditDisco}></DiscoEditor>
			</div>	
		);
	}
	
}

export default HomePage;