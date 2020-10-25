import '@/styles/app.scss'
import 'core-js/es/array/fill'
import 'core-js/es/map'
import 'core-js/es/promise/'
import 'core-js/es/set'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './store/reducers'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter basename={process.env.PUBLIC_PATH}>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('app')
)
