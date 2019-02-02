import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Login from '../Login/Login.component';
import Home from '../Pages/Home/Home.page';
import Vizualizar from '../Pages/Visualizar/Visualizar.page';
import Favoritos from '../Pages/Favor/Favor.page'
import SideBar from '../Common/SideBar/Sidebar.component';

class RouterSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = { router: "", permission: false }
       
    }

    componentWillMount() {
    
    }

    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact={true} render={(props) => <Login {...props} />} />
                        <Route path="/*">
                            <div style={{height: "100%"}}>
                                <SideBar 
                                //logout={} 
                                router={this.state.router} >
                                    <Route path="/home/" exact={true} render={(props) => <Home {...props} router={(router) => this.setState({ router })} />} />
                                    <Route path="/home/visualizar" exact={true} render={(props) => <Vizualizar {...props} router={(router) => this.setState({ router })} />} />
                                    <Route path="/home/favoritos" exact={true} render={(props) => <Favoritos {...props} router={(router) => this.setState({ router })} />} />
                                </SideBar>
                            </div>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default RouterSwitch;