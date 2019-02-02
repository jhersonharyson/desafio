import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import HomeCompenent from './Home.component'


class Home extends Component {
    componentDidMount() {
        this.props.router('Buscar');
    }
    render() {
       
        return (
            <div>
                <HomeCompenent />
            </div>
        );
    }
}

export default Home;