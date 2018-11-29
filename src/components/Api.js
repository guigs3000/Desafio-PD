import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function getDisco(nome){
	const response = await fetch("/api/disco/" + nome);
	const body = await response.json();
	if (response.status !== 200) throw Error(body.message);

	return body;
		
}

export default getDisco;