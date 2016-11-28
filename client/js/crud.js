"use strict";

import React from 'react';
import ReactDom from 'react-dom';
import CrudTable from './table/table.js';
import CrudHead from './crud_head.js';
import CrudDataModel from './crud_data_model';



export default class Crud extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			type: null,
			data: []
		};
		this.crudDataModel = new CrudDataModel();
	}

	loadClientList(newType) {

		let option = {
			url: "/app"
		};
		let success = function(response) {
			this.setState({
				data: response.data,
				type: newType || "show"
			});
		}.bind(this);
		let error = function(xhr, status, err) {
			this.setState({
				error: err
			});
			console.error(this.props.url, status, err.toString());
		}.bind(this);
		this.crudDataModel.requestData(option, success, error);
	}

	componentWillMount() {
		this.loadClientList();
	}

	headChildChange(newState) {
		this.loadClientList(newState.type);
	}

	tableChildChange(newState) {
		this.loadClientList(newState.type);
	}

	render() {
		return (
			<div>
				<div className="crud_head"> 
					<CrudHead callbackCrudParent={this.headChildChange.bind(this)} value="value"/>         
	        	</div>
        		<div className="crud_content">
        			<div className="crud_table">
        			<CrudTable data={this.state.data} callbackParent={this.tableChildChange.bind(this)}/>
        			</div>
        		</div>   
        	</div>
		);
	}
}