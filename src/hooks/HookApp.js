import React, { useState, useRef } from 'react';
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

function useTodos(defaultTodos) {
  const inputRef = useRef(null);
  const [todos, setTodos] = useState(defaultTodos);
  const [editingTodoId, setEditingTodoId] = useState(null);

  const addTodo = event => {
    event.preventDefault();
    const name = inputRef.current.value;
    if (name === '') return;
    inputRef.current.value = '';
    if (editingTodoId) {
      setTodos(
        todos.map(todo => {
          if (todo.id === editingTodoId) {
            return { ...todo, name };
          } else {
            return todo;
          }
        })
      );
    } else {
      setTodos([...todos, { id: uuidv4(), name, completed: false }]);
    }
  };

  const removeTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = todo => {
    inputRef.current.value = todo.name;
    setEditingTodoId(todo.id);
    inputRef.current.focus();
  };

  const toggleTodoStatus = id => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return [
    addTodo,
    editTodo,
    removeTodo,
    inputRef,
    toggleTodoStatus,
    clearCompleted,
    todos
  ];
}

function useFilters(todos) {
  const [filter, setFilter] = useState(ALL);

  const filterTodos = (f = filter) => {
    switch (f) {
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

  return [filter, setFilter, filterTodos];
}

export default function HookApp() {
  const [
    addTodo,
    editTodo,
    removeTodo,
    inputRef,
    toggleTodoStatus,
    clearCompleted,
    todos
  ] = useTodos([
    { id: uuidv4(), name: 'Give a Talk at TulsaJS', completed: false }
  ]);
  const [filter, setFilter, filterTodos] = useFilters(todos);

  return (
    <>
      <Header>Todos</Header>
      <form data-testid="form" noValidate onSubmit={addTodo}>
        <Label htmlFor="todo-input">
          <Input
            id="todo-input"
            aria-label="todo-input"
            ref={inputRef}
            placeholder="What needs to be done?"
          />
        </Label>
      </form>
      <List>
        {filterTodos().map(todo => (
          <Item key={todo.id} data-testid="item">
            <Label>
              <Checkbox
                data-testid="todo-checkbox"
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodoStatus(todo.id)}
              />
              <span>{todo.name}</span>
            </Label>
            <span style={{ marginLeft: 'auto' }}>
              <ActionButton
                data-testid="delete-todo"
                style={{ marginRight: 5 }}
                onClick={() => removeTodo(todo.id)}
              />
              <ActionButton
                data-testid="edit-todo"
                type="edit"
                onClick={() => editTodo(todo)}
              />
            </span>
          </Item>
        ))}
      </List>
      <Footer>
        <FooterList>
          <FooterListItem>
            <FooterButton
              active={filter === ALL}
              onClick={() => setFilter(ALL)}>
              All {filterTodos(ALL).length}
            </FooterButton>
          </FooterListItem>
          <FooterListItem>
            <FooterButton
              active={filter === COMPLETE}
              onClick={() => setFilter(COMPLETE)}>
              Completed {filterTodos(COMPLETE).length}
            </FooterButton>
          </FooterListItem>
          <FooterListItem>
            <FooterButton
              active={filter === INCOMPLETE}
              onClick={() => setFilter(INCOMPLETE)}>
              Incomplete {filterTodos(INCOMPLETE).length}
            </FooterButton>
          </FooterListItem>
          {filterTodos(COMPLETE).length > 0 && (
            <FooterListItem>
              <FooterButton onClick={clearCompleted}>
                Clear Completed
              </FooterButton>
            </FooterListItem>
          )}
        </FooterList>
      </Footer>
    </>
  );
}
