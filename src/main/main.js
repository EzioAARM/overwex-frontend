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
        else if (this.props.showPage === 'history') return <History />
        else if (this.props.showPage === 'profile') return <Profile />
        else if (this.props.showPage === 'apex-user') return <ApexUser user={this.props.user} platform={this.props.platform} imageUrl={this.props.imageUrl} />
        else return <FindUser />
    }

    render() {
        return (
        <div>
            <Header />
            <section className='main-content columns is-fullheight'>
                <Sidebar />
                <div className='column is-2'></div>
                <div className='column is-10 mt-6 pt-6 mb-6 pb-6'>
                    <div className='columns is-mobile'>
                        <div className='column is-2 is-hidden-touch'></div>
                            {this.renderContent()}
                        <div className='column is-2 is-hidden-touch'></div>
                    </div>
                </div>
            </section>
        </div>)
    }
}

export default Main