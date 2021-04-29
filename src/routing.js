import React, { Component } from 'react'
import {
    Switch,
    BrowserRouter as Router, 
    Route, BrowserRouter,
    Redirect
} from "react-router-dom"
//import 'bulma'
import Main from "./main/main"
import NotFound from './404'
import './assets/css/global.css'
import MainAuth from './auth/main'
import { AccountContext } from './auth/Accounts'

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
                        <Route exact path={['/', '/find-user']}>
                            {
                                this.state.isLoggedIn ? 
                                    //<Main showPage='find-user' /> : 
                                    <Main showPage='apex-user' 
                                        platform='origin' 
                                        user='EzioAARM' 
                                        imageUrl='https://secure.download.dm.origin.com/production/avatar/prod/7/41/208x208.JPEG' /> : 
                                    <Redirect to='/login' />
                            }
                        </Route>
                        <Route exact path="/apex-user/:platform/:user" component={(props) => {
                            if (this.state.isLoggedIn) 
                                return <Main showPage='apex-user' platform={props.match.params.platform} user={props.match.params.user} />
                            else return <Redirect to='/login' />
                        }} />
                        <Route exact path="/history">
                            {
                                this.state.isLoggedIn ? 
                                    <Main showPage='history' /> : 
                                    <Redirect to='/login' />
                            }
                        </Route>
                        <Route exact path="/profile">
                            {
                                this.state.isLoggedIn ? 
                                    <Main showPage='profile' /> : 
                                    <Redirect to='/login' />
                            }
                        </Route>
                        <Route exact path="/login">
                            {
                                this.state.isLoggedIn ? 
                                    <Redirect to='/' /> : 
                                    <MainAuth showPage='login' />
                            }
                        </Route>
                        <Route exact path="/register">
                            {
                                !this.state.isLoggedIn ? 
                                    <Redirect to='/' /> : 
                                    <MainAuth showPage='register' />
                                    
                            }
                        </Route>
                        <Route exact path="/recover">
                            {
                                !this.state.isLoggedIn ? 
                                    <Redirect to='/' /> : 
                                    <MainAuth showPage='recover' />
                            }
                        </Route>
                        <Route>
                            <NotFound />
                        </Route>
                    </Switch>
                </Router>
            </BrowserRouter>
        )
    }
}

export default Routing