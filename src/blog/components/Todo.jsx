import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./Action";

export default function Todo() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTodo(text.trim()));
    setText("");
  }

  return (
    <div>
      <h1>Todo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter data"
          value={text}
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
