import { configureStore } from "@reduxjs/toolkit";
import { adminReducer } from "./reducers/adminReducers";
import { courseReducer } from "./reducers/courseReducers";
import { userReducer } from "./reducers/userReducers";

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    course: courseReducer,
  },
});

export default store;
export const server = "https://winners-club-backend.vercel.app/api/v1";
