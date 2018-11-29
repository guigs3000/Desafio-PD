import React from 'react';
import DiscoForm from '../components/DiscoForm';


class ColecaoPage extends React.Component {

	submit = data => {
		console.log(data);
	};

	render() {
		return (
			<div>
			<h1>Colecao Page</h1>
			<DiscoForm submit={this.submit}/>
			</div>
		);
	}
}


export default ColecaoPage;