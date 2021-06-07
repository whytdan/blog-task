import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_LOADING,
} from '../actions/actionTypes';

const INIT_STATE = {
  data: [],
  total: 0,
  error: null,
  isLoading: false,
};

export default function postsReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        error: null,
        data: action.payload.data,
        total: action.payload.total,
        isLoading: false,
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        data: [],
        error: action.payload,
        isLoading: false,
      };
    case FETCH_POSTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
