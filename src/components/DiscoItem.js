import React from 'react';

class DiscoItem extends React.Component {

  deleteItem = () => {
    this.props.deleteItem(this.props.data.id);
  }

  openModalEditDisco = () => {
    this.props.openModalEditDisco(this.props.data.id);
  }

  render() {
    return (
		
    <div className="ui card">
      <div className="image">
        <img src={process.env.PUBLIC_URL + '/imagens/' +  this.props.data.image}/>
      </div>
      <div className="content">
        <span>{this.props.data.nome_album}</span>
      </div>
      <div className="extra content">
      <div className="ui two buttons">
        <div className="ui basic green button" onClick={this.openModalEditDisco}>Edit</div>
        <div className="ui basic red button" onClick={this.deleteItem}>Delete</div>
      </div>
      </div>
      
    </div>
		
    );
  }
}

export default DiscoItem;