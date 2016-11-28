"use strict";
import React from 'react';
import CrudDataModel from '../crud_data_model.js';


export default class CrudForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			age: null,
			address: null
		};
		this.crudDataModel = new CrudDataModel();
	}

	handleChange(param, event) {
		let newState = {};
		newState[param] = event.target.value;
		this.setState(newState);
	}


	putClient(postData) {
		let o = this.props.option;
		let option = {
			url: o.url,
			type: o.type,
			data: postData
		};
		let success = function(response) {
			let type = o.stateType;
			this.props.callbackParent({
				type: type
			});
			console.log("put success");
		}.bind(this);
		let error = function(xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this);

		this.crudDataModel.requestData(option, success, error);
	}



	handleSubmit(event) {
		let $curTarget = $(event.target);
		$curTarget.parent().remove();
		this.putClient(this.state);
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
					<div className="form_botton">
						<input type="submit" value="Submit" />
						<input type="reset" value="Reset" />
					</div>
				</form> 
		</div>
		);
	}
}