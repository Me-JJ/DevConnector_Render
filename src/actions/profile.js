import api from "../utils/api";
// eslint-disable-next-line
import { setAlert } from "./alert";

import {
  ACCOUNT_DELETED,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  NO_REPOS,
} from "./types";

//get the current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get(
      "https://connect-api-1fm9.onrender.com/api/profile/me"
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    // console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await api.get(
      "https://connect-api-1fm9.onrender.com/api/profile"
    );
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    // console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get all profile by ID
export const getProfileByID = (userId) => async (dispatch) => {
  try {
    const res = await api.get(
      `https://connect-api-1fm9.onrender.com/api/profile/user/${userId}`
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    // console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    // console.log("username->", username);
    const res = await api.get(
      `https://connect-api-1fm9.onrender.com/api/profile/github/${username}`
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NO_REPOS,
    });
  }
};

//create or update profile
export const createProfile =
  (formData, edit = false) =>
  async (dispatch) => {
    // console.log("formadata=", formData);
    try {
      const res = await api.post(
        "https://connect-api-1fm9.onrender.com/api/profile",
        formData
      );
      // console.log("res->data after post-> ", res.data);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// add experience

export const addExperience = (formData) => async (dispatch) => {
  try {
    const res = await api.put(
      "https://connect-api-1fm9.onrender.com/api/profile/experience",
      formData
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add education

export const addEducation = (formData) => async (dispatch) => {
  try {
    const res = await api.put(
      "https://connect-api-1fm9.onrender.com/api/profile/education",
      formData
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await api.delete(
      `https://connect-api-1fm9.onrender.com/api/profile/experience/${id}`
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await api.delete(
      `https://connect-api-1fm9.onrender.com/api/profile/education/${id}`
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await api.delete(`https://connect-api-1fm9.onrender.com/api/profile`);

      dispatch({
        type: CLEAR_PROFILE,
      });

      dispatch({
        type: ACCOUNT_DELETED,
      });

      dispatch(setAlert("Your account has been permanently deleted", "danger"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
