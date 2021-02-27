import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <nav className='navbar is-dark' role='navigation' aria-label='main navigation'>
                <div id='main-menu' className='navbar-menu'>
                    <div className='navbar-end'>
                        <div className='navbar-item'>
                            <span className='icon'>
                                <i className='fab fa-twitter'></i>
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header;