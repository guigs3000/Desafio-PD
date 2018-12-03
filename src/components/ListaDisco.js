import {Button, Modal} from 'semantic-ui-react';
import React from 'react';
import {Link} from "react-router-dom";
import DiscoDeColecao from './DiscoDeColecao';
import axios from 'axios';

class ListaDisco extends React.Component{

	render(){

		return(
			<div>
			
			<Modal open={this.props.open}
        	onOpen={this.props.onOpen}
        	onClose={this.props.onClose}
        	style={{left: "auto", right: "auto"}}>
			<Modal.Header>Discos da colecao {this.props.colecaoNome}</Modal.Header>
			<Modal.Content>
				<div className="ui list">
					{this.props.listaDisco.map( (item, index) => {
						return <DiscoDeColecao key={index} disco={item} colecaoId={this.props.colecaoId}
						 
						 deleteDiscoFromColecao={this.props.deleteDiscoFromColecao}
						 ></DiscoDeColecao>
					})}
				</div>
			
			</Modal.Content>
			</Modal>

			

			</div>	
		);
	}
	
}

export default ListaDisco;