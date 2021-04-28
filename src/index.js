import React from 'react'
import ReactDOM from 'react-dom'
import { Account } from './auth/Accounts'
import reportWebVitals from './reportWebVitals'
import Routing from './routing'


ReactDOM.render(
    (<Account>
        <Routing />
    </Account>),
    document.getElementById('root')
)

reportWebVitals()