import {
    fetchPostsRequest,
    fetchPostsSuccess,
    fetchPostsFailure,
    addPostRequest,
    addPostSuccess,
    addPostFailure,
    updatePostRequest,
    updatePostSuccess,
    updatePostFailure,
    deletePostRequest,
    deletePostSuccess,
    deletePostFailure,
  } from "./actions";

  const API = "http://localhost:3000/posts";

export const fetchPosts = () => async (dispatch) => {
  try {
    dispatch(fetchPostsRequest());
    const res = await fetch(API);
    if (!res.ok) throw new Error("Failed to fetch posts");
    const data = await res.json();
    dispatch(fetchPostsSuccess(data));
  } catch (err) {
    dispatch(fetchPostsFailure(err.message));
  }
};

export const addPost = (post) => async (dispatch) => {
  try {
    dispatch(addPostRequest());
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error("Failed to add post");
    const data = await res.json();
    dispatch(addPostSuccess(data));
  } catch (err) {
    dispatch(addPostFailure(err.message));
  }
};

export const updatePost = (id, updates) => async (dispatch) => {
  try {
    dispatch(updatePostRequest());
    const res = await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update post");
    const data = await res.json();
    dispatch(updatePostSuccess(data));
  } catch (err) {
    dispatch(updatePostFailure(err.message));
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch(deletePostRequest());
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete post");
    dispatch(deletePostSuccess(id));
  } catch (err) {
    dispatch(deletePostFailure(err.message));
  }
};
