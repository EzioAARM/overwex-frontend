import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LoginBackground from '../layout/login-background'
import { Auth } from 'aws-amplify'

class MainAuth extends Component {

    state = {
        isLoggedIn: false,
        sesionVerificada: false
    }

    componentDidMount() {
        Auth.currentSession().then(data => {
            console.log(data)
            this.setState({
                isLoggedIn: true,
                sesionVerificada: true
            })
        }).catch(error => {
            console.log(error)
            this.setState({
                isLoggedIn: false,
                sesionVerificada: true
            })
        })
    }

    render() {
        if (this.state.sesionVerificada)
            if (this.state.isLoggedIn) return <Redirect to='/' push /> 
        return (
            <div>
                { this.props.children }
                <LoginBackground />
            </div>
        )
    }
}

export default MainAuth