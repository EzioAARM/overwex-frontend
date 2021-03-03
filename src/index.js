import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
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

ReactDOM.render(
    (<BrowserRouter>
        <Router>
            <Switch>
                <Route exact path={['/', '/find-user']}>
                    {
                        localStorage.getItem('overwex_token') != null && localStorage.getItem('overwex_user_mail') != null ? 
                            <Main showPage='find-user' /> : 
                            <Redirect to='/login' />
                    }
                </Route>
                <Route exact path="/history">
                    {
                        localStorage.getItem('overwex_token') != null && localStorage.getItem('overwex_user_mail') != null ? 
                            <Main showPage='history' /> : 
                            <Redirect to='/login' />
                    }
                </Route>
                <Route exact path="/profile">
                    {
                        localStorage.getItem('overwex_token') != null && localStorage.getItem('overwex_user_mail') != null ? 
                            <Main showPage='profile' /> : 
                            <Redirect to='/login' />
                    }
                </Route>
                <Route path="/apex-user/:id" component={(props) => {
                    if (localStorage.getItem('overwex_token') != null && localStorage.getItem('overwex_user_mail') != null) 
                        return <Main showPage='apex-user' id={props.match.params.id} />
                    else return <Redirect to='/login' />
                }} />
                <Route exact path="/login">
                    {
                        localStorage.getItem('overwex_token') != null && localStorage.getItem('overwex_user_mail') != null ? 
                            <Redirect to='/' /> : 
                            <MainAuth showPage='login' />
                    }
                </Route>
                <Route exact path="/register">
                    {
                        !localStorage.getItem('overwex_token') != null && localStorage.getItem('overwex_user_mail') != null ? 
                            <Redirect to='/' /> : 
                            <MainAuth showPage='register' />
                            
                    }
                </Route>
                <Route exact path="/recover">
                    {
                        !localStorage.getItem('overwex_token') != null && localStorage.getItem('overwex_user_mail') != null ? 
                            <Redirect to='/' /> : 
                            <MainAuth showPage='recover' />
                    }
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    </BrowserRouter>),
    document.getElementById('root')
)

reportWebVitals()