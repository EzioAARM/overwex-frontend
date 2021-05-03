import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import black_logo from '../assets/apex-black-logo.png'
import white_logo from '../assets/apex-white-logo.svg'
import google_logo from '../assets/google-logo.svg'
import './auth.css'
import { Auth } from 'aws-amplify'

class Recuperar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            code: "",
            password: "",
            checkPassword: "",
            sendUsername: true,
            notificationClass: "notification is-danger apex-notification has-text-centered is-hidden",
            notificationMessage: "",
            buttonClass: 'button is-danger apex-button is-fullwidth',
            redirectToLogin: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.sendEvent = this.sendEvent.bind(this)
    }

    handleChange(event) {
        this.setState({
            username: (event.target.id === 'username') ? event.target.value : this.state.username,
            code: (event.target.id === 'verification-code') ? event.target.value : this.state.code,
            password: (event.target.id === 'new-password') ? event.target.value : this.state.password,
            checkPassword: (event.target.id === 'new-verify-pass') ? event.target.value : this.state.checkPassword
        })
    }

    sendEvent() {
        if (this.state.sendUsername) {
            // Envia el codigo para la recuperacion
            if (this.state.username !== "") {
                this.setState({
                    buttonClass: 'button is-danger apex-button is-fullwidth is-loading'
                })
                Auth.forgotPassword(this.state.username)
                    .then(data => {
                        console.log(data)
                        this.setState({
                            notificationClass: "notification is-success is-light has-text-centered",
                            notificationMessage: "Se envio un codigo de verificacion al correo electronico " + data.CodeDeliveryDetails.Destination,
                            sendUsername: false
                        })
                    }).catch(error => {
                        this.setState({
                            notificationClass: "notification is-danger apex-notification has-text-centered",
                            notificationMessage: error.message
                        })
                    }).finally(() => {
                        this.setState({
                            buttonClass: 'button is-danger apex-button is-fullwidth'
                        })
                    })
            } else {
                this.setState({
                    notificationClass: "notification is-danger apex-notification has-text-centered",
                    notificationMessage: "El nombre de usuario es requerido"
                })
            }
        } else {
            // Envia la nueva contraseña
            if (this.state.password === this.state.checkPassword) {
                this.setState({
                    buttonClass: 'button is-danger apex-button is-fullwidth is-loading'
                })
                Auth.forgotPasswordSubmit(this.state.username, this.state.code, this.state.password)
                    .then(data => {
                        console.log(data)
                        this.setState({
                            notificationClass: "notification is-success is-light has-text-centered",
                            notificationMessage: "La contraseña se cambio con exito, ya puedes iniciar sesion",
                            redirectToLogin: true
                        })
                    }).catch(error => {
                        this.setState({
                            notificationClass: "notification is-danger apex-notification has-text-centered",
                            notificationMessage: error.message
                        })
                    }).finally(() => {
                        this.setState({
                            buttonClass: 'button is-danger apex-button is-fullwidth'
                        })
                    })
            } else {
                this.setState({
                    notificationClass: "notification is-danger apex-notification has-text-centered",
                    notificationMessage: "Las contraseñas no coinciden"
                })
            }
        }
    }

    render() {
        if (this.state.redirectToLogin) return <Redirect to='/login' push />
        let insertUsername = (
            <div className='columns'>
                <div className='column is-1 is-hidden-mobile'></div>
                <div className='column is-10'>
                    <div className={this.state.notificationClass}>
                        {this.state.notificationMessage}
                    </div>
                    <div className='field'>
                        <div className='control'>
                            <input type='text' className='input custom-input' id='username' 
                                onChange={this.handleChange} placeholder='Nombre de usuario' autoComplete="false" />
                        </div>
                    </div>
                </div>
                <div className='column is-1 is-hidden-mobile'></div>
            </div>
        )
        let sendCodePass = (
            <div className='columns'>
                <div className='column is-1 is-hidden-mobile'></div>
                <div className='column is-10'>
                    <div className={this.state.notificationClass}>
                        {this.state.notificationMessage}
                    </div>
                    <div className='field'>
                        <div className='control'>
                            <input type='text' className='input custom-input' id='verification-code' 
                                onChange={this.handleChange} placeholder='Codigo de verificacion' autoComplete="false" />
                        </div>
                    </div>
                    <div className='field'>
                        <div className='control'>
                            <input type='password' className='input custom-input' id='new-password' 
                                onChange={this.handleChange} placeholder='Contraseña' autoComplete="false" />
                        </div>
                    </div>
                    <div className='field'>
                        <div className='control'>
                            <input type='password' className='input custom-input' id='new-verify-pass' 
                                onChange={this.handleChange} placeholder='Verifica tu contraseña' autoComplete="false" />
                        </div>
                    </div>
                </div>
                <div className='column is-1 is-hidden-mobile'></div>
            </div>
        )
        return (
            <div className='container' style={{
                padding: '3rem 1.5rem'
            }}>
                <div className='columns is-flex-mobile is-hidden-tablet'>
                    <div className='column is-3-mobile'></div>
                    <div className='column is-6-mobile'>
                        <img src={white_logo} alt='apex-white' />
                    </div>
                    <div className='column is-3-mobile'></div>
                </div>
                <div className='columns is-flex-mobile'>
                    <div className='column is-6-desktop is-8-widescreen is-8-fullhd is-6-tablet is-1-mobile'></div>
                    <div className='column is-6-desktop is-4-widescreen is-4-fullhd is-6-tablet is-10-mobile'>
                        <div className='card custom-card'>
                            <div className='card-content'>
                                <div className='content my-6'>
                                    <div className='columns is-hidden-mobile'>
                                        <div className='column is-3'></div>
                                        <div className='column is-6'>
                                            <img src={black_logo} alt='black-logo' />
                                        </div>
                                        <div className='column is-3'></div>
                                    </div>
                                    {
                                        this.state.sendUsername ? insertUsername : sendCodePass 
                                    }
                                    <div className='columns mb-5'>
                                        <div className='column is-2 is-hidden-mobile'></div>
                                        <div className='column is-8'>
                                            <div className='columns is-vcentered is-centered'>
                                                <div className='column is-6'>
                                                    <div className='control has-text-centered'>
                                                        <Link to='/login' className='apex-link' >Iniciar sesión</Link>
                                                    </div>
                                                </div>
                                                <div className='column is-6'>
                                                    <div className='control'>
                                                        <button onClick={this.sendEvent} className={this.state.buttonClass}>Recuperar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='column is-2 is-hidden-mobile'></div>
                                    </div>
                                    <hr className='login-line' />
                                    <div className='columns is-vcentered is-centered mt-4'>
                                        <div className='column is-full'>
                                            <div className='control has-text-centered'>
                                                <button className='button google-button'>
                                                    <span className='icon'>
                                                        <img src={google_logo} alt="google icon" />
                                                    </span>
                                                    <span className='is-hidden-mobile'>&nbsp;Iniciar sesión con google</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default Recuperar