import React from 'react';
import {Button} from 'semantic-ui-react';
import axios from 'axios';

class DiscoDeColecao extends React.Component {

	deleteDiscoFromColecao = () => {
		const data = {
			discoId: this.props.disco.id,
			colecaoId: this.props.colecaoId
		}
		this.props.deleteDiscoFromColecao(data)
	}

    render() {

        return (

        
		  <div className="item">
		  	<div className="right floated content">
      			<Button className="ui icon mini basic button negative" onClick={this.deleteDiscoFromColecao}><i className="close icon"></i></Button>
    		</div>
		    <img className="ui avatar image" src={process.env.PUBLIC_URL + "/imagens/" + this.props.disco.image}/>
		    <div className="content">
		      <a className="header">{this.props.disco.nome_album}</a>
		      <div className="description">{this.props.disco.ano_lancamento}</div>
		    </div>
		  </div>
		

        );
    }
}

export default DiscoDeColecao;