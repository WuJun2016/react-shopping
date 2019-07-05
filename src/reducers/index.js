import { combineReducers } from 'redux'
import count from './count'
import cart from './cart'
import history from './history'

export default combineReducers({
  count,
  cart,
  history
})
