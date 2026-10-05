import React from 'react';

function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul className="list-group mt-3">
      {todos.map((todo) => (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          key={todo._id}
        >
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title} - {todo.completed ? 'Completed' : 'Pending'}
          </span>

          <div>
            {/* ✅ Toggle Button: Complete ↔ Undo */}
            <button
              className={`btn btn-sm me-2 ${
                todo.completed ? 'btn-secondary' : 'btn-success'
              }`}
              onClick={() => onToggle(todo._id, todo.completed)}
            >
              {todo.completed ? 'Undo' : 'Complete'}
            </button>

            {/* ✅ Delete Button */}
            <button
              className="btn btn-sm btn-danger"
              onClick={() => onDelete(todo._id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;

