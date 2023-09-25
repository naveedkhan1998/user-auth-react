import { baseApi } from "./baseApi";

export const managmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudent: builder.query({
      query: (standard_id, access_token) => {
        return {
          url: `/managment/students/?standard=${standard_id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    addStudent: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: "/managment/update_students/",
          method: "POST",
          body: actualData,
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-type": "application/json",
          },
        };
      },
    }),
    deleteStudent: builder.mutation({
      query: ({ id, access_token }) => {
        return {
          url: "/managment/update_students/",
          method: "DELETE",
          body: { id: id },
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-type": "application/json",
          },
        };
      },
    }),
  }),
});

export const {
  useGetStudentQuery,
  useAddStudentMutation,
  useDeleteStudentMutation,
} = managmentApi;
