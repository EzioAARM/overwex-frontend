import React, { Component } from "react";
import video_background from '../assets/apex-background.mp4'

class LoginBackground extends Component {
    render() {
        return (
            <div className='videoContainer'>
                <video autoPlay muted loop>
                    <source src={video_background} type='video/mp4' />
                </video>
            </div>
        )
    }
}

export default LoginBackground