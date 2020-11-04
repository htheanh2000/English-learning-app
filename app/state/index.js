import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import users from './users/reducers'
import screens from './screens/reducers'


const reducer = {
  users,
  screens,
}

console.log('store');
const store = configureStore({
  reducer,
  middleware: [logger, ...getDefaultMiddleware()],
})

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./reducers', () => store.replaceReducer(reducer))
}

export default store;
