import React, { Component } from "react";
import LoginBackground from '../layout/login-background'

class MainAuth extends Component {

    render() {
        return (
            <div>
                { this.props.children }
                <LoginBackground />
            </div>
        )
    }
}

export default MainAuth