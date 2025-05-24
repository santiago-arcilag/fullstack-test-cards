import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
      providesTags: ['Products'],
    }),
    createTransaction: builder.mutation({
      query: (body) => ({
        url: '/transactions',
        method: 'POST',
        body,
      }),
    }),
    payTransaction: builder.mutation({
      query: (body) => ({
        url: '/transactions/pay',
        method: 'POST',
        body,
      }),
    }),
    getTransaction: builder.query({
      query: (id) => `/transactions/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useCreateTransactionMutation, useGetTransactionQuery, usePayTransactionMutation } = api; 