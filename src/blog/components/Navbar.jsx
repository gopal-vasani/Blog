import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, currentUser, logout } = useContext(AuthContext);
  const linkStyle = ({ isActive }) => ({
    fontWeight: isActive ? 700 : 400,
  });
  return (
    <nav className="navbar navbar-expand navbar-light bg-light px-3 mb-3">
      <NavLink to="/" className="navbar-brand">Blog</NavLink>
      <div className="navbar-nav">
        <NavLink to="/posts" className="nav-link" style={linkStyle}>Posts</NavLink>
        <NavLink to="/add" className="nav-link" style={linkStyle}>Add Post</NavLink>
      </div>
      <div className="ms-auto d-flex align-items-center gap-2">
        {isAuthenticated ? (
          <>
            <span className="badge text-bg-light border">{currentUser?.username}</span>
            <button className="btn btn-outline-secondary btn-sm" onClick={logout}>Sign out</button>
          </>
        ) : (
          <NavLink to="/login" className="btn btn-outline-primary btn-sm">Sign in</NavLink>
        )}
      </div>
    </nav>
  );
}
