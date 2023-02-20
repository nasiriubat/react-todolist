import React from 'react';
import useApi from '../hooks/useApi';
import './TodoList.css';

const TodoList = () => {
  const { data, isLoading, error, deleteData } = useApi('https://jsonplaceholder.typicode.com/todos');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>
          <p><span>{todo.id} . </span>{todo.title}</p>
          <button onClick={() => deleteData(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
