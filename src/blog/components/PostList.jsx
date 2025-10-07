import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/thunks";
import { setFilter, setSort } from "../redux/actions";
import { Link } from "react-router-dom";

export default function PostList() {
  const dispatch = useDispatch();
  const { posts, loading, error, sort, filter } = useSelector((s) => s);

  const categories = useMemo(
    () => Array.from(new Set(posts.map((p) => p.category).filter(Boolean))),
    [posts]
  );
  const authors = useMemo(
    () => Array.from(new Set(posts.map((p) => p.author).filter(Boolean))),
    [posts]
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filteredSorted = useMemo(() => {
    let list = [...posts];
    if (filter.category) list = list.filter((p) => p.category === filter.category);
    if (filter.author) list = list.filter((p) => p.author === filter.author);
    if (sort === "date") list.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sort === "popularity") list.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    return list;
  }, [posts, sort, filter]);

  return (
    <div className="container">
      <div className="d-flex gap-3 align-items-end mb-3">
        <div>
          <label className="form-label">Sort</label>
          <select className="form-select" value={sort} onChange={(e) => dispatch(setSort(e.target.value))}>
            <option value="date">Date</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
        <div>
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={filter.category}
            onChange={(e) => dispatch(setFilter({ category: e.target.value }))}
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">Author</label>
          <select
            className="form-select"
            value={filter.author}
            onChange={(e) => dispatch(setFilter({ author: e.target.value }))}
          >
            <option value="">All</option>
            {authors.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div className="ms-auto">
          <Link to="/add" className="btn btn-primary">Add Post</Link>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-3">
        {filteredSorted.map((p) => (
          <div key={p.id} className="col-12 col-md-6 col-lg-4">
            <Link to={`/posts/${p.id}`} className="card h-100 text-decoration-none text-dark">
              {p.image && (
                <img src={p.image} className="card-img-top" alt={p.title} style={{ objectFit: "cover" }} />
              )}
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title mb-0">{p.title}</h5>
                  <small className="text-muted ms-2">{new Date(p.date).toLocaleDateString()}</small>
                </div>
                <p className="card-text flex-grow-1">{p.description}</p>
                <small className="text-muted">Category: {p.category} {p.author ? `| Author: ${p.author}` : ""}</small>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
