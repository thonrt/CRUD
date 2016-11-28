import React from 'react';
import ReactDom from 'react-dom';
import ClientDetail from '../detail/client_detail.js';
import ClientFrom from '../form/form.js';
import CrudDataModel from '../crud_data_model.js';


export default class ControllerUnit extends React.Component {

    constructor(props) {
        super(props);
        this.crudDataModel = new CrudDataModel();
    }

    handleClick(event) {
        let $curTarget = $(event.target);
        let handleName = $curTarget.attr("data-name");
        let dataId = $curTarget.parent().attr("data-id");
        if (!handleName) {
            return this;
        }
        let func = this[handleName + "Handler"];
        if (typeof(func) === "function") {
            func.call(this, dataId);
        }
    }


    showHandler(dataId) {
        let url = "/app/" + dataId;
        let option = {
            url: url
        };
        ReactDom.render(<ClientDetail option={option}/>, $('.bella_mask')[0]);
    }


    editChange(newState) {
        this.props.callbackParent(newState);
    }


    editHandler(dataId) {
        let url = "/app/" + dataId;
        let option = {
            url: url,
            type: "POST",
            curData: this.props.curData,
            stateType: "post"
        };

        ReactDom.render(<ClientFrom option={option} callbackParent={this.editChange.bind(this)}/>, $('.bella_mask')[0]);
    }

    deleteHandler(dataId) {

        if (!confirm("Are you sure to delete")) {
            return this;
        }
        let url = "/app/" + dataId;
        let option = {
            url: url,
            type: "DELETE"
        };
        let success = function(data) {
            this.props.callbackParent({
                type: "delete"
            });
            console.log("delete success");
        }.bind(this);
        let error = function(xhr, status, err) {
            console.error(url, status, err.toString());
        }.bind(this);

        this.crudDataModel.requestData(option, success, error);
    }

    render() {
        return (
            <td data-id={this.props.curData.id} onClick={this.handleClick.bind(this)}>
            <span className="action" data-name="show">show</span>
            <span className="vertical"></span>
            <span className="action" data-name="edit">edit</span>
            <span className="vertical"></span>
            <span className="action" data-name="delete">delete</span>
            </td>
        );
    }
}