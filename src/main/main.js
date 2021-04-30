import React, { Component } from "react";
import Header from '../layout/header'
import Sidebar from '../layout/side'
import './main.css'

class Main extends Component {

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
                            {this.props.children}
                        <div className='column is-2 is-hidden-touch'></div>
                    </div>
                </div>
            </section>
        </div>)
    }
}

export default Main