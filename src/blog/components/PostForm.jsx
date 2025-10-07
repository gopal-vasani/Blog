import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/thunks";
import { useNavigate } from "react-router-dom";

export default function PostForm() {
  const [form, setForm] = useState({ title: "", description: "", date: "", image: "", category: "", author: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return alert("Title and description are required");
    const payload = { ...form, date: form.date || new Date().toISOString(), popularity: 0 };
    dispatch(addPost(payload));
    navigate("/posts");
  }

  return (
    <div className="container">
      <h3>Add Post</h3>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input className="form-control" name="title" value={form.title} onChange={handleChange} />
        </div>
        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" value={form.description} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Date</label>
          <input type="date" className="form-control" name="date" value={form.date} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Category</label>
          <input className="form-control" name="category" value={form.category} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Author</label>
          <input className="form-control" name="author" value={form.author} onChange={handleChange} />
        </div>
        <div className="col-12">
          <label className="form-label">Image URL</label>
          <input className="form-control" name="image" value={form.image} onChange={handleChange} />
        </div>
        <div className="col-12">
          <button className="btn btn-success">Save</button>
        </div>
      </form>
    </div>
  );
}
