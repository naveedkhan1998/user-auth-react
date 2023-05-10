import { baseApi } from "./baseApi"


export const managmentStandardApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getStandard:builder.query({
            query:access_token => {
                return{
                    url:'/managment/standard/',
                    method:'GET',
                    headers:{
                        'Authorization':`Bearer ${access_token}`,
                    }
                }
            },
        }),
        addStandard:builder.mutation({
            query:({actualData,access_token}) => {
                return{
                    url:'/managment/standard/',
                    method:'POST',
                    body:actualData,
                    headers:{
                        'Authorization':`Bearer ${access_token}`,
                        'Content-type':'application/json',
                    }
                }
            }
        }),
      }),
})

export const { useGetStandardQuery,useAddStandardMutation } = managmentStandardApi