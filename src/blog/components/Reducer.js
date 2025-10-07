// Reducer for Todo list

const initialState = [];

export const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD": {
      return [...state, action.payload];
    }
    case "DELETE": {
      const index = action.payload;
      if (index < 0 || index >= state.length) return state;
      const updated = [...state];
      updated.splice(index, 1);
      return updated;
    }
    case "EDIT": {
      const { index, newValue } = action.payload;
      if (index < 0 || index >= state.length) return state;
      const updated = [...state];
      updated[index] = newValue;
      return updated;
    }
    default:
      return state;
  }
};
