"use strict";


import React from 'react';
import CrudDataModel from '../crud_data_model.js';


export default class ClientDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [{
                id: '',
                name: '',
                age: '',
                address: ''
            }],
            error: null
        };
        this.crudDataModel = new CrudDataModel();
    }

    componentWillMount() {
        let o = this.props.option;
        let option = {
            url: o.url
        };
        let success = function(response) {
            this.setState({
                loading: false,
                data: response.data
            });
        }.bind(this);
        let error = function(xhr, status, err) {
            this.setState({
                loading: false,
                error: err
            });
            console.error(o.url, status, err.toString());
        }.bind(this);
        this.crudDataModel.requestData(option, success, error);

    }

    handleClick(event) {
        let curTarget = $(event.target);
        $(curTarget).parent().parent().remove();
    }


    render() {
        let singleData = this.state.data[0];
        return (
            <div className="client_detail">
            <div className="single_client client_id">
                <span>Id : </span>
                <span>{singleData.id}</span>
            </div>
            <div className="single_client client_name">
                <span>Name: </span>
                <span>{singleData.name}</span>
            </div>
            <div className="single_client client_age">
                <span>age : </span>
                <span>{singleData.age}</span>
            </div>
            <div className="single_client client_address">
                <span>Address : </span>
                <span>{singleData.address}</span>
            </div>
            <div className="crud_ok" data-value="okbutton" onClick={this.handleClick.bind(this)}><span>Ok</span></div>
        </div>
        );
    }
}