import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../API/authSlice"; 
import { authApi } from "@/API/api/authApi";
import { quizApi } from "@/API/api/quizApi";


const rootRedcuer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [quizApi.reducerPath]:quizApi.reducer,
});
export default rootRedcuer;