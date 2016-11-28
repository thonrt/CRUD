import React from 'react';
import ControllerUnit from './operate.js';



export default class TableTbody extends React.Component {
	render() {
		return (
			<tr>
				<td>{this.props.tbodtData.id}</td>
				<td>{this.props.tbodtData.name}</td>
				<td>{this.props.tbodtData.age}</td>
				<td>{this.props.tbodtData.address}</td>
				<ControllerUnit curData = {this.props.tbodtData} callbackParent={this.props.callbackParent}/>
			</tr>
		);
	}
}