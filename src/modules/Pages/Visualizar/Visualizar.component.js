import React, { Component } from 'react';
import { Input, Icon, Button, Card, Avatar, Divider, Table } from 'antd'
import { Redirect } from 'react-router-dom'



import './Visualizar.style.css'
import axios from 'axios'

const { Meta } = Card;

class Vizualizar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {},
            species : {},
            redirect: false
        }

    }


    componentWillMount = async () => {
        let selected = await localStorage.getItem('visualizar');

        if (!selected) {
            await localStorage.removeItem('visualizar');
            await this.setState({ redirect: true })
        } else {
            selected = await JSON.parse(selected)
            await this.setState({ selected })
            const res = await axios.get(selected.species[0])
            const species = res.data
            await this.setState({species})
            console.log(species)
        }

    }
    componentWillUnmount = () => {
        localStorage.removeItem('visualizar');
    }

    render() {
        const { selected, species } = this.state

        const columns = [{
            dataIndex: 'label',
        }, {
            dataIndex: 'value',
        }];
        const data = [{
            key: '1',
            label: <Content label="Nome" />,
            value: selected.name,

        }, {
            key: '2',
            label: <Content label="Gênero" />,
            value: selected.gender,

        }, {
            key: '3',
            label: <Content label="Ano de nascimento" />,
            value: selected.birth_year

        },
        {
            key: '4',
            label: <Content label="Cor dos olhos" />,
            value: selected.eye_color

        },
        {
            key: '5',
            label: <Content label="Cor dos cabelos" />,
            value: selected.hair_color

        },
        {
            key: '6',
            label: <Content label="Cor da pele" />,
            value: selected.skin_color

        },
        {
            key: '7',
            label: <Content label="Altura" />,
            value: selected.height

        },
        {
            key: '8',
            label: <Content label="Peso" />,
            value: selected.mass
        },
        ];

        const dataSpecies = [{
            key: '1',
            label: <Content label="Espécie" />,
            value: species.name,

        }, {
            key: '2',
            label: <Content label="Classificação" />,
            value: species.classification,

        }, {
            key: '3',
            label: <Content label="Denominação" />,
            value: species.designation

        },
        {
            key: '4',
            label: <Content label="Altura média" />,
            value: species.average_height

        },
        {
            key: '5',
            label: <Content label="Longevidade média" />,
            value: species.average_lifespan

        },
        {
            key: '6',
            label: <Content label="Linguagem" />,
            value: species.language
        }
    ]

        

        return (
            <div style={{ minHeight: "80%", height: "100%" }} >
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <h1>{selected.name}</h1> <Button onClick={_ => { this.setState({ redirect: true }) }} type="primary"> Voltar</Button>
                </div>
                <Divider orientation="left">Informações Básicas</Divider>

                <div style={{ maxWidth: "100%"}}>
                    <Table columns={columns} dataSource={data} size="small" small showHeader={false} pagination={false} />
                </div>
                <Divider orientation="left">Informações de Raça </Divider>
                <div style={{ maxWidth: "100%"}}>
                    <Table columns={columns} dataSource={dataSpecies} size="small" small showHeader={false} pagination={false} />
                </div>

                {
                    this.state.redirect && <Redirect to="/home/" push={true} />
                }
            </div>
        );
    }
}

const Content = props => (
    <div style={{ display: "flex", flexDirection: "row" }}>
        <h6 style={{ fontWeight: "bold", margin: 0 }}>{props.label}</h6>
    </div>
)




export default Vizualizar;