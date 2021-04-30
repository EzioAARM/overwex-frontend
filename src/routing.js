import React, { Component } from 'react'
import {
    Switch,
    BrowserRouter as Router, 
    Route, 
    BrowserRouter
} from "react-router-dom"
import { AnimatedSwitch } from 'react-router-transition';
import Main from "./main/main"
import './routing.css'
import './assets/css/global.css'
import { AccountContext } from './auth/Accounts'
import FindUser from './main/find-user'
import ApexUser from './main/apex-user'
import Profile from './main/perfil'
import MainAuth from './auth/main'
import Login from './auth/login'
import Registro from './auth/register'
import Recuperar from './auth/recover'

class Routing extends Component {
    
    static contextType = AccountContext

    state = {
        isLoggedIn: false,
        sesionVerificada: false
    }

    componentDidMount() {
        this.context.getSession()
            .then(session => {
                this.setState({
                    isLoggedIn: true,
                })
            })
            .finally(() => this.setState({
                sesionVerificada: true
            }))
    }

    render() {
        return (
            <BrowserRouter>
                <Router>
                    <Switch>
                        <Route exact path={['/', '/find-user']} >
                            <Main>
                                <FindUser />
                            </Main>
                        </Route>
                        <Route exact path='/apex-user/:platform/:user' render={(props) => {
                            return <Main>
                                <ApexUser user={props.match.params.user} platform={props.match.params.platform} />
                            </Main>
                        }} />
                        <Route exact path='/profile'>
                            <Main>
                                <Profile />
                            </Main>
                        </Route>
                        <Route exact path="/login">
                            <MainAuth>
                                <Login />
                            </MainAuth>
                        </Route>
                        <Route exact path="/register">
                            <MainAuth>
                                <Registro />
                            </MainAuth>
                        </Route>
                        <Route exact path="/recover">
                            <MainAuth>
                                <Recuperar />
                            </MainAuth>
                        </Route>
                        
                    </Switch>
                </Router>
            </BrowserRouter>
        )
    }
}

export default Routing