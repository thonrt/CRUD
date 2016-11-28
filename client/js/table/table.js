"use strict";
import React from 'react';
import ReactDom from 'react-dom';
import TableTbody from './tbody.js';

export default class CrudTable extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let data = this.props.data || [];
		let tbodyArr = [];
		data.forEach(function(value) {
			let $tr = <TableTbody  key={value.id} tbodtData={value} callbackParent={this.props.callbackParent}/>;
			tbodyArr.push($tr);
		}.bind(this));

		return (
			<div className = "crud_table">
				<table>
					<thead>
						<tr>
							<th> Id </th> 
							<th> Name </th> 
							<th> Age </th> 
							<th> Address </th>
							<th>operate</th> 
						</tr> 
					</thead>   
				<tbody> 
				{tbodyArr} 
				</tbody>   
			</table>   
		</div >);
	}
}