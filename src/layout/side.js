import { Component } from "react";
import './sidebar.css'

class Sidebar extends Component {
    render() {
        return (
            <div className="container">
                <div className='columns'>
                    <div className='column is-12'>
                        <button className='button is-danger apex-button is-fullwidth is-medium'>
                            APEX
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar