import api from "../utils/api";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";

// GET POSTS
export const getPosts = () => async (dispatch) => {
  try {
    const res = await api.get(
      "https://connect-api-1fm9.onrender.com/api/posts"
    );

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(
      `https://connect-api-1fm9.onrender.com/api/posts/like/${id}`
    );

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(
      `https://connect-api-1fm9.onrender.com/api/posts/unlike/${id}`
    );
    // console.log("removelike->", res.data);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    // console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.delete(`https://connect-api-1fm9.onrender.com/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    // console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//ADD post
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await api.post(
      `https://connect-api-1fm9.onrender.com/api/posts/`,
      formData
    );
    // console.log("removelike->", res.data);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    // console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await api.get(
      `https://connect-api-1fm9.onrender.com/api/posts/${id}`
    );

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    // console.log("gepost error->", err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add Comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await api.post(
      `https://connect-api-1fm9.onrender.com/api/posts/comment/${postId}`,
      formData
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    // console.log("gepost error->", err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.delete(
      `https://connect-api-1fm9.onrender.com/api/posts/comment/${postId}/${commentId}`
    );
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    // console.log("gepost error->", err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
