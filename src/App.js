//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap-theme.min.css';
//import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
//import FormExample from './DiscoEditor';
//import DiscoItem from './DiscoItem';
import { Route, BrowserRouter } from "react-router-dom";
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from "./pages/homepage";
import ColecaoPage from "./pages/colecaopage";


class App extends Component {


	render() {
		return (

			<div>
				<Route path="/" exact component={HomePage} />
				<Route path="/colecao" exact component={ColecaoPage} />

			</div>
			
		);
	}
}

export default App;
