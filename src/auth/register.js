import { CognitoUserAttribute, CognitoUserPool } from "amazon-cognito-identity-js";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import black_logo from '../assets/apex-black-logo.png'
import white_logo from '../assets/apex-white-logo.svg'
import google_logo from '../assets/google-logo.svg'
import { globals } from "../globals";
import './auth.css'

const UserPool = new CognitoUserPool(globals.USER_POOL_INFO)

class Registro extends Component {

    UserPool = new CognitoUserPool(globals.USER_POOL_INFO)
    
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            name: "",
            password: "",
            confirm_password: "",
            user_input_error: "",
            email_input_error: "",
            name_input_error: "",
            pass_input_error: "",
            confirm_password_input_error: "",
            apexButtonClass: 'button is-danger apex-button is-fullwidth',
            googleButtonClass: 'button google-button',
            notificationClass: 'notification is-danger apex-notification has-text-centered is-hidden',
            notificationMessage: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.signUp = this.signUp.bind(this)
    }

    handleChange(event) {
        this.setState({
            username: (event.target.id === 'username') ? event.target.value : this.state.username,
            email: (event.target.id === 'email') ? event.target.value : this.state.email,
            name: (event.target.id === 'name') ? event.target.value : this.state.name,
            password: (event.target.id === 'password') ? event.target.value : this.state.password,
            confirm_password: (event.target.id === 'password_verify') ? event.target.value : this.state.confirm_password,
            user_input_error: (this.state.username === "") ? "danger-input is-danger" : "",
            email_input_error: (this.state.email === "") ? "danger-input is-danger" : "",
            name_input_error: (this.state.name === "") ? "danger-input is-danger" : "",
            pass_input_error: (this.state.password === "") ? "danger-input is-danger" : "",
            confirm_password_input_error: (this.state.confirm_password === "") ? "danger-input is-danger" : ""
        })
    }

    signUp() {
        this.setState({
            notificationClass: 'notification is-danger apex-notification has-text-centered is-hidden',
            notificationMessage: '',
        })
        if (this.state.username !== "" && this.state.email !== "" && this.state.name !== "" &&
        this.state.password !== "" && this.state.confirm_password !== "") {
            if (this.state.password === this.state.confirm_password) {
                UserPool.signUp(
                    this.state.username,
                    this.state.password, 
                    [
                        new CognitoUserAttribute({
                            Name: 'email',
                            Value: this.state.email
                        }),
                        new CognitoUserAttribute({
                            Name: 'name',
                            Value: this.state.name
                        })
                    ],
                    null,
                    (err, data) => {
                        if (err) {
                            console.log(err)
                            this.setState({
                                notificationClass: 'notification is-danger apex-notification has-text-centered',
                                notificationMessage: err.message,
                            })
                        }
                        else {
                            console.log(data)
                            this.setState({
                                notificationClass: 'notification is-success has-text-centered',
                                notificationMessage: 'Se envio un correo a la direccion ' + this.state.email,
                            })
                        }
                    }
                )
            } else {
                this.setState({
                    notificationClass: 'notification is-danger apex-notification has-text-centered',
                    notificationMessage: 'Las contraseñas no coinciden',
                })
            }
        } else {
            this.setState({
                notificationClass: 'notification is-danger apex-notification has-text-centered',
                notificationMessage: 'Los campos nombre completo, nombre de usuario, correo electronico, contraseña y confirmar contraseña son requeridos',
                user_input_error: (this.state.username === "") ? "danger-input is-danger" : "",
                email_input_error: (this.state.email === "") ? "danger-input is-danger" : "",
                name_input_error: (this.state.name === "") ? "danger-input is-danger" : "",
                pass_input_error: (this.state.password === "") ? "danger-input is-danger" : "",
                confirm_password_input_error: (this.state.confirm_password === "") ? "danger-input is-danger" : "",
            })
        }
    }

    render() {
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
                                    <div className='columns'>
                                        <div className='column is-1 is-hidden-mobile'></div>
                                        <div className='column is-10'>
                                            <div className={this.state.notificationClass}>
                                                {this.state.notificationMessage}
                                            </div>
                                            <div className='field'>
                                                <div className='control'>
                                                    <input type='text' className={'input custom-input' + this.state.name_input_error} id='name' onChange={this.handleChange} placeholder='Nombre completo' />
                                                </div>
                                            </div>
                                            <div className='field'>
                                                <div className='control'>
                                                    <input type='text' className={'input custom-input' + this.state.user_input_error} id='username' onChange={this.handleChange} placeholder='Nombre de usuario' />
                                                </div>
                                            </div>
                                            <div className='field'>
                                                <div className='control'>
                                                    <input type='text' className={'input custom-input' + this.state.email_input_error} id='email' onChange={this.handleChange} placeholder='Correo electrónico' />
                                                </div>
                                            </div>
                                            <div className='field'>
                                                <div className='control'>
                                                    <input type='password' className={'input custom-input' + this.state.pass_input_error} id='password' onChange={this.handleChange} placeholder='Contraseña' />
                                                </div>
                                            </div>
                                            <div className='field'>
                                                <div className='control'>
                                                    <input type='password' className={'input custom-input' + this.state.confirm_password_input_error} id='password_verify' onChange={this.handleChange} placeholder='Confirmar contraseña' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='column is-1 is-hidden-mobile'></div>
                                    </div>
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
                                                        <button className={this.state.apexButtonClass} onClick={this.signUp}>Crear cuenta</button>
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
                                                <button className={this.state.googleButtonClass}>
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

export default Registro