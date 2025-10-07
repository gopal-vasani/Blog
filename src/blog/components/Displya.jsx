import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, editTodo } from "./Action";

export default function Display() {
  const data = useSelector((store) => store);
  const dispatch = useDispatch();

  function handleDelete(i) {
    dispatch(deleteTodo(i));
  }

  function handleEdit(i) {
    const newValue = window.prompt("Enter the value", data[i]);
    if (newValue !== null && newValue.trim() !== "") {
      dispatch(editTodo(i, newValue.trim()));
    }
  }

  return (
    <div>
      <h1>Display</h1>
      {data.map((el, i) => (
        <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <li style={{ listStyle: "decimal" }}>{el}</li>
          <button onClick={() => handleEdit(i)}>Edit</button>
          <button onClick={() => handleDelete(i)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
