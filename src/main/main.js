import React, { Component } from "react";
import Header from '../layout/header'
import Sidebar from '../layout/side'
import './main.css'

class Main extends Component {
    render() {
        return (
        <div>
            <Header />
            <div className='columns is-gapless'>
                <div className='column is-2'>
                    <div className='hero is-fullheight-with-navbar is-dark'>
                        <div className='hero-body is-align-items-flex-start'>
                            <Sidebar />
                        </div>
                    </div>
                </div>
                <div className='column is-8'>
                    Contenido principal
                </div>
            </div>
        </div>)
    }
}

export default Main