import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import Routing from './routing'
import Amplify from 'aws-amplify'
import globals from './globals'

Amplify.configure(globals.globals.AmplifyConfig)

ReactDOM.render(
    (<Routing />),
    document.getElementById('root')
)

reportWebVitals()