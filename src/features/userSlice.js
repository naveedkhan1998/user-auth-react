import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  name:'',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo:(state,action) =>{
        const {email,name} = action.payload
        state.email = email
        state.name = name
    },
    unSetUserInfo:(state) =>{
        state.email = ''
        state.name = ''
    },
  },
})

export const { setUserInfo,unSetUserInfo } = userSlice.actions

export default userSlice.reducer

const getCurrentUserName = (state) => state.user.name
const getCurrentUserEmail = (state) => state.user.email