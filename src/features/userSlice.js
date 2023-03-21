import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  name:'',
  is_staff:false,
  avatar:''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo:(state,action) =>{
        const {email,name,is_staff,avatar} = action.payload
        state.email = email
        state.name = name
        state.is_staff = is_staff
        state.avatar = avatar
    },
    unSetUserInfo:(state) =>{
        state.email = ''
        state.name = ''
        state.is_staff=false
        state.avatar=''
    },
  },
})

export const { setUserInfo,unSetUserInfo } = userSlice.actions

export default userSlice.reducer

export const getCurrentUserDetails = (state) => state.user
//export const getCurrentUserEmail = (state) => state.user.email