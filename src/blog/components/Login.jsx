import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) return alert("Enter username and password");
    try {
      login(username, password);
      navigate("/posts");
    } catch (err) {
      alert(err.message || "Login failed");
    }
  }

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h3 className="mb-3">Sign In</h3>
      <form onSubmit={handleSubmit} className="d-grid gap-3">
        <input className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="form-control" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary">Sign In</button>
      </form>
      <div className="mt-3 text-center">
        <span className="me-2">New here?</span>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate("/signup")}>Create an account</button>
      </div>
    </div>
  );
}
