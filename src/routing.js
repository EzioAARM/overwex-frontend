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
        isLoggedIn: false
    }

    componentDidMount() {
        this.context.getSession()
            .then(session => {
                console.log(session)
                this.setState({
                    isLoggedIn: true
                })
            })
    }

    render() {
        return (
            <BrowserRouter>
                <Router>
                    <Switch>
                        <Route exact path={['/', '/find-user']}>
                            {
                                this.state.isLoggedIn ? 
                                    <Main showPage='find-user' /> : 
                                    <Redirect to='/login' />
                            }
                        </Route>
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
                        <Route path="/apex-user/:id" component={(props) => {
                            if (this.state.isLoggedIn) 
                                return <Main showPage='apex-user' id={props.match.params.id} />
                            else return <Redirect to='/login' />
                        }} />
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