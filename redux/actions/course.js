import axios from "axios";
import {
  allCoursesFail,
  allCoursesRequest,
  allCoursesSuccess,
} from "../reducers/courseReducers";
import { server } from "../store";

export const getAllCourses = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch(allCoursesRequest());

    const { data } = await axios.get(`${server}/admin/courses`, config);

    dispatch(allCoursesSuccess(data.courses));
  } catch (error) {
    dispatch(allCoursesFail(error.response.data.message));
  }
};
