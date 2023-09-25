import { baseApi } from "./baseApi";

/* api to recieve mes */

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useAddMessageMutation } = messageApi;
