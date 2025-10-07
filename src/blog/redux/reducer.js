import * as T from "./actionTypes";

const initialState = {
  posts: [],
  loading: false,
  error: null,
  sort: "date",
  filter: { category: "", author: "" },
};

export const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case T.FETCH_POSTS_REQUEST:
    case T.ADD_POST_REQUEST:
    case T.UPDATE_POST_REQUEST:
    case T.DELETE_POST_REQUEST:
      return { ...state, loading: true, error: null };

    case T.FETCH_POSTS_SUCCESS:
      return { ...state, loading: false, posts: action.payload };
    case T.ADD_POST_SUCCESS:
      return { ...state, loading: false, posts: [...state.posts, action.payload] };
    case T.UPDATE_POST_SUCCESS: {
      const updated = state.posts.map((p) => (p.id === action.payload.id ? action.payload : p));
      return { ...state, loading: false, posts: updated };
    }
    case T.DELETE_POST_SUCCESS:
      return { ...state, loading: false, posts: state.posts.filter((p) => p.id !== action.payload) };

    case T.FETCH_POSTS_FAILURE:
    case T.ADD_POST_FAILURE:
    case T.UPDATE_POST_FAILURE:
    case T.DELETE_POST_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case T.SET_SORT:
      return { ...state, sort: action.payload };
    case T.SET_FILTER:
      return { ...state, filter: { ...state.filter, ...action.payload } };

    default:
      return state;
  }
};
