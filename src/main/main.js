import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Header from '../layout/header'
import Sidebar from '../layout/side'
import './main.css'
import { Auth } from 'aws-amplify'

class Main extends Component {

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
            if (!this.state.isLoggedIn) return <Redirect to='/login' push /> 
        return (
        <div>
            <Header />
            <section className='main-content columns is-fullheight'>
                <Sidebar />
                <div className='column is-2'></div>
                <div className='column is-10 mt-6 pt-6 mb-6 pb-6'>
                    <div className='columns is-mobile'>
                        <div className='column is-2 is-hidden-touch'></div>
                            {this.props.children}
                        <div className='column is-2 is-hidden-touch'></div>
                    </div>
                </div>
            </section>
        </div>)
    }
}

export default Main