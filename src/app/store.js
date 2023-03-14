import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthApi } from '../services/UserAuthApi'
import { managmentApi } from '../services/ManagmentApi'
import authReducer from '../features/authSlice'
import userReducer from '../features/userSlice'
import studentReducer from '../features/studentSlice'


export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [managmentApi.reducerPath]: managmentApi.reducer,
    auth:authReducer,
    user:userReducer,
    students:studentReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware,managmentApi.middleware),
})

setupListeners(store.dispatch)