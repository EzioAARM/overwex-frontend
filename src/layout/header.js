import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            burgerClass: 'navbar-burger',
            menuClass: 'navbar-menu',
            menuActive: false,
            shouldLogout: false
        }
        this.activateMenu = this.activateMenu.bind(this)
        this.logout = this.logout.bind(this)
    }

    activateMenu = () => {
        
        this.setState({
            menuActive: !this.state.menuActive
        })
        this.setState({
            burgerClass: this.state.menuActive ? 'navbar-burger is-active' : 'navbar-burger',
            menuClass: this.state.menuActive ? 'navbar-menu is-active' : 'navbar-menu'
        })
    }

    logout() {
        localStorage.removeItem('overwex_token')
        localStorage.removeItem('overwex_user_mail')
        window.location.reload(false)
    }

    render() {
        return (
            <nav className='navbar is-dark is-fixed-top' role='navigation' aria-label='main navigation'>
                <div className='navbar-brand'>
                    <Link to="/" className="navbar-item">
                        Overwex
                    </Link>
                    <a role="button" className={this.state.burgerClass} onClick={this.activateMenu} aria-label="menu" aria-expanded="false" data-target="mainmenu">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id='mainmenu' className={this.state.menuClass}>
                    <div className='navbar-end'>
                        <div className='navbar-item has-dropdown is-hoverable is-hidden-touch'>
                            <a className='navbar-link'>
                                <span className='icon'>
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                            </a>
                            <div className='navbar-dropdown is-right'>
                                <Link to='/profile' className='navbar-item'>Mi perfil</Link>
                                <hr className='navbar-divider' />
                                <a className='navbar-item' onClick={this.logout}>
                                    Cerrar sesion
                                </a>
                            </div>
                        </div>
                        <div className='is-hidden-desktop'>
                            <div className='navbar-item'>
                                <div className='columns is-tablet'>
                                    <div className='column is-2'></div>
                                    <div className='column is-8'>
                                        <div className='control'>
                                            <button className='button is-danger apex-button is-fullwidth is-medium'>
                                                APEX
                                            </button>
                                        </div>
                                    </div>
                                    <div className='column is-2'></div>
                                </div>
                            </div>
                            <hr className='apex-line'/>
                            <div className='navbar-item has-text-centered'>
                                <Link to='/' className='is-size-5 apex-link'>Mi perfil</Link>
                            </div>
                            <div className='navbar-item has-text-centered'>
                                <Link to='/' className='is-size-5 apex-link'>Cerrar sesión</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header;