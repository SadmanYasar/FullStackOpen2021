import { applyMiddleware, combineReducers, createStore } from 'redux'
import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'

const reducer = combineReducers({
  user: userReducer,
  blogs: blogReducer,
  notification: notificationReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
