import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from 'react-testing-library';
import ClassApp from '../ClassApp';

afterEach(cleanup);

const setup = () => {
  const utils = render(<ClassApp />);
  const input = utils.getByLabelText('todo-input');
  return {
    ...utils,
    input
  };
};

describe('ClassApp Todos', () => {
  it('renders without crashing', () => {
    setup();
  });

  it('renders example todo', () => {
    const { getByTestId } = setup();
    expect(getByTestId('item').textContent).toBe('Give a Talk at TulsaJS');
  });

  it('allows adding a todo', () => {
    const { getByTestId, input, getByText } = setup();

    fireEvent.change(input, { target: { value: 'Take out the trash' } });
    expect(input.value).toBe('Take out the trash');
    fireEvent.submit(getByTestId('form'));
    expect(getByText('Take out the trash')).toBeTruthy();
  });

  it('allows deleting a todo', () => {
    const { getByTestId, queryByText } = setup();
    expect(queryByText('Give a Talk at TulsaJS').textContent).toBeTruthy();
    fireEvent.click(getByTestId('delete-todo'));
    expect(queryByText('Give a Talk at TulsaJS')).toBeFalsy();
  });

  it('allows editing a todo', () => {
    const { getByTestId, queryByText, input } = setup();

    //setup and expect placeholder todo is in place
    expect(queryByText('Give a Talk at TulsaJS').textContent).toBeTruthy();

    //edit and submit a new name for the todo
    fireEvent.click(getByTestId('edit-todo'));
    fireEvent.change(input, { target: { value: 'Take out the trash' } });
    fireEvent.submit(getByTestId('form'));

    //expect that the old todo name is gone and it's been renamed
    expect(queryByText('Give a Talk at TulsaJS')).toBeFalsy();
    expect(queryByText('Take out the trash')).toBeTruthy();
  });

  it('allows completing a todo', () => {
    const { getByTestId } = setup();
    expect(getByTestId('todo-checkbox').checked).toBeFalsy();
    fireEvent.click(getByTestId('todo-checkbox'));
    expect(getByTestId('todo-checkbox').checked).toBeTruthy();
  });

  it('allows completing and toggling back to incomplete', () => {
    const { getByTestId } = setup();
    expect(getByTestId('todo-checkbox').checked).toBeFalsy();
    fireEvent.click(getByTestId('todo-checkbox'));
    expect(getByTestId('todo-checkbox').checked).toBeTruthy();
    fireEvent.click(getByTestId('todo-checkbox'));
    expect(getByTestId('todo-checkbox').checked).toBeFalsy();
  });

  it('filters to only incomplete todos', () => {
    const { getByTestId, input, queryByText } = setup();

    fireEvent.change(input, { target: { value: 'Take out the trash' } });
    fireEvent.submit(getByTestId('form'));
    fireEvent.click(queryByText('Take out the trash').parentElement);
    fireEvent.click(queryByText(/Incomplete/));
    expect(queryByText('Give a Talk at TulsaJS')).toBeTruthy();
    expect(queryByText('Take out the trash')).toBeFalsy();
  });

  it('filters to only completed todos', () => {
    const { getByTestId, input, queryByText } = setup();

    fireEvent.change(input, { target: { value: 'Take out the trash' } });
    fireEvent.submit(getByTestId('form'));
    fireEvent.click(queryByText('Take out the trash').parentElement);
    fireEvent.click(queryByText(/Completed/));
    expect(queryByText('Give a Talk at TulsaJS')).toBeFalsy();
    expect(queryByText('Take out the trash')).toBeTruthy();
  });

  it('filters to all todos', () => {
    const { getByTestId, input, queryByText } = setup();

    fireEvent.change(input, { target: { value: 'Take out the trash' } });
    fireEvent.submit(getByTestId('form'));
    fireEvent.click(queryByText('Take out the trash').parentElement);
    fireEvent.click(queryByText(/All/));
    expect(queryByText('Give a Talk at TulsaJS')).toBeTruthy();
    expect(queryByText('Take out the trash')).toBeTruthy();
  });

  it('removes all completed todos', () => {
    const { getByTestId, input, queryByText } = setup();

    fireEvent.change(input, { target: { value: 'Take out the trash' } });
    fireEvent.submit(getByTestId('form'));
    fireEvent.click(queryByText('Take out the trash').parentElement);

    fireEvent.change(input, { target: { value: 'Do the dishes' } });
    fireEvent.submit(getByTestId('form'));
    fireEvent.click(queryByText('Do the dishes').parentElement);

    fireEvent.click(queryByText(/Clear Completed/));
    expect(queryByText('Give a Talk at TulsaJS')).toBeTruthy();
    expect(queryByText('Do the dishes')).toBeFalsy();
    expect(queryByText('Take out the trash')).toBeFalsy();
  });
});
