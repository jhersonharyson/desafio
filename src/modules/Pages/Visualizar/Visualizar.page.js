import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import VisualizarComponent from './Visualizar.component'


class Visualizar extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount() {
        this.props.router('Vizualizar');
    }
    render() {
       
        return (
            <div>
                <VisualizarComponent />
            </div>
        );
    }
}

export default Visualizar;