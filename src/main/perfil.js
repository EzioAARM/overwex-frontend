import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faKey } from "@fortawesome/free-solid-svg-icons";
import { Auth } from 'aws-amplify'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            esEditable: false,
            changePassword: false,
            userinfo: {
                name: "",
                tag: "",
                email: ""
            },
            newUserInfo: {
                name: ""
            },
            newPasswordInfo: {
                actualPass: "",
                newPass: "",
                newPassConfirm: ""
            },
            errorDisplay: '',
            notificationClass: 'notification is-danger apex-notification is-hidden'
        }
        this.saveInfo = this.saveInfo.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveNewPassword = this.saveNewPassword.bind(this)
    }

    async saveInfo() {
        if (this.state.newUserInfo.name !== this.state.userinfo.name) {
            try {
                let user = await Auth.currentAuthenticatedUser()
                await Auth.updateUserAttributes(user, {
                    'name': this.state.newUserInfo.name
                })
                this.setState({
                    esEditable: false,
                    userinfo: {
                        name: this.state.newUserInfo.name,
                        tag: this.state.userinfo.tag,
                        email: this.state.userinfo.email
                    },
                    notificationClass: 'notification is-success is-light',
                    errorDisplay: "Su informacion se actualizo correctamente"
                })
            } catch (e) {
                this.setState({
                    notificationClass: 'notification is-danger apex-notification',
                    errorDisplay: e.message
                })
            }
        }
    }

    saveNewPassword() {
        if (this.state.newPasswordInfo.newPass === this.state.newPasswordInfo.newPassConfirm) {
            Auth.currentAuthenticatedUser()
                .then(user => {
                    return Auth.changePassword(user, this.state.newPasswordInfo.actualPass, this.state.newPasswordInfo.newPass)
                })
                .then(data => { 
                    this.setState({
                        notificationClass: 'notification is-success is-light',
                        errorDisplay: "Su contraseña se actualizo correctamente",
                        changePassword: false
                    })
                })
                .catch(error => {
                    this.setState({
                        notificationClass: 'notification is-danger apex-notification',
                        errorDisplay: error.message
                    })
                }).finally(() => {
                    this.setState({
                        newPasswordInfo: {
                            actualPass: "",
                            newPass: "",
                            newPassConfirm: ""
                        }
                    })
                })
        } else {
            this.setState({
                notificationClass: 'notification is-danger apex-notification',
                errorDisplay: "Las contraseñas no coinciden"
            })
        }
    }

    handleChange(event) {
        this.setState({
            newUserInfo: {
                name: (event.target.id === 'nombre') ? event.target.value : this.state.newUserInfo.name
            },
            newPasswordInfo: {
                actualPass: (event.target.id === 'pass-actual') ? event.target.value : this.state.newPasswordInfo.actualPass,
                newPass: (event.target.id === 'new-pass') ? event.target.value : this.state.newPasswordInfo.newPass,
                newPassConfirm: (event.target.id === 'confirm-new-pass') ? event.target.value : this.state.newPasswordInfo.newPassConfirm
            }
        })
    }

    async componentDidMount() {
        let user = await Auth.currentAuthenticatedUser()
        console.log(user)
        const { attributes } = user
        this.setState({
            userinfo: {
                name: attributes.name,
                tag: user.username,
                email: attributes.email
            },
            newUserInfo: {
                name: attributes.name
            }
        })
    }

    render() {
        let displayUserInfo = (<div>
            <div className='columns'>
                <div className='column is-2-full is-6-touch is-offset-8-desktop is-offset-8-touch'>
                    <span onClick={() => this.setState({esEditable: true, changePassword: false})} className='icon is-clickable'>
                        <FontAwesomeIcon icon={faEdit} />
                    </span>
                    <span onClick={() => this.setState({changePassword: true, esEditable: false})} className='icon is-clickable'>
                        <FontAwesomeIcon icon={faKey} />
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
        </div>)

        let editUserInfo = (<div>
            <div className='field is-horizontal'>
                <div className='field-label is-normal'>
                    <label className='label'>Nombre</label>
                </div>
                <div className='field-body'>
                    <div className='field'>
                        <p className='control'>
                            <input type='text' className='input' placeholder='Nombre' id="nombre"
                                onChange={this.handleChange} value={this.state.newUserInfo.name} />
                        </p>
                    </div>
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
            <div className='field is-grouped is-pulled-right'>
                <div className='control'>
                    <button className='button is-pulled-left' onClick={() => {this.setState({esEditable: false, changePassword: false})}}>Cancelar</button>
                </div>
                <div className='control'>
                    <button className='button is-danger apex-button is-pulled-left' onClick={this.saveInfo}>Guardar</button>
                </div>
            </div>
        </div>)

        let changePasswordInfo = (
            <div>
                <div className='field is-horizontal'>
                    <div className='field-label is-normal'>
                        <label className='label'>Contraseña actual</label>
                    </div>
                    <div className='field-body'>
                        <div className='field'>
                            <p className='control'>
                                <input type='password' className='input' placeholder='Contraseña actual' id="pass-actual"
                                    onChange={this.handleChange} value={this.state.newPasswordInfo.actualPass} />
                            </p>
                        </div>
                    </div>
                </div>
                <div className='field is-horizontal'>
                    <div className='field-label is-normal'>
                        <label className='label'>Nueva contraseña</label>
                    </div>
                    <div className='field-body'>
                        <div className='field'>
                            <p className='control'>
                                <input type='password' className='input' placeholder='Nueva contraseña' id="new-pass"
                                    onChange={this.handleChange} value={this.state.newPasswordInfo.newPass} />
                            </p>
                        </div>
                    </div>
                </div>
                <div className='field is-horizontal'>
                    <div className='field-label is-normal'>
                        <label className='label'>Confirma la nueva contraseña</label>
                    </div>
                    <div className='field-body'>
                        <div className='field'>
                            <p className='control'>
                                <input type='password' className='input' placeholder='Confirma tu contraseña' id="confirm-new-pass"
                                    onChange={this.handleChange} value={this.state.newPasswordInfo.newPassConfirm} />
                            </p>
                        </div>
                    </div>
                </div>
                <div className='field is-grouped is-pulled-right'>
                    <div className='control'>
                        <button className='button is-pulled-left' onClick={() => {this.setState({esEditable: false, changePassword: false})}}>Cancelar</button>
                    </div>
                    <div className='control'>
                        <button className='button is-danger apex-button is-pulled-left' onClick={this.saveNewPassword}>Guardar</button>
                    </div>
                </div>
            </div>
        )
        return (
            <div className='column is-8-full is-full-touch'>
                <div className='columns'>
                    <div className='column'>
                        <div className={this.state.notificationClass}>
                            {this.state.errorDisplay}
                        </div>
                    </div>
                </div>
                <div className='columns is-mobile'>
                    <div className='column is-2'></div>
                    <div className='column is-8-touch is-8-desktop'>
                        {
                            !this.state.esEditable ? 
                            this.state.changePassword ? 
                                changePasswordInfo : 
                                displayUserInfo : 
                            editUserInfo
                        }
                    </div>
                    <div className='column is-2'></div>
                </div>
            </div>
        )
    }
}

export default Profile