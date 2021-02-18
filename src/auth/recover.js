import React, { Component } from "react";
import video_background from '../assets/apex-background.mp4'
import './auth.css'

class Recuperar extends Component {
    render() {
        return (
        <div>
            <div className='videoContainer'>
                <video autoPlay muted loop>
                    <source src={video_background} type='video/mp4' />
                </video>
            </div>
        </div>)
    }
}

export default Recuperar