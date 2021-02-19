import React, { Component } from "react";
import { Link } from "react-router-dom";
import video_background from '../assets/apex-background.mp4'
import black_logo from '../assets/apex-black-logo.png'
import white_logo from '../assets/apex-white-logo.svg'
import google_logo from '../assets/google-logo.svg'
import './auth.css'

class Login extends Component {
    render() {
        return (
        <div>
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
                                            <div className='field'>
                                                <div className='control'>
                                                    <input type='text' className='input custom-input' onChange={console.log("Hola")} placeholder='Nombre de usuario' />
                                                </div>
                                            </div>
                                            <div className='field'>
                                                <div className='control'>
                                                    <input type='password' className='input custom-input' onChange={console.log("Hola")} placeholder='Contraseña' />
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
                                                        <Link to='/registrarse' className='apex-link' >Crear cuenta</Link>
                                                    </div>
                                                </div>
                                                <div className='column is-6'>
                                                    <div className='control'>
                                                        <button className='button is-danger apex-button is-fullwidth' >Iniciar Sesión</button>
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
            </div>
            <div className='videoContainer'>
                <video autoPlay muted loop>
                    <source src={video_background} type='video/mp4' />
                </video>
            </div>
        </div>)
    }
}

export default Login