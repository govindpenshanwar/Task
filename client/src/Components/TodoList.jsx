import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos } from '../redux/Slice';
import TodoItem from './TodoItem';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [dispatch, status]);

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = todos.map((todo) => (
      <TodoItem key={todo._id} todo={todo} />
    ));
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default TodoList;
