import React, { Component } from 'react';
import { Input, Icon, Button, Card, Avatar } from 'antd'
import './Home.style.css'
import axios from 'axios'

const { Meta } = Card;

class Home extends Component {
    constructor(props) {
        super();
        this.state = {
            isTypping: false,
            query: "",
            data: [],

            


          
            typingTimeout: 0,
            atualizaFavoritos: false
        }

    }



    handleChange = async (event) => {
        const { value } = event.target
        console.log(value)
        this.setState({ isTypping: true, query: value })


        if (!value) {
            this.setState({ data: [], isTypping: false })
            return
        };

        const self = this;

        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
        }

        self.setState({
            name: event.target.value,
            isTyping: false,
            typingTimeout: setTimeout(async _ => {
                let res = await axios.get('https://swapi.co/api/people/?search=' + this.state.query)
                res = res.data.results
                await this.setState({ data: res, isTypping: false })
                this.setState({ atualizaFavoritos: true })
            }, 1500)
        });



    }

    handleSubmit = async () => {
        let res = await axios.get('https://swapi.co/api/people/?search=' + this.state.query)
        res = res.data.results
        await this.setState({ data: res, isTypping: false })
        this.setState({ atualizaFavoritos: true })
    }

    handleFavor = async (nome) => { // seria melhor buscar atraves de uma chave ao invés do no nome
        let storage = await sessionStorage.getItem('favoritos');
        storage = JSON.parse(storage)

        if (!storage) {
            storage = []
            storage.push(nome)
        }
        else if (storage.indexOf(nome) >= 0) {
            storage.splice(storage.indexOf(nome), 1)

        } else {
            storage.push(nome)
        }


        console.log(storage)
        console.log(nome)

        sessionStorage.setItem('favoritos', storage)

        await sessionStorage.setItem('favoritos', JSON.stringify(storage));
        this.setState({ atualizaFavoritos: true })
    }

    getColor = async (nome) => {
        const storage = sessionStorage.getItem('favoritos') == null ? "gray" : (storage.filter(n => n != nome)) ? "red" : "gray";
    }



    render() {
        return (
            <div style={{ minHeight: "80%", height: "100%" }} >
                <Input.Search
                    size="large"
                    placeholder="Procurando algum personagem de Start Wars?"
                    //value={this.state.query}
                    prefix={<Icon type="search"></Icon>}
                    onChange={(event) => this.handleChange(event)}
                    onSearch={_ => { this.handleSubmit() }}
                    enterButton={this.state.isTypping ? <Button type="primary" style={{ width: "80px" }}  ><Icon spin type="loading"></Icon></Button> : <Button style={{ width: "80px" }} type="primary"> Buscar</Button>}
                />
                <div>
                    {
                        this.state.data && this.state.query ? `Foram encontrados: ${this.state.data.length} registros` : ""
                    }
                </div>

                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", justifyContent: this.state.data.length > 2 ? "space-between" : "", }}>
                    {this.state.data.map((item, index) => {
                        return (
                            <Card key={index} style={{
                                width: 300, marginTop: 16, marginLeft: 15, boxShadow: ".1px .1px 1px gray", "animationName": "fadein",
                                "animation-duration": "2s",
                                "animation-fill-mode": "forwards"
                            }}
                                actions={[<Icon type="eye" />, <Icon onClick={() => this.handleFavor(item.name)} type="heart" style={this.state.atualizaFavoritos ? { color: sessionStorage.getItem('favoritos') == null ? "gray" : (sessionStorage.getItem('favoritos').indexOf(item.name) > 0) ? "red" : "gray" } : { "": "" }} />]}>
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={item.name}
                                    description="This is the description"
                                />
                            </Card>
                        );
                    })
                    }
                </div>
            </div>
        );
    }
}

export default Home;