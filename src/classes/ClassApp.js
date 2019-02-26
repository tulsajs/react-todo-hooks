import React, { Component, createRef } from 'react';
import uuidv4 from 'uuid/v4';
import {
  ActionButton,
  Checkbox,
  Footer,
  FooterButton,
  FooterList,
  FooterListItem,
  Header,
  Input,
  Item,
  Label,
  List
} from '../components';

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
    this.todoRef.current.focus();
  };

  removeTodo = id => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id)
    }));
  };

  clearCompleted = () => {
    this.setState(state => ({
      editingTodoId: null,
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
    const { editingTodoId, filter } = this.state;
    const filteredTodos = this.filterTodos();
    return (
      <>
        <Header>Todos</Header>
        <form data-testid="form" noValidate onSubmit={this.addTodo}>
          <Label htmlFor="todo-input">
            <Input
              id="todo-input"
              aria-label="todo-input"
              ref={this.todoRef}
              placeholder="What needs to be done?"
            />
          </Label>
        </form>
        <List>
          {filteredTodos.map(todo => (
            <Item key={todo.id} data-testid="item">
              <Label>
                <Checkbox
                  data-testid="todo-checkbox"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => this.toggleTodoStatus(todo.id)}
                />
                <span>{todo.name}</span>
              </Label>
              {editingTodoId !== todo.id && (
                <span style={{ marginLeft: 'auto' }}>
                  <ActionButton
                    data-testid="delete-todo"
                    style={{ marginRight: 5 }}
                    onClick={() => this.removeTodo(todo.id)}
                  />
                  <ActionButton
                    data-testid="edit-todo"
                    type="edit"
                    onClick={() => this.editTodo(todo)}
                  />
                </span>
              )}
            </Item>
          ))}
        </List>
        <Footer>
          <FooterList>
            <FooterListItem>
              <FooterButton
                active={filter === ALL}
                onClick={() => this.setFilter(ALL)}>
                All {this.filterTodos(ALL).length}
              </FooterButton>
            </FooterListItem>
            <FooterListItem>
              <FooterButton
                active={filter === COMPLETE}
                onClick={() => this.setFilter(COMPLETE)}>
                Completed {this.filterTodos(COMPLETE).length}
              </FooterButton>
            </FooterListItem>
            <FooterListItem>
              <FooterButton
                active={filter === INCOMPLETE}
                onClick={() => this.setFilter(INCOMPLETE)}>
                Incomplete {this.filterTodos(INCOMPLETE).length}
              </FooterButton>
            </FooterListItem>
            {this.filterTodos(COMPLETE).length > 0 && (
              <FooterListItem>
                <FooterButton onClick={this.clearCompleted}>
                  Clear Completed
                </FooterButton>
              </FooterListItem>
            )}
          </FooterList>
        </Footer>
      </>
    );
  }
}
