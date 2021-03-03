import React, { Component } from "react";
import Header from '../layout/header'
import Sidebar from '../layout/side'
import FindUser from './find-user'
import History from './historial'
import ApexUser from './apex-user'
import Profile from './perfil'
import './main.css'

class Main extends Component {

    renderContent = () => {
        if (this.props.showPage === 'find-user') return <FindUser />
        if (this.props.showPage === 'history') return <History />
        if (this.props.showPage === 'profile') return <Profile />
        if (this.props.showPage === 'apex-user') return <ApexUser id={this.props.id} />
    }

    render() {
        return (
        <div>
            <Header />
            <div className='columns is-gapless is-mobile'>
                <div className='column is-2 is-hidden-touch'>
                    <div className='hero is-fullheight-with-navbar is-dark'>
                        <div className='hero-body is-align-items-flex-start'>
                            <Sidebar />
                        </div>
                    </div>
                </div>
                <div className='column is-10-desktop is-12-mobile'>
                    {
                        this.renderContent()
                    }
                </div>
            </div>
        </div>)
    }
}

export default Main