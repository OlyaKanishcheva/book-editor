import React from 'react'
import ReactDOM from 'react-dom'
import './stylesheets/index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import storeFactory from './store/'

const store = storeFactory()

window.store = store

ReactDOM.render(
	<App store={store} />,
	document.getElementById('root')
)

serviceWorker.unregister()
