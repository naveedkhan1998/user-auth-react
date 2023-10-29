import { baseApi } from "./baseApi";

/* api to recieve mes */

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessage: builder.query({
      query:(access_token)=>{
        return {
          url: "/api/message/",
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${access_token}`
          },
        };
      },
    }),
    addMessage: builder.mutation({
      query: ( actualData ) => {
        return {
          url: "/api/message/",
          method: "POST",
          body: actualData,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
  }),
});

export const { useAddMessageMutation,useGetMessageQuery } = messageApi;
