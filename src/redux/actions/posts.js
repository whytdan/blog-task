import axios from 'axios';
import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_LOADING,
} from './actionTypes';

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

export const fetchPostsLoading = () => {
  return {
    type: FETCH_POSTS_LOADING,
  };
};

export const fetchPosts = (pageNumber = 1) => {
  return async (dispatch) => {
    try {
      const end = pageNumber * 20;
      const start = end - 20;

      const response = await axios.get(
        `${URL}/posts/?_start=${start}&_end=${end}`
      );
      dispatch(
        fetchPostsSuccess({
          data: response.data,
          total: response.headers['x-total-count'],
        })
      );
    } catch (error) {
      dispatch(fetchPostsError(error.message));
    }
  };
};
