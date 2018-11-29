import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button} from 'semantic-ui-react';
//import { compose } from 'recompose';
//import { withRouter } from 'react-router-dom';
//import { Form, Field } from 'react-final-form';
import Validator from 'validator';
import InlineError from './InlineError';

class DiscoForm extends React.Component{
	state = {
		data: {
			nome_album: '',
			gravadora: '',
			data_lancamento: ''
		},
		loading: false,
		errors: {}
	}
	
	onChange = e => this.setState({ data: {...this.state.data, [e.target.name]: e.target.value}});
	
	onSubmit = () =>  {
		const errors = this.validate(this.state.data);
		this.setState({errors});
		if(Object.keys(this.state.errors).length ===0){
			this.props.submit(this.state.data);
		}
	}

	validate = (data) => {
		const errors = {};
		if(!data.nome_album) errors.nome_album = "nao pode ser nulo";
		return errors;
	}

	render(){
		return(
			<Form onSubmit={this.onSubmit}>
			<Form.Field error={!!this.state.errors.nome_album}>
				<label htmlFor="nome_album">Nome</label>
				<input type="text" id="nome_album" name="nome_album"
					value={this.state.data.nome_album}
					onChange={this.onChange}
				/>
				{this.state.errors.nome_album && <InlineError text={this.state.errors.nome_album}/>}
			</Form.Field>
			<Form.Field>
				<label htmlFor="gravadora">Gravadora</label>
				<input type="text" id="gravadora" name="gravadora"
					value={this.state.data.gravadora}
					onChange={this.onChange}
				/>
			</Form.Field>
			<Form.Field>
				<label htmlFor="data_lancamento">Data Lancamento</label>
				<input type="text" id="data_lancamento" name="data_lancamento"
					value={this.state.data.data_lancamento}
					onChange={this.onChange}
				/>
			</Form.Field>
			<Button primary>Editar</Button>
			</Form>
		);
	}
}

DiscoForm.propTypes = {
	submit: PropTypes.func.isRequired
};

export default DiscoForm;