import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) return alert("Enter username and password");
    if (password !== confirm) return alert("Passwords do not match");
    try {
      signup(username, password);
      navigate("/posts");
    } catch (err) {
      alert(err.message || "Signup failed");
    }
  }

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h3 className="mb-3">Create Account</h3>
      <form onSubmit={handleSubmit} className="d-grid gap-3">
        <input className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="form-control" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input className="form-control" placeholder="Confirm Password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <button className="btn btn-success">Sign Up</button>
      </form>
      <div className="mt-3 text-center">
        <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate("/login")}>Back to Sign In</button>
      </div>
    </div>
  );
}
