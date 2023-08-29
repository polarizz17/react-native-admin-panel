import { createAction, createReducer } from "@reduxjs/toolkit";

export const allCoursesRequest = createAction("allCourses/request");
export const allCoursesSuccess = createAction("allCourses/success");
export const allCoursesFail = createAction("allCourses/fail");

const initialState = {
  loading: false,
  courses: null,
};

export const courseReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(allCoursesRequest, (state) => {
      state.loading = true;
    })
    .addCase(allCoursesSuccess, (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    })
    .addCase(allCoursesFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});
