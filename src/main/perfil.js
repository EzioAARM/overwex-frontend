import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            esEditable: false,
            userinfo: {
                name: "Axel Rodriguez",
                tag: "EzioA",
                email: "alejandrom9712@gmail.com"
            }
        }
        this.saveInfo = this.saveInfo.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    saveInfo() {
        this.setState({
            esEditable: false
        })
    }

    handleChange(event) {
        this.setState({
            userinfo: {
                name: (event.target.id === 'nombre') ? event.target.value : this.state.userinfo.name,
                tag: (event.target.id === 'overwex_tag') ? event.target.value : this.state.userinfo.tag,
                email: (event.target.id === 'correo') ? event.target.value : this.state.userinfo.email
            }
        })
    }

    render() {
        return (
            <div className='mt-6'>
                <div className='columns is-mobile'>
                    <div className='column is-2-desktop is-2-tablet is-1-mobile'></div>
                    <div className='column is-8-desktop is-8-tablet is-10-mobile'>
                        {
                            !this.state.esEditable ? 
                            (<div>
                                <div className='columns is-mobile'>
                                    <div className='column is-1 is-offset-11-desktop is-offset-10-touch'>
                                        <span onClick={() => this.setState({esEditable: true})} className='icon is-clickable'>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </span>
                                    </div>
                                </div>
                                <div className='columns'>
                                    <div className='column is-6'>
                                        <strong>Nombre</strong>
                                    </div>
                                    <div className='column is-6'>
                                        {this.state.userinfo.name}
                                    </div>
                                </div>
                                <div className='columns'>
                                    <div className='column is-6'>
                                        <strong>Overwex Tag</strong>
                                    </div>
                                    <div className='column is-6'>
                                    {this.state.userinfo.tag}
                                    </div>
                                </div>
                                <div className='columns'>
                                    <div className='column is-6'>
                                        <strong>Correo electronico</strong>
                                    </div>
                                    <div className='column is-6'>
                                        {this.state.userinfo.email}
                                    </div>
                                </div>
                            </div>) : 
                            (<div>
                                <div className='field is-horizontal'>
                                    <div className='field-label is-normal'>
                                        <label className='label'>Nombre</label>
                                    </div>
                                    <div className='field-body'>
                                        <div className='field'>
                                            <p className='control'>
                                                <input type='text' className='input' placeholder='Nombre' id="nombre"
                                                    onChange={this.handleChange} value={this.state.userinfo.name} />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='field is-horizontal'>
                                    <div className='field-label is-normal'>
                                        <label className='label'>Nombre de usuario</label>
                                    </div>
                                    <div className='field-body'>
                                        <div className='field'>
                                            <p className='control'>
                                                <input type='text' className='input' placeholder='Nombre de usuario' id='overwex_tag'
                                                    onChange={this.handleChange} value={this.state.userinfo.tag} />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='field is-horizontal'>
                                    <div className='field-label is-normal'>
                                        <label className='label'>Correo electronico</label>
                                    </div>
                                    <div className='field-body'>
                                        <div className='field'>
                                            <p className='control'>
                                                <input type='text' className='input' placeholder='Correo electronico' id='correo'
                                                    onChange={this.handleChange} value={this.state.userinfo.email} />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='control is-pulled-right'>
                                    <button className='button is-danger apex-button is-pulled-left' onClick={this.saveInfo}>Guardar</button>
                                </div>
                            </div>)
                        }
                        
                    </div>
                    <div className='column is-2-desktop is-2-tablet is-1-mobile'></div>
                </div>
            </div>
        )
    }
}

export default Profile