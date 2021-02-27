import React, { Component } from "react";
import LoginBackground from '../layout/login-background'
import Login from "./login";
import Recuperar from "./recover";
import Registro from "./register";

class MainAuth extends Component {

    renderContent = () => {
        if (this.props.showPage === 'login') return <Login />
        if (this.props.showPage === 'register') return <Registro />
        if (this.props.showPage === 'recover') return <Recuperar />
        else return <Login />
    }

    render() {
        return (
            <div>
                { this.renderContent() }
                <LoginBackground />
            </div>
        )
    }
}

export default MainAuth