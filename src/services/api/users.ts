import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserTypes } from "./users.type";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => {
    return {
      getUsers: builder.query<UserTypes[], void>({
        query: () => "/users",
        providesTags: ["Users"],
      }),
      getUserDetails: builder.query<UserTypes, number | string>({
        query: (id) => `/users/${id}`,
      }),
      createUser: builder.mutation<UserTypes, Partial<UserTypes>>({
        query: (user) => ({
          url: "/users",
          method: "POST",
          body: user,
        }),
        invalidatesTags: ["Users"],
      }),
      updateUser: builder.mutation<UserTypes, UserTypes>({
        query: (user) => ({
          url: `/users/${user.id}`,
          method: "PUT",
          body: user,
        }),
        invalidatesTags: ["Users"],
      }),
      deleteUser: builder.mutation<void, number>({
        query: (id) => ({
          url: `/users/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Users"],
      }),
    };
  },
});

export const {
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApi;
