import React, { Component } from 'react';
import { Input, Icon, Button, Card, Avatar } from 'antd'
import { Redirect } from 'react-router-dom'
import './Favor.style.css'
import axios from 'axios'


const { Meta } = Card;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTypping: false,
            query: "",
            data: [],
            selected: {},



            visualizar: false,
            typingTimeout: 0,
            atualizaFavoritos: false,


            urlCount: Infinity
        }

    }



    handleChange = async (event) => {
        const { value } = event.target
       
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

        sessionStorage.setItem('favoritos', storage)

        await sessionStorage.setItem('favoritos', JSON.stringify(storage));
        this.setState({ atualizaFavoritos: true })
    }


    handleSelected = async (object) => {
        await this.setState({ selected: object });
        await localStorage.setItem('visualizar', JSON.stringify(object))
        await this.setState({ visualizar: true });
    }

    componentWillMount = async () => {
        this.updateSync();
    }

    updateSync = async () => {
        let storage = await sessionStorage.getItem('favoritos');

        if (!storage) return // NÃO TEM FAVORITOS


        storage = JSON.parse(storage)

        await this.setState({ urlCount: storage.length })

        await this.setState({ data: [] })

        storage.forEach(nome => {
            axios.get("https://swapi.co/api/people/?search=" + nome).then(async res => {
                let data = this.state.data
                data.push(res.data.results[0])
                await this.setState({ data })
                await this.setState({ urlCount: this.state.urlCount - 1 })
                if (this.state.urlCount === 0) {
                  
                    this.setState({ atualizaFavoritos: true })
                }
            })
        });

    }


    render() {
        return (
            <div style={{ minHeight: "80%", height: "100%" }} >

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h1>Meus Favoritos</h1><Button type="primary" onClick={_ => this.updateSync()} style={{ width: "100px" }} size="large"><Icon type="sync" spin={this.state.data.length === 0}></Icon></Button>
                </div>
              
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", justifyContent: this.state.data.length > 2 ? "space-between" : "", }}>
                    {this.state.data.map((item, index) => {
                        return (
                            <Card key={index} style={{
                                width: 300, marginTop: 16, marginLeft: 15, boxShadow: ".1px .1px 1px gray", "animationName": "fadein",
                                "animationDuration": "2s",
                                "animationFillMode": "forwards"
                            }}
                                actions={[<Icon onClick={_ => this.handleSelected(item)} type="eye" />, <Icon onClick={() => this.handleFavor(item.name)} type="heart" style={this.state.atualizaFavoritos ? { color: sessionStorage.getItem('favoritos') == null ? "gray" : (sessionStorage.getItem('favoritos').indexOf(item.name) > 0) ? "red" : "gray" } : { "": "" }} />]}>
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={item.name}
                                    description="Olá sou um personagem de Star Wars"
                                />
                            </Card>
                        );
                    })
                    }
                </div>
                {
                    this.state.visualizar && <Redirect to="/home/visualizar/" push={true} />
                }
            </div>
        );
    }
}

export default Home;