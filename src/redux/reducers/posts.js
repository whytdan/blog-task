import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_LOADING,
} from '../actions/actionTypes';

const INIT_STATE = {
  data: [],
  error: null,
  isLoading: false,
};

export default function postsReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        error: null,
        data: action.payload,
        loading: false,
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        data: [],
        error: action.payload,
        loading: false,
      };
    case FETCH_POSTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
