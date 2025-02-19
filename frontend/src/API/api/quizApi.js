// src/features/api/quizApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// const USER_API = "http://localhost:8080/api/v1/quiz/"
const USER_API = "https://quiz-ms.onrender.com/api/v1/quiz"

export const quizApi = createApi({
  reducerPath: 'quizApi',
   baseQuery:fetchBaseQuery({
          baseUrl:USER_API,
          credentials:'include'
      }),  // Assuming the API is hosted on the same domain
  endpoints: (builder) => ({
    // create the Quiz
    createQuiz: builder.mutation({
      query: (quizData) => ({
        url: '/create-quiz',
        method: 'POST',
        body: quizData,
      }),
    }),

    getQuiz : builder.query({
      query:() => ({
        url:"/getQuiz",
        method:"GET",
      })
    }),
    // /Get quizzes by instructor ID
    getQuizzesByInstructorId: builder.query({
      // query: (instructorId) => ({
      //   url: `/creatorQuiz?instructorId=${instructorId}`, // Assuming this is the endpoint
      //   method: "GET",
      // }),
      query: () => ({
        url: '/creatorQuiz', // Assuming this is the endpoint
        method: "GET",
      }),
    }),

    editQuiz: builder.mutation({
      query: ({ quizId, updatedQuizData }) => ({
        url: `/edit-quiz/${quizId}`,
        method: 'PUT',
        body: updatedQuizData,
      }),
    }),
 quizById:builder.query({
  query:(quizId)=>({
    url:`/quiz/${quizId}`,
    method:'GET',
  })
 }),

 togglePublishQuiz: builder.mutation({
  query: ({ id, newPublishStatus }) => ({
    url: `publish/${id}`, // Endpoint to handle publish/unpublish
    method: 'PATCH',                // Use PATCH because we're updating the publish status
    body:  newPublishStatus ,          // Send the updated publish status
  }),
}),



deleteQuiz: builder.mutation({
  query: (quizId) => ({
    url: `deleteQuiz/${quizId}`, // Path to the delete endpoint
    method: 'DELETE', // DELETE method for the deletion operation
  }),
}),

  }),
});

export const { useCreateQuizMutation ,useGetQuizzesByInstructorIdQuery,useEditQuizMutation, useQuizByIdQuery, useGetQuizQuery, useTogglePublishQuizMutation,useDeleteQuizMutation} = quizApi;
