import { configureStore } from '@reduxjs/toolkit'

import authReducer from './reducers/auth'
import userReducer from './reducers/users'
import loaderReducer from './reducers/loader'
import applicationReducer from './reducers/applilcations'


const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    loader: loaderReducer,
    application: applicationReducer
  }
})
// Infer the `RootState` and `AppDispatch` types from the store itself

export default store
