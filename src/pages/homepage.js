import {Button} from 'semantic-ui-react';
import React from 'react';
import {Link} from "react-router-dom";
import DiscoForm from '../components/DiscoForm';
import DiscoItem from '../components/DiscoItem';
import axios from 'axios';

class HomePage extends React.Component{

	state = { 
		open: false,
		listaDisco: []
	}

	componentDidMount(){
		this.getDiscos();
	}

  	open = () => this.setState({ open: true })
  	
  	close = () => this.setState({ open: false })

  	deleteItem = (id) => {
  		console.log(id);
  		axios.delete("/api/disco", {data: {id: id}})
  			.then(res => {
  				console.log(res)
  			})
  			.catch((error) => {
  				console.log(error);
  			})
  		this.getDiscos();
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

	submit = data => {
		if(data.imageFile){
			data.data.image = data.imageFile.name;
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
				<Button id="addDisco-btn" className="mini ui primary button" style={{position: "relative", left:"1em"}} onClick={this.open}>+</Button>
			<hr/>

			<div className="ui cards">
				{this.state.listaDisco.map( (item, index) => {
					return <DiscoItem key={item.id} data={item} deleteItem={this.deleteItem} url={process.env.PUBLIC_URL}></DiscoItem>
				})}
			</div>

			<DiscoForm submit={this.submit} open={this.state.open} onOpen={this.open} onClose={this.close}/>
			</div>	
		);
	}
	
}

export default HomePage;