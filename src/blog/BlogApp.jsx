import React from "react";
import { Provider } from "react-redux";
import { blogStore } from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostDetails from "./components/PostDetails";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function BlogApp() {
  return (
    <Provider store={blogStore}>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/add" element={
              <PrivateRoute>
                <PostForm />
              </PrivateRoute>
            } />
            <Route path="/posts/:id" element={
              <PrivateRoute>
                <PostDetails />
              </PrivateRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<PostList />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}
