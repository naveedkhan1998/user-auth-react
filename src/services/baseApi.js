import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials,logOut } from '../features/authSlice'


const baseQuery = fetchBaseQuery({
    //baseUrl: 'https://naveedkhan98.pythonanywhere.com',
    baseUrl: 'http://localhost:8000',
    //credentials:'include',
    prepareHeaders:(headers,{getState})=>{
        const token = getState().auth.token
        if (token) {
            headers.set('Authorization',`Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args,api,extraOptions) =>{
    let result = await baseQuery(args,api,extraOptions)

    if (result?.error?.originalStatus ===403){
        console.log('sending refres_token')
        // send refresh token
        const refrehResult = await baseQuery('/api/user/refresh_token/',api,extraOptions)
        console.log(refrehResult)
        if (refrehResult?.data){
            //const user = api.getState().auth.user
            // store new_token
            api.dispatch(setCredentials({token:refrehResult.data.access}))
            //retry 
            result = await baseQuery(args,api,extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    return result
}

export const baseApi = createApi({
    baseQuery:baseQueryWithReauth,
    endpoints:builder => ({})
})