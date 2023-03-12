import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const managmentApi = createApi({
  reducerPath: 'managmentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://naveedkhan98.pythonanywhere.com/managment/' }),
  //baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/managment/' }),
  endpoints: (builder) => ({
    getStudent:builder.query({
        query:(access_token) => {
            return{
                url:'get_students/',
                method:'GET',
                headers:{
                    'Authorization':`Bearer ${access_token}`,
                }
            }
        }
    }),
    addStudent:builder.mutation({
        query:(actualData,access_token) => {
            return{
                url:'update_students/',
                method:'POST',
                body:actualData,
                headers:{
                    'Content-type':'application/json',
                    'Authorization':`Bearer ${access_token}`,
                }
            }
        }
    }),

  }),
})
export const { useGetStudentQuery,useAddStudentMutation } = managmentApi