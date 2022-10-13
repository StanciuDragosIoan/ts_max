import React from "react";
import "./TodoList.css";

interface TodoListProps {
  items: { id: string; text: string }[];
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ items, onDeleteTodo }) => {
  return (
    <ul>
      {items.map((i) => (
        <li key={i.id}>
          <span>{i.text}</span>
          <button onClick={onDeleteTodo.bind(null, i.id)}>DELETE</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
