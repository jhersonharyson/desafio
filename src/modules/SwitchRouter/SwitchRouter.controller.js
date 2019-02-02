import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Login from '../Login/Login.component';
import Home from '../Pages/Home/Home.page';
import Vizualizar from '../Pages/Visualizar/Visualizar.page';
import SideBar from '../Common/SideBar/Sidebar.component';

class RouterSwitch extends Component {
    constructor() {
        super();
        this.state = { router: "", permission: false }
    }

    componentWillMount() {
    
    }

    render() {
        return (
            <div>
                <div  />
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact={true} render={(props) => <Login {...props} />} />
                        <Route path="/*">
                            <div>
                                <SideBar 
                                //logout={} 
                                router={this.state.router} >
                                    <Route path="/home/" exact={true} render={(props) => <Home {...props} router={(router) => this.setState({ router })} />} />
                                    <Route path="/home/visualizar" exact={true} render={(props) => <Vizualizar {...props} router={(router) => this.setState({ router })} />} />
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