import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import * as $ from 'jquery'
import { notification, Button, Input, Card, Icon } from 'antd'
import bg from '../../img/bg.jpg'


class Login extends Component {
  constructor() {
    super();
    this.state = { user: "", pass: "", authorized: false };
    this.submissao = this.submissao.bind(this);
    this.onChange = this.onChange.bind(this);

  }
  onKeyPrees = (evento) => {
    if (evento.key === "Enter") {
      this.submissao();
    }
  }
  onChange = (evento) => {
    if (evento.target.name === "user") {
      const user = evento.target.value;
      this.setState({ user: user });
    } else if (evento.target.name === "pass") {
      const pass = evento.target.value;
      this.setState({ pass: pass });
    }
  }

  submissao = () => {
    return this.setState({ authorized: true })
  }

  componentDidMount() {
    $(document).ready(
      function () {
        $('.logo').fadeIn(4000);
      });



  }
  componentWillMount() {

  }
  render() {
    return (
      <div style={{
        zIdex: -1100, height: "100%", backgroundPosition: "center", backgroundSize: "cover"

      }}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", height: "50%", alignItems: "center" }}>

          <Card title="Login" bordered  style={{ width: 300, boxShadow: "2px 2px 20px gray" }}>
            <div style={{height: "100%", display: "flex", flexDirection: "column", alignItems: "space-between"}}>
            <Input prefix={<Icon type="user" ></Icon>} allowClear={true} style={{marginBottom: "15px"}} />
            <Input type="password"   prefix={<Icon type="lock"></Icon>} allowClear style={{marginBottom: "15px"}}/>
            <Button type="primary" onClick={() => this.submissao()} style={{marginBottom: "15px"}}>Entrar</Button>
            </div>
          </Card>
        </div>





        {this.state.authorized &&
          <Redirect push to="/home" />
        }
      </div>
    );
  }
}


export default Login;