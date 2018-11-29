import React from 'react';
import {Panel, Button} from 'react-bootstrap';
//import { compose } from 'recompose';
//import { withRouter } from 'react-router-dom';
//import { Form, Field } from 'react-final-form';

class DiscoItem extends React.Component {

  render() {
    return (
		
		<Panel>
			<Panel.Heading>Panel heading without a title</Panel.Heading>
			<Panel.Body><img src="../public/favicon.ico" width="150px" height="auto"/></Panel.Body>
			<Panel.Footer>
				<div className="clearfix">
                <div className="btn-group btn-group-sm pull-right">
                  <Button to="robot-detail" className="btn btn-blue" title="Detail">
                    <span className="fa fa-eye">detalhes</span>
                  </Button>
                  <Button to="robot-edit" className="btn btn-orange" title="Edit">
                    <span className="fa fa-edit">Edit</span>
                  </Button>
                  <Button className="btn btn-danger" title="Remove">
                    <span className="fa fa-times">X</span>
                  </Button>
                </div>
				</div>
			</Panel.Footer>
		</Panel>
		
    );
  }
}

export default DiscoItem;