import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Modal } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from './InlineError';

class ColecaoForm extends React.Component {
    state = {
        data: {
            nome: '',
            descricao: '',
        },
        loading: false,
        errors: {}
    }
    onChange = e => (
        this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } })
    )

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        let dataForm = this.state.data;
        this.setState({ errors});
        
        if (Object.keys(errors).length === 0) {
            this.props.submit(dataForm);
            this.props.onClose();
        }
    }

    validate = (data) => {
        const errors = {};
        if (!data.nome) errors.nome = "nao pode ser nulo";
        if (!data.descricao) errors.descricao = "album precisa ter descricao";
        return errors;
    }

    render() {
        return (
            <Modal open={this.props.open}
        	onOpen={this.props.onOpen}
        	onClose={this.props.onClose}
        	style={{left: "auto", right: "auto"}}>
			<Modal.Header>Adicione uma Colecao</Modal.Header>
			<Modal.Content>
				<Form onSubmit={this.onSubmit}>
				<Form.Field error={!!this.state.errors.nome}>
				<label htmlFor="nome">Nome</label>
				<input type="text" id="nome" name="nome"
					value={this.state.data.nome}
					onChange={this.onChange}
				/>
				{this.state.errors.nome && <InlineError text={this.state.errors.nome}/>}
				</Form.Field>
				<Form.Field  error={!!this.state.errors.descricao}>
					<label htmlFor="descricao">Descricao</label>
					<input type="text" id="descricao" name="descricao"
						value={this.state.data.descricao}
						onChange={this.onChange}
					/>
					{this.state.errors.descricao && <InlineError text={this.state.errors.descricao}/>}
				</Form.Field>				
			<Button primary>Adicionar</Button>
			</Form>
			
			</Modal.Content>
			</Modal>

        );
    }
}

ColecaoForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default ColecaoForm;