import React from 'react';
import {Button, Dropdown} from 'semantic-ui-react';
import axios from 'axios';

class ColecaoItem extends React.Component {

	state ={
		selected: "1"
	}

	onChangeSelect = (e) => {		
		this.setState({ selected: e.target.value });
	}

	addDiscoToColecao = () => {
		this.props.addDiscoToColecao(this.state.selected, this.props.colecao.id);
	}

	deleteItem = () => {
    	this.props.deleteItem(this.props.colecao.id);
  	}

  	openModal = () => {
  		this.props.openModal(this.props.colecao);
  	}

    render() {

        return (
        	
	            <div className="item" >
	            	<div className="right floated content">
	            	<select className="ui selection dropdown" onChange={this.onChangeSelect} value={this.state.selected}>
	            		{this.props.listaAdicionavel.map((item, index) => {
	            			return <option key={item.id} value={item.id}>{item.nome_album}</option>
	            		})}
	            	</select>
	            	
	      			<button className="ui icon mini basic button primary" onClick={this.addDiscoToColecao}>
	      				Add Discos
	      			</button>
	      			<button className="ui icon mini button negative" onClick={this.deleteItem}>
	      				<i className="close icon"></i>
	      			</button>
	      			
	    			</div>
					<div className="content">
				     <a  className="header" onClick={this.openModal}>{this.props.colecao.nome}</a>
				     <div className="description">{this.props.colecao.descricao}</div>
				    </div>

				    
				</div>
        );
    }
}

export default ColecaoItem;