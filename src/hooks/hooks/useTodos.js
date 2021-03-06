import { useReducer } from 'react';
import uuidv4 from 'uuid/v4';

export const ACTIONS = {
  FILTER_COMPLETE: 'FILTER_COMPLETE',
  FILTER_ALL: 'FILTER_ALL',
  FILTER_INCOMPLETE: 'FILTER_INCOMPLETE',
  ADD_TODO: 'ADD_TODO',
  EDIT_TODO: 'EDIT_TODO',
  REMOVE_TODO: 'REMOVE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  CLEAR_COMPLETED_TODOS: 'CLEAR_COMPLETED_TODOS'
};

const initialState = {
  todos: [{ id: uuidv4(), name: 'Give a Talk at TulsaJS', completed: false }],
  editingTodoId: null,
  filter: ACTIONS.ALL
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      if (state.editingTodoId) {
        return {
          ...state,
          todos: state.todos.map(todo => {
            if (todo.id === state.editingTodoId) {
              return { ...todo, name: action.name };
            } else {
              return todo;
            }
          })
        };
      } else {
        return {
          ...state,
          todos: [
            ...state.todos,
            { id: uuidv4(), name: action.name, completed: false }
          ]
        };
      }
    case ACTIONS.EDIT_TODO:
      return { ...state, editingTodoId: action.id };
    case ACTIONS.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      };
    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.id) {
            return { ...todo, completed: !todo.completed };
          } else {
            return todo;
          }
        })
      };
    case ACTIONS.CLEAR_COMPLETED_TODOS:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };
    case ACTIONS.FILTER_ALL:
      return {
        ...state,
        filter: ACTIONS.FILTER_ALL
      };
    case ACTIONS.FILTER_COMPLETE:
      return {
        ...state,
        filter: ACTIONS.FILTER_COMPLETE
      };
    case ACTIONS.FILTER_INCOMPLETE:
      return {
        ...state,
        filter: ACTIONS.FILTER_INCOMPLETE
      };
    default:
      throw new Error();
  }
}

export default function useTodos(ref) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    dispatch,
    filter: state.filter,
    todos: state.todos
  };
}
