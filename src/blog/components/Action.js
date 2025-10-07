// Action creators for Todo

export const addTodo = (text) => ({
  type: "ADD",
  payload: text,
});

export const deleteTodo = (index) => ({
  type: "DELETE",
  payload: index,
});

export const editTodo = (index, newValue) => ({
  type: "EDIT",
  payload: { index, newValue },
});
