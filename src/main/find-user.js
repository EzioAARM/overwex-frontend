import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import black_logo from '../assets/apex-black-logo.png'

class FindUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: "",
            debeEnviar: false
        }
        this.handleUserInput = this.handleUserInput.bind(this)
        this.processUsername = this.processUsername.bind(this)
    }

    handleUserInput(event) {
        this.setState({
            user: event.target.value
        })
    }

    processUsername() {
        if (this.state.user.length > 0) this.setState({
            debeEnviar: true
        })
    }

    render() {
        if (this.state.debeEnviar) {
            let userurl = '/apex-user/' + this.state.user
            return <Redirect to={userurl} />
        }
        else
        {
            return (
                <div className='column is-8-desktop is-12-mobile'>
                    <div className='columns is-mobile'>
                        <div className='column is-4-desktop is-4-tablet is-1-mobile'></div>
                        <div className='column is-4-desktop is-4-tablet is-10-mobile'>
                            <img src={black_logo} alt='black-logo' />
                        </div>
                        <div className='column is-4-desktop is-4-tablet is-1-mobile'></div>
                    </div>
                    <div className='columns is-mobile'>
                        <div className='column is-2-desktop is-2-tablet is-1-mobile'></div>
                        <div className='column is-8-desktop is-8-tablet is-10-mobile'>
                            <div className='columns is-centered'>
                                <div className='column is-12'>
                                    <div className='buttons has-addons is-centered'>
                                        <button className='button is-link'>Origin</button>
                                        <button className='button is-link'>Playstation</button>
                                        <button className='button is-link'>Xbox</button>
                                    </div>
                                </div>
                            </div>
                            <div className='columns'>
                                <div className='column is-12'>
                                    <div className='field'>
                                        <div className='control'>
                                            <input type='text' className='input custom-input' placeholder='Nombre de usuario' onChange={this.handleUserInput} />
                                        </div>
                                    </div>
                                    <div className='control is-pulled-right'>
                                        <button className='button is-danger apex-button is-pulled-left' onClick={this.processUsername}>Buscar usuario</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='column is-2-desktop is-2-tablet is-1-mobile'></div>
                    </div>
                </div>
            )
        }
        
    }
}

export default FindUser