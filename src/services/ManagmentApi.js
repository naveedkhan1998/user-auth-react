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
        },
    }),
    addStudent:builder.mutation({
        query:({actualData,access_token}) => {
            return{
                url:'update_students/',
                method:'POST',
                body:actualData,
                headers:{
                    'Authorization':`Bearer ${access_token}`,
                    'Content-type':'application/json',
                }
            }
        }
    }),
    deleteStudent:builder.mutation({
        query:({id,access_token}) => {
            return{
                url:'update_students/',
                method:'DELETE',
                body:{id:id},
                headers:{
                    'Authorization':`Bearer ${access_token}`,
                    'Content-type':'application/json',
                }
            }
        }
    }),

  }),
})
export const { useGetStudentQuery,useAddStudentMutation,useDeleteStudentMutation } = managmentApi