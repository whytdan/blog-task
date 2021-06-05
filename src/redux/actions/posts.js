import axios from 'axios';
import { FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR } from './actionTypes';

const { REACT_APP_API_URL: URL } = process.env;

console.log(process.env);

const fetchPostsSuccess = (posts) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts,
  };
};

const fetchPostsError = (error) => {
  return {
    type: FETCH_POSTS_ERROR,
    payload: error,
  };
};

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/posts/?_limit=20&_offset=0`);
      disspatch(fetchPostsSuccess(data));
    } catch (error) {
      dispatch(fetchPostsError(error.message));
    }
  };
};
