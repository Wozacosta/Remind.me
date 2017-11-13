import { combineReducers } from 'redux';

export const CREATE_TODO = 'CREATE_TODO';
export const INIT_TODOS = 'INIT_TODOS';
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const REMOVE_TODO = 'REMOVE_TODO';

const todos = (state = [], action) => {
  switch (action.type) {
    case INIT_TODOS:
      return action.payload;
    case CREATE_TODO:
      // console.log(`in create todo with payload = `, action.payload);
      return [action.payload, ...state];
    case CHANGE_STATUS:
      let indexToPatch = state.findIndex(todo => {
        return todo.id === action.payload;
      });
      let updatedTodos = [...state];
      updatedTodos[indexToPatch].done = !updatedTodos[indexToPatch].done;
      // console.log(`index to patch = ${indexToPatch}`);
      return updatedTodos;
    case REMOVE_TODO:
      let indexToRemove = state.findIndex(todo => {
        return todo.id === action.payload;
      });
        updatedTodos = [...state];
      // console.log(`index to remove = ${indexToRemove}`);
      updatedTodos.splice(indexToRemove, 1);
      return updatedTodos;
    default:
      return state;
  }
};

export const reducer = combineReducers({ todos });
// export const reducer = combineReducers({todos, user}) if multiple reducers
