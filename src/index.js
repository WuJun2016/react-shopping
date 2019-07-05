import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import Main from './components/Main'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import 'antd/dist/antd.css'
import './styles/App.css'
import { getAllProducts } from './reducers/count'

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

store.dispatch(getAllProducts())

ReactDOM.render(
	<Provider store={ store } >
		<Main />
	</Provider>
  ,document.getElementById('app')
)


