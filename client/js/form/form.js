"use strict";
import React from 'react';
import CrudDataModel from '../crud_data_model.js';


export default class CrudForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			age: null,
			address: null,
			error: ""
		};
		this.crudDataModel = new CrudDataModel();
	}

	handleChange(param, event) {
		let newState = {};
		newState[param] = event.target.value;
		this.setState(newState);
	}


	putClient(postData, contianer) {
		let o = this.props.option;
		let option = {
			url: o.url,
			type: o.type,
			data: postData
		};
		let success = function(response) {
			if (response.hint === "error") {
				let errorString = "";
				let responseData = response.data;
				responseData.forEach(function(item) {
					let fieldArr = item.field.split(".");
					errorString += fieldArr[1] + " " + item.message + "; ";
				});
				this.setState({
					error: errorString
				});
				return this;
			}
			let type = o.stateType;
			this.props.callbackParent({
				type: type
			});
			contianer.parent().remove();
			console.log("put success");
		}.bind(this);

		let error = function(xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this);

		this.crudDataModel.requestData(option, success, error);
	}



	handleSubmit(event) {
		let $curTarget = $(event.target);
		let propsData = this.props.option.curData;
		let postData = {
			name: this.state.name || propsData.name,
			age: this.state.age || propsData.age,
			address: this.state.address || propsData.address
		};
		this.putClient(postData, $curTarget);
		event.preventDefault();
	}

	render() {

		let propsData = this.props.option.curData || {};
		return (
			<div>
        		<form className="crud_form" onSubmit={this.handleSubmit.bind(this)}>
		        	<div className="form_item">
					    <span>Name:</span>
					    <input type="text" name="name" value={this.state.name != null ? this.state.name : propsData.name} onChange={this.handleChange.bind(this,"name")}/>
					</div>
					<div className="form_item">
					    <span>Age:</span>
					    <input type="text" name="age" value={this.state.age != null ? this.state.age : propsData.age} onChange={this.handleChange.bind(this,"age")}/>
					</div>
					<div className="form_item">
					    <span>Address:</span>
					    <textarea value={this.state.address != null ? this.state.address : propsData.address} onChange={this.handleChange.bind(this,"address")} />
					</div>
					<div className="form_error">{this.state.error}</div>
					<div className="form_botton">
						<input type="submit" value="Submit" />
					</div>
				</form> 
		</div>
		);
	}
}