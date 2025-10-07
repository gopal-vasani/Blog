import * as T from "./actionTypes";

export const fetchPostsRequest = () => ({ type: T.FETCH_POSTS_REQUEST });
export const fetchPostsSuccess = (posts) => ({ type: T.FETCH_POSTS_SUCCESS, payload: posts });
export const fetchPostsFailure = (error) => ({ type: T.FETCH_POSTS_FAILURE, payload: error });

export const addPostRequest = () => ({ type: T.ADD_POST_REQUEST });
export const addPostSuccess = (post) => ({ type: T.ADD_POST_SUCCESS, payload: post });
export const addPostFailure = (error) => ({ type: T.ADD_POST_FAILURE, payload: error });

export const updatePostRequest = () => ({ type: T.UPDATE_POST_REQUEST });
export const updatePostSuccess = (post) => ({ type: T.UPDATE_POST_SUCCESS, payload: post });
export const updatePostFailure = (error) => ({ type: T.UPDATE_POST_FAILURE, payload: error });

export const deletePostRequest = () => ({ type: T.DELETE_POST_REQUEST });
export const deletePostSuccess = (id) => ({ type: T.DELETE_POST_SUCCESS, payload: id });
export const deletePostFailure = (error) => ({ type: T.DELETE_POST_FAILURE, payload: error });

export const setSort = (sort) => ({ type: T.SET_SORT, payload: sort });
export const setFilter = (filter) => ({ type: T.SET_FILTER, payload: filter });
