import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials,logOut } from '../features/authSlice'
import { getToken,storeToken,removeToken } from './LocalStorageService'
import { getCurrentRefreshToken } from '../features/authSlice'

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
    
    if (result?.error?.status === 401){
        //console.log('sending refres_token')
        // send refresh token
        //let refresh_token = api.useSelector(getCurrentRefreshToken)
        const {access_token,refresh_token} = getToken()

        const refrehResult = await baseQuery({
            url: '/api/user/refresh_token/',
            method: 'POST',
            body: {refresh:refresh_token},
            headers: {
              'Content-Type': 'application/json',
            },
          }, api, extraOptions);
        console.log(refrehResult)
        if (refrehResult?.data){
            //const user = api.getState().auth.user
            // store new_token
            storeToken(refrehResult.data)
            api.dispatch(setCredentials({...refrehResult.data}))
            //retry 
            result = await baseQuery({...args,
            headers:{
                'Authorization':`Bearer ${refrehResult.data.access}`,
            }
            },api,extraOptions)
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