import { apiSlice } from './apiSlice';

export const counselorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCounselors: builder.query({
      query: () => '/counselors',
      providesTags: ['Counselor'],
    }),
    getCounselor: builder.query({
      query: (id) => `/counselors/${id}`,
      providesTags: ['Counselor'],
    }),
    createCounselor: builder.mutation({
      query: (data) => ({
        url: '/counselors',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Counselor'],
    }),
    updateCounselor: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/counselors/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Counselor'],
    }),
    deleteCounselor: builder.mutation({
      query: (id) => ({
        url: `/counselors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Counselor'],
    }),
  }),
});

export const {
  useGetCounselorsQuery,
  useGetCounselorQuery,
  useCreateCounselorMutation,
  useUpdateCounselorMutation,
  useDeleteCounselorMutation,
} = counselorsApiSlice; 