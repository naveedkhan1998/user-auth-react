import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../features/authSlice";
import { getToken, storeToken, removeToken } from "./LocalStorageService";

const API_BASE_URL = "https://naveedkhan98.pythonanywhere.com";
//export const API_BASE_URL = "http://localhost:8000";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log("Attempting to refresh token");
    const { refresh_token } = getToken();

    try {
      const refreshResult = await baseQuery(
        {
          url: "/api/user/refresh_token/",
          method: "POST",
          body: { refresh: refresh_token },
          headers: {
            "Content-Type": "application/json",
          },
        },
        api,
        extraOptions
      );

      if (refreshResult?.data) {
        console.log("Token refresh successful");
        storeToken(refreshResult.data);
        api.dispatch(setCredentials(refreshResult.data));

        // Retry original query with new access token
        result = await baseQuery(
          {
            ...args,
            headers: {
              ...args.headers,
              Authorization: `Bearer ${refreshResult.data.access}`,
            },
          },
          api,
          extraOptions
        );
      } else {
        console.log("Token refresh failed");
        api.dispatch(logOut());
        removeToken();
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
      api.dispatch(logOut());
      removeToken();
    }
  }

  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
