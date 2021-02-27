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
                <Route exact path="/">
                    {
                        localStorage.getItem('overwex_token') == null && localStorage.getItem('overwex_user_mail') == null ? 
                            <Main /> : 
                            <Redirect to='/login' />
                    }
                </Route>
                <Route exact path="/login">
                    {
                        localStorage.getItem('overwex_token') == null && localStorage.getItem('overwex_user_mail') == null ? 
                            <Redirect to='/' /> : 
                            <MainAuth showPage='login' />
                    }
                </Route>
                <Route exact path="/register">
                    {
                        !localStorage.getItem('overwex_token') == null && localStorage.getItem('overwex_user_mail') == null ? 
                            <Redirect to='/' /> : 
                            <MainAuth showPage='register' />
                            
                    }
                </Route>
                <Route exact path="/recover">
                    {
                        !localStorage.getItem('overwex_token') == null && localStorage.getItem('overwex_user_mail') == null ? 
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