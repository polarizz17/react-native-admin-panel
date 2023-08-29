import axios from "axios";
import {
  addCoursePlaylistFail,
  addCoursePlaylistRequest,
  addCoursePlaylistSuccess,
  createCourseFail,
  createCourseRequest,
  createCourseSuccess,
  deleteCourseFail,
  deleteCoursePlaylistFail,
  deleteCoursePlaylistRequest,
  deleteCoursePlaylistSuccess,
  deleteCourseRequest,
  deleteCourseSuccess,
  deleteMessageFail,
  deleteMessageRequest,
  deleteMessageSuccess,
  deleteUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  getAdminStatsFail,
  getAdminStatsRequest,
  getAdminStatsSuccess,
  getAllMessageFail,
  getAllMessageRequest,
  getAllMessageSuccess,
  getAllUsersFail,
  getAllUsersRequest,
  getAllUsersSuccess,
  singleCourseFail,
  singleCourseRequest,
  singleCourseSuccess,
  singleUserFail,
  singleUserRequest,
  singleUserSuccess,
  updateCourseFail,
  updateCoursePriceFail,
  updateCoursePriceRequest,
  updateCoursePriceSuccess,
  updateCourseRequest,
  updateCourseSuccess,
  updateUserEarningFail,
  updateUserEarningRequest,
  updateUserEarningSuccess,
  updateUserRoleFail,
  updateUserRoleRequest,
  updateUserRoleSuccess,
  updateUserStatusFail,
  updateUserStatusRequest,
  updateUserStatusSuccess,
} from "../reducers/adminReducers";
import { server } from "../store";

export const getDashboardStats = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch(getAdminStatsRequest());

    const { data } = await axios.get(`${server}/admin/stats`, config);

    dispatch(getAdminStatsSuccess(data));
  } catch (error) {
    dispatch(getAdminStatsFail(error.response.data.message));
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch(getAllUsersRequest());

    const { data } = await axios.get(`${server}/admin/users`, config);

    dispatch(getAllUsersSuccess(data.users));
  } catch (error) {
    dispatch(getAllUsersFail(error.response.data.message));
  }
};

export const updateUserRole = (id, role) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch(updateUserRoleRequest());

    const { data } = await axios.put(
      `${server}/admin/user/${id}`,
      { role },
      config
    );

    dispatch(updateUserRoleSuccess(data.message));
  } catch (error) {
    dispatch(updateUserRoleFail(error.response.data.message));
  }
};

export const updateUserStatus = (id, status) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch(updateUserStatusRequest());

    const { data } = await axios.put(
      `${server}/admin/user/subscription/${id}`,
      { status },
      config
    );

    dispatch(updateUserStatusSuccess(data.message));
  } catch (error) {
    dispatch(updateUserStatusFail(error.response.data.message));
  }
};

export const getSingleUser = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch(singleUserRequest());

    const { data } = await axios.get(`${server}/admin/user/${id}`, config);

    dispatch(singleUserSuccess(data.user));
  } catch (error) {
    dispatch(singleUserFail(error.response.data.message));
  }
};

export const updateUserEarning = (id, earning) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch(updateUserEarningRequest());

    const { data } = await axios.put(
      `${server}/admin/user/earning/${id}`,
      { earning },
      config
    );

    dispatch(updateUserEarningSuccess(data.message));
  } catch (error) {
    dispatch(updateUserEarningFail(error.response.data.message));
  }
};

export const getSingleCourse = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch(singleCourseRequest());

    const { data } = await axios.get(`${server}/courses/${id}`, config);

    dispatch(singleCourseSuccess(data.course));
  } catch (error) {
    dispatch(singleCourseFail(error.response.data.message));
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch(deleteUserRequest());

    const { data } = await axios.delete(`${server}/admin/user/${id}`, config);

    dispatch(deleteUserSuccess(data.message));
  } catch (error) {
    dispatch(deleteUserFail(error.response.data.message));
  }
};

export const addCourseToPlaylist = (userId, id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch(addCoursePlaylistRequest());

    const { data } = await axios.post(
      `${server}/admin/addtoplaylist/${userId}?id=${id}`,
      {},
      config
    );

    dispatch(addCoursePlaylistSuccess(data.message));
  } catch (error) {
    dispatch(addCoursePlaylistFail(error.response.data.message));
  }
};

export const deleteCourseFromPlaylist = (userId, id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch(deleteCoursePlaylistRequest());

    const { data } = await axios.delete(
      `${server}/admin/removefromplaylist/${userId}?id=${id}`,
      config
    );

    dispatch(deleteCoursePlaylistSuccess(data.message));
  } catch (error) {
    dispatch(deleteCoursePlaylistFail(error.response.data.message));
  }
};

export const createCourse = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
      withCredentials: true,
    };
    dispatch(createCourseRequest());

    const { data } = await axios.post(
      `${server}/admin/courses/new`,
      formData,
      config
    );

    dispatch(createCourseSuccess(data.message));
  } catch (error) {
    dispatch(createCourseFail(error.response.data.message));
  }
};

export const updateCourse = (id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
      withCredentials: true,
    };
    dispatch(updateCourseRequest());

    const { data } = await axios.put(
      `${server}/admin/courses/${id}`,
      formData,
      config
    );

    dispatch(updateCourseSuccess(data.message));
  } catch (error) {
    dispatch(updateCourseFail(error.response.data.message));
  }
};

export const updateCoursePrice =
  (id, basePrice, discountedPrice, todaysPrice) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      };
      dispatch(updateCoursePriceRequest());

      const { data } = await axios.put(
        `${server}/admin/coursesprice/${id}`,
        {
          basePrice,
          discountedPrice,
          todaysPrice,
        },
        config
      );

      dispatch(updateCoursePriceSuccess(data.message));
    } catch (error) {
      dispatch(updateCoursePriceFail(error.response.data.message));
    }
  };

export const deleteCourse = (id, students) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch(deleteCourseRequest());
    // console.log(students);

    await students.forEach(async (userId) => {
      try {
        const config = {
          withCredentials: true,
        };
        dispatch(deleteCoursePlaylistRequest());

        await axios.delete(
          `${server}/admin/removefromplaylist/${userId}?id=${id}`,
          config
        );

        dispatch(deleteCoursePlaylistSuccess(""));
      } catch (error) {
        dispatch(deleteCoursePlaylistFail(""));
      }
    });

    const { data } = await axios.delete(
      `${server}/admin/courses/${id}`,
      config
    );

    dispatch(deleteCourseSuccess(data.message));
  } catch (error) {
    dispatch(deleteCourseFail(error.response.data.message));
  }
};

export const getAllMessages = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    };

    dispatch(getAllMessageRequest());

    const { data } = await axios.get(`${server}/admin/messages`, config);

    dispatch(getAllMessageSuccess(data.messages));
  } catch (error) {
    dispatch(getAllMessageFail(error.response.data.message));
  }
};

export const deleteMessage = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    };

    dispatch(deleteMessageRequest());

    const { data } = await axios.delete(
      `${server}/admin/messages/${id}`,
      config
    );

    dispatch(deleteMessageSuccess(data.message));
  } catch (error) {
    dispatch(deleteMessageFail(error.response.data.message));
  }
};
