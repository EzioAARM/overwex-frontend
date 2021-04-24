import { Component } from "react";
import { Link } from "react-router-dom";
import './layouts.css'

class Sidebar extends Component {
    render() {
        return (
            <aside className='column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile sidenav' id='mainmenu'>
                <ul>
                    <li key='apex'>
                        <Link to='/' className='button is-danger apex-button is-fullwidth is-medium'>Apex</Link>
                    </li>
                </ul>
            </aside>
        )
    }
}

export default Sidebar