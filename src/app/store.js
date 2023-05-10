import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from '../services/baseApi'
import authReducer from '../features/authSlice'
import userReducer from '../features/userSlice'
import studentReducer from '../features/studentSlice'
import standardReducer from '../features/standardSlice'


export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth:authReducer,
    user:userReducer,
    students:studentReducer,
    standards:standardReducer,
  },

  middleware: (getDefaultMiddleware) =>
    //getDefaultMiddleware().concat(userAuthApi.middleware,managmentApi.middleware),
    getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)