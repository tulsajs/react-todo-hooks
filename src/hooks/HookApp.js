import React, { useRef, useCallback } from 'react';
import useTodos, { ACTIONS } from './hooks/useTodos';
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

export default function HookApp() {
  const inputRef = useRef(null);
  const { dispatch, filter, todos } = useTodos();

  const filteredTodos = filter => {
    switch (filter) {
      case ACTIONS.FILTER_ALL:
        return todos;
      case ACTIONS.FILTER_COMPLETE:
        return todos.filter(todo => todo.completed);
      case ACTIONS.FILTER_INCOMPLETE:
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };

  const addTodo = useCallback(event => {
    event.preventDefault();
    const name = inputRef.current.value;
    if (name === '') return;
    inputRef.current.value = '';
    dispatch({ type: ACTIONS.ADD_TODO, name });
  });
  const editTodo = useCallback(todo => {
    inputRef.current.value = todo.name;
    inputRef.current.focus();
    dispatch({ type: ACTIONS.EDIT_TODO, id: todo.id });
  });

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
        {filteredTodos(filter).map(todo => (
          <Item key={todo.id} data-testid="item">
            <Label>
              <Checkbox
                data-testid="todo-checkbox"
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  dispatch({ type: ACTIONS.TOGGLE_TODO, id: todo.id })
                }
              />
              <span>{todo.name}</span>
            </Label>
            <span style={{ marginLeft: 'auto' }}>
              <ActionButton
                data-testid="delete-todo"
                style={{ marginRight: 5 }}
                onClick={() =>
                  dispatch({ type: ACTIONS.REMOVE_TODO, id: todo.id })
                }
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
              active={filter === ACTIONS.FILTER_ALL}
              onClick={() => dispatch({ type: ACTIONS.FILTER_ALL })}>
              All {filteredTodos(ACTIONS.FILTER_ALL).length}
            </FooterButton>
          </FooterListItem>
          <FooterListItem>
            <FooterButton
              active={filter === ACTIONS.FILTER_COMPLETE}
              onClick={() => dispatch({ type: ACTIONS.FILTER_COMPLETE })}>
              Completed {filteredTodos(ACTIONS.FILTER_COMPLETE).length}
            </FooterButton>
          </FooterListItem>
          <FooterListItem>
            <FooterButton
              active={filter === ACTIONS.FILTER_INCOMPLETE}
              onClick={() => dispatch({ type: ACTIONS.FILTER_INCOMPLETE })}>
              Incomplete {filteredTodos(ACTIONS.FILTER_INCOMPLETE).length}
            </FooterButton>
          </FooterListItem>
          {filteredTodos(ACTIONS.FILTER_COMPLETE).length > 0 && (
            <FooterListItem>
              <FooterButton
                onClick={() =>
                  dispatch({ type: ACTIONS.CLEAR_COMPLETED_TODOS })
                }>
                Clear Completed
              </FooterButton>
            </FooterListItem>
          )}
        </FooterList>
      </Footer>
    </>
  );
}
