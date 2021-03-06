import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as $ from 'jquery'
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
 import logo from './../../../img/sw.png'

import './Sidebar.style.css';

const { Header, Sider, Content, Footer } = Layout;

class Sidebar extends Component {


       onCollapse = (collapsed) => {
       
        this.setState({ collapsed });
    }

    rotas = () => {

    }

    componentWillMount() {

    }


    render() {
        return (<div id="div" style={{height: "100%"}}> {/* style={{ marginTop: "20px" }} */}
            <Layout style={{ minHeight: '100%' }}>
                <Sider
                    collapsed={window.innerWidth < 700}
                    style={{ overflow: 'auto', boxShadow: '.1px .1px 1px black' }}>
                    <div className="logo" />
                    <img src={logo} alt="sw" style={{width: "150px", margin: "25px"}}/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Link className="link-home" to="/home" />
                            <Icon type="search" />
                            <span onClick={() => {
                                $('.link-home').click();
                            }}> Buscar </span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link className="link-home-favor" to="/home/favoritos" />
                            <Icon type="heart" />
                            <span onClick={() => {
                                $('.link-home-favor').click();
                            }}> Favoritos </span>
                        </Menu.Item>
                        <Menu.Item onClick={() => {
                            $('.link-login').click();
                        }}>
                            <Link className="link-login" to="/" />
                            <Icon type="logout" />
                            <span > Sair </span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ overflowY: "auto", height: document.getElementsByTagName('body')[0].clientHeight }}>
                    <Header style={{ background: '#fff', padding: 0, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }} > <h1 style={{ marginLeft: "15px" }}> The Frontend for The Star Wars API  </h1> </Header>
                    <Breadcrumb style={{ margin: '16px 16px' }}>
                        <Breadcrumb.Item>  Home </Breadcrumb.Item>
                        <Breadcrumb.Item> {this.props.router} </Breadcrumb.Item>
                    </Breadcrumb>
                    <Content style={{ margin: '10px 16px', marginTop: 0 }}>
                        <div id="content" style={{ padding: 24, background: '#fff', boxShadow: ".5px .5px 20px #ccc", borderRadius: "5px", display: "flow-root" }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center', display: "block", bottom: 0 }}>

                    </Footer>

                </Layout>
            </Layout>
        </div>
        );
    }
}

export default Sidebar;


