import { createAction, createReducer } from "@reduxjs/toolkit";

export const getAdminStatsRequest = createAction("getAdminStats/request");
export const getAdminStatsSuccess = createAction("getAdminStats/success");
export const getAdminStatsFail = createAction("getAdminStats/fail");

export const getAllUsersRequest = createAction("getAllUsers/request");
export const getAllUsersSuccess = createAction("getAllUsers/success");
export const getAllUsersFail = createAction("getAllUsers/fail");

export const singleUserRequest = createAction("singleUser/request");
export const singleUserSuccess = createAction("singleUser/success");
export const singleUserFail = createAction("singleUser/fail");

export const singleCourseRequest = createAction("singleCourse/request");
export const singleCourseSuccess = createAction("singleCourse/success");
export const singleCourseFail = createAction("singleCourse/fail");

export const updateUserRoleRequest = createAction("updateUserRole/request");
export const updateUserRoleSuccess = createAction("updateUserRole/success");
export const updateUserRoleFail = createAction("updateUserRole/fail");

export const updateUserStatusRequest = createAction("updateUserStatus/request");
export const updateUserStatusSuccess = createAction("updateUserStatus/success");
export const updateUserStatusFail = createAction("updateUserStatus/fail");

export const updateUserEarningRequest = createAction(
  "updateUserEarning/request"
);
export const updateUserEarningSuccess = createAction(
  "updateUserEarning/success"
);
export const updateUserEarningFail = createAction("updateUserEarning/fail");

export const deleteUserRequest = createAction("deleteUser/request");
export const deleteUserSuccess = createAction("deleteUser/success");
export const deleteUserFail = createAction("deleteUser/fail");

export const createCourseRequest = createAction("createCourse/request");
export const createCourseSuccess = createAction("createCourse/success");
export const createCourseFail = createAction("createCourse/fail");

export const updateCourseRequest = createAction("updateCourse/request");
export const updateCourseSuccess = createAction("updateCourse/success");
export const updateCourseFail = createAction("updateCourse/fail");

export const updateCoursePriceRequest = createAction(
  "updateCoursePrice/request"
);
export const updateCoursePriceSuccess = createAction(
  "updateCoursePrice/success"
);
export const updateCoursePriceFail = createAction("updateCoursePrice/fail");

export const deleteCourseRequest = createAction("deleteCourse/request");
export const deleteCourseSuccess = createAction("deleteCourse/success");
export const deleteCourseFail = createAction("deleteCourse/fail");

export const addCoursePlaylistRequest = createAction(
  "addCoursePlaylist/request"
);
export const addCoursePlaylistSuccess = createAction(
  "addCoursePlaylist/success"
);
export const addCoursePlaylistFail = createAction("addCoursePlaylist/fail");

export const deleteCoursePlaylistRequest = createAction(
  "deleteCoursePlaylist/request"
);
export const deleteCoursePlaylistSuccess = createAction(
  "deleteCoursePlaylist/success"
);
export const deleteCoursePlaylistFail = createAction(
  "deleteCoursePlaylist/fail"
);

export const getAllMessageRequest = createAction("getAllMessage/request");
export const getAllMessageSuccess = createAction("getAllMessage/success");
export const getAllMessageFail = createAction("getAllMessage/fail");

export const deleteMessageRequest = createAction("deleteMessage/request");
export const deleteMessageSuccess = createAction("deleteMessage/success");
export const deleteMessageFail = createAction("deleteMessage/fail");

export const clearErrors = createAction("clearerror");
export const clearMessage = createAction("clearmessage");

const initialState = {
  loading: false,
  message: null,
  error: null,
  users: null,
  user: null,
  courses: null,
};

export const adminReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAdminStatsRequest, (state) => {
      state.loading = true;
    })
    .addCase(getAdminStatsSuccess, (state, action) => {
      state.loading = false;
      state.userCount = action.payload.userCount;
      state.subscribedUsers = action.payload.subscribedUsers;
      state.noOfCourse = action.payload.noOfCourse;
      state.noOfMessage = action.payload.noOfMessage;
    })
    .addCase(getAdminStatsFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getAllUsersRequest, (state) => {
      state.loading = true;
    })
    .addCase(getAllUsersSuccess, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    })
    .addCase(getAllUsersFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(singleUserRequest, (state) => {
      state.loading = true;
    })
    .addCase(singleUserSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(singleUserFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(singleCourseRequest, (state) => {
      state.loading = true;
    })
    .addCase(singleCourseSuccess, (state, action) => {
      state.loading = false;
      state.course = action.payload;
    })
    .addCase(singleCourseFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateUserRoleRequest, (state) => {
      state.loading = true;
    })
    .addCase(updateUserRoleSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(updateUserRoleFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateUserStatusRequest, (state) => {
      state.loading = true;
    })
    .addCase(updateUserStatusSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(updateUserStatusFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateUserEarningRequest, (state) => {
      state.loading = true;
    })
    .addCase(updateUserEarningSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(updateUserEarningFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteUserRequest, (state) => {
      state.loading = true;
    })
    .addCase(deleteUserSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(deleteUserFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(createCourseRequest, (state) => {
      state.loading = true;
    })
    .addCase(createCourseSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(createCourseFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateCourseRequest, (state) => {
      state.loading = true;
    })
    .addCase(updateCourseSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(updateCourseFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateCoursePriceRequest, (state) => {
      state.loading = true;
    })
    .addCase(updateCoursePriceSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(updateCoursePriceFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteCourseRequest, (state) => {
      state.loading = true;
    })
    .addCase(deleteCourseSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(deleteCourseFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(addCoursePlaylistRequest, (state) => {
      state.loading = true;
    })
    .addCase(addCoursePlaylistSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(addCoursePlaylistFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteCoursePlaylistRequest, (state) => {
      state.loading = true;
    })
    .addCase(deleteCoursePlaylistSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(deleteCoursePlaylistFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getAllMessageRequest, (state) => {
      state.loading = true;
    })
    .addCase(getAllMessageSuccess, (state, action) => {
      state.loading = false;
      state.contact = action.payload;
    })
    .addCase(getAllMessageFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteMessageRequest, (state) => {
      state.loading = true;
    })
    .addCase(deleteMessageSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(deleteMessageFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
      state.error = null;
    })
    .addCase(clearMessage, (state) => {
      state.message = null;
    });
});
