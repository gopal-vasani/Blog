import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchPosts, updatePost } from "../redux/thunks";
import { useNavigate, useParams } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts } = useSelector((s) => s);

  const post = useMemo(() => posts.find((p) => String(p.id) === String(id)), [posts, id]);

  useEffect(() => {
    if (!post) dispatch(fetchPosts());
  }, [post, dispatch]);

  const [edit, setEdit] = useState(null);

  useEffect(() => {
    if (post) setEdit({ ...post });
  }, [post]);

  if (!post) return <div className="container">Loading...</div>;

  function onChange(e) {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  }

  function onSave() {
    dispatch(updatePost(post.id, edit));
    navigate("/posts");
  }

  function onDelete() {
    if (window.confirm("Delete this post?")) {
      dispatch(deletePost(post.id));
      navigate("/posts");
    }
  }

  return (
    <div className="container">
      <h3>Edit Post</h3>
      <div className="row g-3">
        {edit?.image ? (
          <div className="col-12">
            <img
              src={edit.image}
              alt={edit.title || "Post image"}
              style={{ maxWidth: "100%", height: "auto", borderRadius: 4 }}
            />
          </div>
        ) : null}
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input className="form-control" name="title" value={edit?.title || ""} onChange={onChange} />
        </div>
        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" value={edit?.description || ""} onChange={onChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Date</label>
          <input type="date" className="form-control" name="date" value={(edit?.date || "").slice(0,10)} onChange={onChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Category</label>
          <input className="form-control" name="category" value={edit?.category || ""} onChange={onChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Author</label>
          <input className="form-control" name="author" value={edit?.author || ""} onChange={onChange} />
        </div>
        <div className="col-12">
          <label className="form-label">Image URL</label>
          <input className="form-control" name="image" value={edit?.image || ""} onChange={onChange} />
        </div>
        <div className="col-12 d-flex gap-2">
          <button className="btn btn-primary" onClick={onSave}>Save</button>
          <button className="btn btn-danger" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
