import React from 'react'
import ReactDOM from 'react-dom/client'
import ConnectedApp from './components/App.jsx'
import Provider from './store/Provider.jsx'
import { createStore } from 'redux'
import rootReducer from './reducers/index.js'
import middlewares from './middleware/index.js'

export const store = createStore(
  rootReducer,
  middlewares
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  </React.StrictMode>,
)