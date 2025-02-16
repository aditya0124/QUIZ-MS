// // import { configureStore } from "@reduxjs/toolkit";
// // import rootRedcuer from "./rootReducer";
// // import { authApi } from "@/API/api/authApi";

// // export const appStore = configureStore({
// //   reducer: rootRedcuer,
// //   middleware: (defaultMiddleware) =>
// //     defaultMiddleware().concat(
// //       authApi.middleware
// //     ),
// // });

// // const initializeApp = async () => {
// //   await appStore.dispatch(
// //     authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
// //   );
// // };
// // initializeApp();


// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../API/authSlice";
// import { authApi } from "@/API/api/authApi";
// import { quizApi } from "@/API/api/quizApi";
// // import { courseApi } from "@/features/api/courseApi";
// // import { purchaseApi } from "@/features/api/purchaseApi";
// // import { courseProgressApi } from "@/features/api/courseProgressApi";
// export const appStore = configureStore({
//     reducer: {
//         auth: authReducer,
//         [authApi.reducerPath]: authApi.reducer, // Add the API reducer here , // API reducer
//         [quizApi.reducerPath]:quizApi.reducer,  //API Reducer
//         // [purchaseApi.reducerPath]:purchaseApi.reducer,
//         // [courseProgressApi.reducerPath]:courseProgressApi.reducer
//     },
//     middleware: (getDefaultMiddleware) =>
//      getDefaultMiddleware()
//       .concat(authApi.middleware)   // Add authApi middleware
//       .concat(quizApi.middleware)  // Add courseAPI middleware // Correct the middleware setup
//       // .concat(purchaseApi.middleware)
//       // .concat(courseProgressApi.middleware)
// }); 
// // Ensure your app store initialization happens as expected
// // const initializeApp = async () => {
// //   try {
// //     await appStore.dispatch(
// //       authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
// //     );
// //     console.log('User loaded successfully');
// //   } catch (error) {
// //     console.error('Error loading user:', error);
// //   }
// // };

// // Only initialize app once
// // initializeApp();


// const initializeApp = () => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   if (user) {
//     appStore.dispatch(userLoggedIn({ user }));
//   } else {
//     console.log('No user data found in localStorage');
//   }
// };

// initializeApp();



import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../API/authSlice";
import { authApi } from "@/API/api/authApi";
import { quizApi } from "@/API/api/quizApi";
// Import any other API reducers as necessary

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer, // Add the API reducer here
    [quizApi.reducerPath]: quizApi.reducer, // Add quiz API reducer
    // Add other API reducers as needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)   // Add authApi middleware
      .concat(quizApi.middleware), // Add quizApi middleware
});

// Initialize user if data exists in localStorage
// const initializeApp = async () => {
//   const user = JSON.parse(localStorage.getItem("user")); // Check localStorage for saved user data

//   if (user) {
//     // If user data is found, dispatch to store (auth slice)
//     appStore.dispatch({
//       type: "auth/userLoggedIn",
//       payload: { user },
//     });
//   } else {
//     // Otherwise, try loading the user data from the server via authApi
//     try {
//       await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }));
//       console.log("User loaded successfully from API");
//     } catch (error) {
//       console.error("Error loading user:", error);
//     }
//   }
// };
// if regresh our user not get logout
const initializeApp = async () => {
  await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
// initializeApp();
// Only initialize app once on startup
initializeApp();
