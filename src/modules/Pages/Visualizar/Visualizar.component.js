import React, { Component } from 'react';
import { Input, Icon, Button, Card, Avatar } from 'antd'
import { Redirect } from 'react-router-dom'



import './Visualizar.style.css'
import axios from 'axios'

// Get the current location.



const { Meta } = Card;

class Vizualizar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "",
            redirect: false
        }

    }


    componentWillMount = () => {
        const selected = localStorage.getItem('visualizar');
        if (!selected) {
            localStorage.removeItem('visualizar');
            this.setState({ redirect: true })
        } else {
            this.setState({ selected })
        }

    }
    componentWillUnmount = () => {
        localStorage.removeItem('visualizar');
    }

    render() {
        return (
            <div style={{ minHeight: "80%", height: "100%" }} >
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <h1>{this.state.selected}</h1> <Button onClick={_ => { this.setState({ redirect: true }) }} type="primary"> Voltar</Button>
                </div>
                
                {
                    this.state.redirect && <Redirect to="/home/" push={true} />
                }
            </div>
        );
    }
}

export default Vizualizar;