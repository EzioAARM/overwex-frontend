import React, { Component, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import black_logo from '../assets/apex-black-logo.png'
import white_logo from '../assets/apex-white-logo.svg'
import google_logo from '../assets/google-logo.svg'
import { AccountContext } from './Accounts'
import './auth.css'

class Login extends Component {

    static contextType = AccountContext

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            loggedin: false,
            notificationClass: 'notification is-danger apex-notification has-text-centered is-hidden',
            notificationMessage: '',
            apexButtonClass: 'button is-danger apex-button is-fullwidth',
            googleButtonClass: 'button google-button',
            user_input_error: "",
            pass_input_error: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.login = this.login.bind(this)
        this.doLogin = this.doLogin.bind(this)
    }

    handleChange(event) {
        this.setState({
            username: (event.target.id === 'username') ? event.target.value : this.state.username,
            password: (event.target.id === 'password') ? event.target.value : this.state.password
        })
    }

    doLogin(event) {
        if (event.key === 'Enter') {
            this.login()
        }
    }

    login() {
        if (this.state.username !== "" && this.state.password !== "") {
            this.setState({
                notificationClass: 'notification is-danger apex-notification has-text-centered is-hidden',
                notificationMessage: '',
                apexButtonClass: 'button is-danger apex-button is-fullwidth is-loading',
                googleButtonClass: 'button google-button is-loading',
                user_input_error: "",
                pass_input_error: ""
            })
            this.context.authenticate(this.state.username, this.state.password)
                .then(data => {
                    window.location.reload()
                })
                .catch(error => {
                    this.setState({
                        notificationClass: 'notification is-danger apex-notification has-text-centered',
                        notificationMessage: error.message,
                        user_input_error: "danger-input is-danger",
                        pass_input_error: "danger-input is-danger"
                    })
                })
                .finally(() => {
                    this.setState({
                        apexButtonClass: 'button is-danger apex-button is-fullwidth',
                        googleButtonClass: 'button google-button'
                    })
                })
        } else {
            this.setState({
                notificationClass: 'notification is-danger apex-notification has-text-centered',
                notificationMessage: 'Los campos de usuario y contraseña son requeridos',
                user_input_error: (this.state.username === "") ? "danger-input is-danger" : "",
                pass_input_error: (this.state.password === "") ? "danger-input is-danger" : ""
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
                                                    <input type='text' className={"input custom-input" + this.state.user_input_error} id='username' 
                                                        onChange={this.handleChange} onKeyDown={this.doLogin} placeholder='Nombre de usuario' />
                                                </div>
                                            </div>
                                            <div className='field'>
                                                <div className='control'>
                                                    <input type='password' className={"input custom-input" + this.state.pass_input_error} id='password' 
                                                        onChange={this.handleChange} onKeyDown={this.doLogin} placeholder='Contraseña' />
                                                    <div className='columns'>
                                                        <div className='column is-full has-text-right'>
                                                            <small><Link to='/recover' className='recover-password-link'>¿Olvidaste tu contraseña?</Link></small>
                                                        </div>
                                                    </div>
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
                                                        <Link to='/register' className='apex-link' >Crear cuenta</Link>
                                                    </div>
                                                </div>
                                                <div className='column is-6'>
                                                    <div className='control'>
                                                        <button className={this.state.apexButtonClass} onClick={this.login}>Iniciar Sesión</button>
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

export default Login