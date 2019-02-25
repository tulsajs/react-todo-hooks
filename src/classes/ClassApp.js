import React, { Component, createRef } from 'react';
import uuidv4 from 'uuid/v4';

const COMPLETE = 'complete';
const ALL = 'all';
const INCOMPLETE = 'incomplete';

export default class ClassApp extends Component {
  todoRef = createRef();
  state = {
    filter: ALL,
    todos: [{ id: uuidv4(), name: 'Give a Talk at TulsaJS', completed: false }],
    editingTodoId: null
  };

  addTodo = e => {
    e.preventDefault();
    const name = this.todoRef.current.value;
    if (name === '') return;
    this.todoRef.current.value = '';
    if (this.state.editingTodoId) {
      this.setState(state => ({
        editingTodoId: null,
        todos: state.todos.map(todo => {
          return todo.id === this.state.editingTodoId
            ? { ...todo, name }
            : todo;
        })
      }));
    } else {
      this.setState(state => ({
        todos: [...state.todos, { id: uuidv4(), name, completed: false }]
      }));
    }
  };

  editTodo = todo => {
    this.todoRef.current.value = todo.name;
    this.setState(state => ({ editingTodoId: todo.id }));
  };

  removeTodo = id => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id)
    }));
  };

  clearCompleted = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => !todo.completed)
    }));
  };

  toggleTodoStatus = id => {
    this.setState(state => ({
      todos: state.todos.map(todo => {
        return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
      })
    }));
  };

  filterTodos = (filter = this.state.filter) => {
    const { todos } = this.state;

    switch (filter) {
      case ALL:
        return todos;
      case COMPLETE:
        return todos.filter(todo => todo.completed);
      case INCOMPLETE:
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };

  setFilter = key => this.setState(state => ({ ...state, filter: key }));

  render() {
    const { editingTodoId } = this.state;
    const filteredTodos = this.filterTodos();
    return (
      <>
        <ul>
          <li>
            <button onClick={() => this.setFilter(ALL)}>
              All {this.filterTodos(ALL).length}
            </button>
          </li>
          <li>
            <button onClick={() => this.setFilter(COMPLETE)}>
              Completed {this.filterTodos(COMPLETE).length}
            </button>
          </li>
          <li>
            <button onClick={() => this.setFilter(INCOMPLETE)}>
              Incomplete {this.filterTodos(INCOMPLETE).length}
            </button>
          </li>
        </ul>
        <button onClick={this.clearCompleted}>Clear Completed</button>
        <form noValidate onSubmit={this.addTodo}>
          <input ref={this.todoRef} />
          <button>{editingTodoId ? 'update todo' : 'add todo'}</button>
        </form>
        <ul>
          {filteredTodos.map(todo => (
            <li key={todo.id}>
              {todo.name}{' '}
              <button onClick={() => this.toggleTodoStatus(todo.id)}>
                {todo.completed ? 'X' : '[ ]'}
              </button>
              {editingTodoId !== todo.id && (
                <button onClick={() => this.removeTodo(todo.id)}>
                  remove todo
                </button>
              )}
              <button onClick={() => this.editTodo(todo)}>edit todo</button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
