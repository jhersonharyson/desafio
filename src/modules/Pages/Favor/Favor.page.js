import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Favor from './Favor.component'


class Home extends Component {
    constructor(props){
        super(props);
        
    }
    componentDidMount() {
        this.props.router('Favoritos');
    }
    
    render() {
       
        return (
            <div>
                <Favor />
            </div>
        );
    }
}

export default Home;