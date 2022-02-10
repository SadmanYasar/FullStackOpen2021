import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import store from './utils/store'

import './index.css'
import { Router } from 'react-router-dom'

import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
)