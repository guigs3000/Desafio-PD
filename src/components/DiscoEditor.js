import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Modal} from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from './InlineError';

class DiscoEditor extends React.Component{
  state = {
    data: {
      nome_album: '',
      ano_lancamento: '',
      genero: '',
      gravadora: ''
      
    },
    loading: false,
    errors: {}
  }

  onChange = e => (
    this.setState({ data: {...this.state.data, [e.target.name]: e.target.value}})
  );
  
  onSubmit = () =>  {
    const errors = this.validate(this.state.data);
    let dataForm = this.state.data;
    this.setState({errors});
    if(Object.keys(this.state.errors).length ===0){
      this.props.submit(dataForm);
      this.props.onClose();
    }
  }

  validate = (data) => {
    const errors = {};
    if(!data.nome_album) errors.nome_album = "nao pode ser nulo";
    return errors;
  }

  render(){
    return(
      <Modal open={this.props.open}
          onOpen={this.props.onOpen}
          onClose={this.props.onClose}
          style={{left: "auto", right: "auto"}}>
      <Modal.Header>Edicao do Disco</Modal.Header>
      <Modal.Content>
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
          <label htmlFor="ano_lancamento">Ano Lancamento</label>
          <input type="text" id="ano_lancamento" name="ano_lancamento"
            value={this.state.data.ano_lancamento}
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
        <label htmlFor="genero">Genero</label>
        <input type="text" id="genero" name="genero"
          value={this.state.data.genero}
          onChange={this.onChange}
        />
        
        </Form.Field>

        <Form.Field>
          <label htmlFor="gravadora">Gravadora</label>
          <input type="text" id="gravadora" name="gravadora"
            value={this.state.data.gravadora}
            onChange={this.onChange}
          />
        </Form.Field>
        
      <Button primary>Editar</Button>
      </Form>
      
      </Modal.Content>
      </Modal>
      
    );
  }
}

DiscoEditor.propTypes = {
  submit: PropTypes.func.isRequired
};

export default DiscoEditor;