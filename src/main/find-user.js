import React, { Component } from "react";
import { Link } from "react-router-dom";
import black_logo from '../assets/apex-black-logo.png'
import { globals } from "../globals";
import playstation_logo from '../assets/playstation.png'
import origin_logo from '../assets/origin.png'
import xbox_logo from '../assets/xbox.png'

class FindUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: "",
            realizoBusqueda: false,
            usersDataRender: [],
            find_button_class: 'button is-danger apex-button is-pulled-left'
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
        if (this.state.user.length > 0) {
            this.setState({
                find_button_class: 'button is-danger apex-button is-pulled-left is-loading'
            })
            fetch(globals.GRAPH_API, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `
                        query {
                            SearchResultApexUsers (username: "${this.state.user}") {
                                username,
                                platform,
                                imageUrl
                            }
                        }
                    `
                })
            }).then(res => res.json())
            .then(res => {
                this.setState({
                    realizoBusqueda: true,
                    usersDataRender: res.data.SearchResultApexUsers
                })
            })
            .catch(error => console.log(error))
            .finally(() => {
                this.setState({
                    find_button_class: 'button is-danger apex-button is-pulled-left'
                })
            })
        }
    }

    renderResultTable() {
        return this.state.usersDataRender.map((user, index) => {
            const {
                username,
                platform,
                imageUrl
            } = user
            return (
                <div className='column is-6-tablet is-12-mobile is-6-desktop' key={platform}>
                    <Link push exact to={'/apex-user/' + platform + '/' + username} >
                        <div className='card apex-finder-card'>
                            <div className='card-content'>
                                <div className='media'>
                                    <div className='media-left'>
                                        <figure className='image is-128x128'>
                                            <img src={imageUrl} alt={username} />
                                        </figure>
                                    </div>
                                    <div className='media-content'>
                                        <p className='title is-4'>
                                            {username}
                                        </p>
                                        {platform === 'psn' ? 
                                            (<figure className='image is-32x32'>
                                                <img src={playstation_logo} alt="Playstation" />
                                            </figure>) : 
                                        platform === 'xbl' ? 
                                            (<figure className='image is-16x16'>
                                                <img src={xbox_logo} alt="Xbox" />
                                            </figure>) : 
                                            (<figure className='image is-16x16'>
                                                <img src={origin_logo} alt="Origin" />
                                            </figure>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    
                </div>
            )
        })
    }

    render() {
        return (
            <div className='column is-8-desktop is-12-mobile'>
                <div className='columns is-mobile'>
                    <div className='column is-4-desktop is-4-tablet is-3-mobile'></div>
                    <div className='column is-4-desktop is-4-tablet is-6-mobile'>
                        <img src={black_logo} alt='black-logo' />
                    </div>
                    <div className='column is-4-desktop is-4-tablet is-3-mobile'></div>
                </div>
                <div className='columns is-mobile'>
                    <div className='column is-2-desktop is-2-tablet is-1-mobile'></div>
                    <div className='column is-8-desktop is-8-tablet is-10-mobile'>
                        <div className='columns'>
                            <div className='column is-12'>
                                <div className='field'>
                                    <div className='control'>
                                        <input type='text' className='input custom-input' placeholder='Nombre de usuario' onChange={this.handleUserInput} />
                                    </div>
                                </div>
                                <div className='control is-pulled-right'>
                                    <button className={this.state.find_button_class} onClick={this.processUsername}>Buscar usuario</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='column is-2-desktop is-2-tablet is-1-mobile'></div>
                </div>
                {
                    this.state.realizoBusqueda ? 
                        this.state.usersDataRender.length > 0 ? 
                        (<div className='columns is-multiline is-fullhd'>
                            {this.renderResultTable()}
                        </div>) : (<h1>No se encontro informacion del usuario :(</h1>) : null
                }
            </div>
        )
    }
}

export default FindUser