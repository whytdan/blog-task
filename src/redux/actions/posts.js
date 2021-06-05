import axios from 'axios';
import { FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR } from './actionTypes';

const { REACT_APP_API_URL: URL } = process.env;

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(URL);
      dispatch(fetchPostsSuccess(data));
    } catch (error) {
      dispatch(fetchPostsError(error.message));
    }
  };
};

function fetchPostsSuccess(posts) {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts,
  };
}

function fetchPostsError(error) {
  return {
    type: FETCH_POSTS_ERROR,
    payload: error,
  };
}
