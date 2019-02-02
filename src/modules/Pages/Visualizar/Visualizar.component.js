import React, { Component } from 'react';
import { Input, Icon, Button, Card, Avatar, Divider, Table, Collapse } from 'antd'
import { Redirect } from 'react-router-dom'



import './Visualizar.style.css'
import axios from 'axios'

const { Meta } = Card;

class Vizualizar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {},
            species: {},
            vehicles: [],
            starships: [],
            homewolrd: {},
            films: [],
            urlCountFlm: Infinity,
            urlCountStrs: Infinity,
            urlCountVhc: Infinity,
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
            let res = await axios.get(selected.species[0])
            const species = res.data
            await this.setState({ species })

            res = await axios.get(selected.homeworld)
            const homewolrd = res.data
            await this.setState({ homewolrd })

            res = []

            await this.setState({ urlCountVhc: selected.vehicles.length })

            await this.setState({ vehicles: [] })

            selected.vehicles.forEach(url => {
                axios.get(url).then(async res => {
                    let vehicles = this.state.vehicles
                    vehicles.push(res.data)
                    await this.setState({ vehicles })
                    await this.setState({ urlCountVhc: this.state.urlCountVhc - 1 })

                })
            });

            await this.setState({ urlCountStrs: selected.starships.length })

            await this.setState({ starships: [] })

            selected.starships.forEach(url => {
                axios.get(url).then(async res => {
                    let starships = this.state.starships
                    starships.push(res.data)
                    await this.setState({ starships, urlCountStrs: this.state.urlCountStrs - 1 })

                })
            });

            await this.setState({ urlCountFlm: selected.films.length })

            await this.setState({ films: [] })

            selected.films.forEach(url => {
                axios.get(url).then(async res => {
                    let films = this.state.films
                    films.push(res.data)
                    await this.setState({ films, urlCountFlm: this.state.urlCountFlm - 1 })
                    if (this.state.urlCountFlm === 0) {
                        await this.setState({ films: films.sort((a, b) => a.episode_id - b.episode_id) })
                    }

                })
            });


        }

    }
    componentWillUnmount = () => {
        localStorage.removeItem('visualizar');
    }

    render() {
        const { selected, species, homewolrd } = this.state

        const columns = [{
            dataIndex: 'label',
            width: 150,
        }, {
            dataIndex: 'value',
            width: 150,
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
            value: species.designation,

        }, {
            key: '4',
            label: <Content label="Altura média" />,
            value: species.average_height
        }, {
            key: '5',
            label: <Content label="Longevidade média" />,
            value: species.average_lifespan
        }, {
            key: '6',
            label: <Content label="Linguagem" />,
            value: species.language
        }]

        const dataHomewolrd = [{
            key: '1',
            label: <Content label="Nome" />,
            value: homewolrd.name,
        }, {
            key: '2',
            label: <Content label="Periodo de rotação" />,
            value: homewolrd.rotation_period,
        }, {
            key: '3',
            label: <Content label="Periodo orbital" />,
            value: homewolrd.orbital_period,

        }, {
            key: '4',
            label: <Content label="Diâmentro" />,
            value: homewolrd.diameter
        }, {
            key: '5',
            label: <Content label="Clima" />,
            value: homewolrd.climate
        }, {
            key: '6',
            label: <Content label="Terreno" />,
            value: homewolrd.terrain
        },
            , {
            key: '7',
            label: <Content label="População" />,
            value: homewolrd.population
        }]


        let dataVehicle = []

        this.state.vehicles.forEach((vhc, i) => {
            const v = [{
                key: 1,
                label: <Content label="Nome" />,
                value: vhc.name,
            }, {
                key: 2,
                label: <Content label="Modelo" />,
                value: vhc.model,
            },
            {
                key: 3,
                label: <Content label="Qt. Passageiros" />,
                value: vhc.passengers,
            },
            {
                key: 4,
                label: <Content label="Custo em Creditos" />,
                value: vhc.cost_in_credits,
            }
            ]
            dataVehicle.push(v)
        })

        let dataStarships = []

        this.state.starships.forEach((strs, i) => {
            const s = [{
                key: 1,
                label: <Content label="Nome" />,
                value: strs.name,
            }, {
                key: 2,
                label: <Content label="Modelo" />,
                value: strs.model,
            },
            {
                key: 3,
                label: <Content label="Qt. Passageiros" />,
                value: strs.passengers,
            },
            {
                key: 4,
                label: <Content label="Custo em Creditos" />,
                value: strs.cost_in_credits,
            }
            ]
            dataStarships.push(s)

        })

        let dataFilms = []

        this.state.films.forEach((films, i) => {
            const f = [{
                key: 1,
                label: <Content label="Título" />,
                value: films.title,
            }, {
                key: 2,
                label: <Content label="Episódio" />,
                value: films.episode_id,
            },
            {
                key: 3,
                label: <Content label="Diretor" />,
                value: films.director,
            },
            {
                key: 4,
                label: <Content label="Produtor" />,
                value: films.producer,
            },
            {
                key: 5,
                label: <Content label="Data de lançamento" />,
                value: films.release_date,
            },
            {
                key: 6,
                label: <Content label="Prólogo de abertura" />,
                value: films.opening_crawl,
            },

            ]
            dataFilms.push(f)
            console.log(dataFilms)
        })

        return (
            <div style={{ minHeight: "80%", height: "100%" }} >
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <h1>{selected.name}</h1> <Button onClick={_ => { this.setState({ redirect: true }) }} type="primary"> Voltar</Button>
                </div>
                <Divider orientation="left">Informações Básicas</Divider>

                <div style={{ maxWidth: "100%" }}>
                    <Table columns={columns} dataSource={data} size="small" small showHeader={false} pagination={false} />
                </div>
                <Divider orientation="left">Informações de Raça </Divider>
                <div style={{ maxWidth: "100%" }}>
                    <Table columns={columns} dataSource={dataSpecies} size="small" small showHeader={false} pagination={false} />
                </div>
                <Divider orientation="left">Informações do Planeta Natal </Divider>
                <div style={{ maxWidth: "100%" }}>
                    <Table columns={columns} dataSource={dataHomewolrd} size="small" small showHeader={false} pagination={false} />
                </div>
                {
                    this.state.urlCountVhc === 0 ? (
                        <div>
                            <Divider orientation="left">Informações de Veículos Utilizados </Divider>

                            <div style={{ maxWidth: "100%" }}>
                                <Collapse accordion>
                                    {dataVehicle.map((dataVhc, key) => (
                                        <Collapse.Panel header={`Veiculo: ${dataVhc[0].value}`} key={key}>
                                            <Table style={{ marginBottom: "5px" }} columns={columns} dataSource={dataVhc} size="small" small showHeader={false} pagination={false} />
                                        </Collapse.Panel>
                                    ))}
                                </Collapse>
                            </div>

                        </div>
                    ) :
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", margin: "15px" }}>
                            <Icon type="loading" spin style={{ fontSize: "100px" }}></Icon>
                        </div>
                }
                {
                    this.state.urlCountStrs === 0 ? (
                        <div>
                            <Divider orientation="left">Naves Espaciais Utilizadas </Divider>
                            <div style={{ maxWidth: "100%" }}>
                                <Collapse accordion>
                                    {dataStarships.map((dataStrs, key) => (
                                        <Collapse.Panel header={`Nave: ${dataStrs[0].value}`} key={key}>
                                            <Table key={key} style={{ marginBottom: "5px" }} columns={columns} dataSource={dataStrs} size="small" small showHeader={false} pagination={false} />
                                        </Collapse.Panel>
                                    ))}
                                </Collapse>
                            </div>
                        </div>
                    ) :
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", margin: "15px" }}>
                            <Icon type="loading" spin style={{ fontSize: "100px" }}></Icon>
                        </div>
                }
                {
                    this.state.urlCountFlm === 0 ? (
                        <div>
                            <Divider orientation="left">Filmes Participados </Divider>
                            <div style={{ maxWidth: "100%" }}>
                                <Collapse accordion>

                                    {dataFilms.map((dataFilms, key) => (
                                        <Collapse.Panel header={`Filmes: ${dataFilms[0].value}`} key={key}>
                                            <Table key={key} style={{ marginBottom: "5px" }} columns={columns} dataSource={dataFilms} size="small" small showHeader={false} pagination={false} />
                                        </Collapse.Panel>
                                    ))}
                                </Collapse>
                            </div>
                        </div>
                    ) :
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", margin: "15px" }}>
                            <Icon type="loading" spin style={{ fontSize: "100px" }}></Icon>
                        </div>
                }

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: "15px" }}>
                    <Button block onClick={_ => { this.setState({ redirect: true }) }} type="primary"> Voltar</Button>
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