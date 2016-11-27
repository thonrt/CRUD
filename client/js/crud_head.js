"use strict";
import CrudForm from "./form/form.js";
import ReactDom from 'react-dom';

export default class CrudHead extends React.Component {

	onChildCHange(newState) {
		this.props.callbackCrudParent(newState);
	}

	handleClick() {
		let $formContainer = $(".crud_form");
		if ($formContainer && $formContainer.css("display") === "none") {
			$formContainer.show();
			return this;
		}
		let option = {
			url: "/app",
			type: "PUT",
			stateType: "add"
		}
		ReactDom.render(<CrudForm option={option} callbackParent={this.onChildCHange.bind(this)}/>, $('.bella_mask')[0]);
	}

	render() {
		return ( < div className = 'add_crud'
			ref = "addClient"
			onClick = {
				this.handleClick.bind(this)
			} >
			<span>Add</span> < /div>
		);
	}
}