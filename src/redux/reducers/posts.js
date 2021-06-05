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
        courses: {
          error: null,
          data: action.courses,
          loading: false,
        },
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        courses: {
          error: action.payload,
          data: [],
          loading: false,
        },
      };
    case FETCH_POSTS_LOADING:
      return {
        ...state,
        courses: {
          ...state.courses,
          loading: true,
        },
      };
    default:
      return state;
  }
}
