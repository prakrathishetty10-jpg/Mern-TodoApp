import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTodo from './components/Addtodo';
import TodoList from './components/todoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');

  // ✅ Fetch todos from backend
  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/todos');
      setTodos(res.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ✅ Add new todo
  const handleAdd = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  // ✅ Toggle todo completion (Complete <-> Undo)
  const handleToggle = async (id, completed) => {
    try {
      const res = await axios.put(`http://localhost:5000/todos/${id}`, {
        completed: !completed, // toggle status
      });
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  // ✅ Delete todo
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  // ✅ Apply filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return todo.completed;
    if (filter === 'Pending') return !todo.completed;
    return true;
  });

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Todo App</h1>

      {/* ✅ Filter Buttons */}
      <div className="mb-3 text-center">
        <button
          className={`btn me-2 ${filter === 'All' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('All')}
        >
          All
        </button>
        <button
          className={`btn me-2 ${filter === 'Completed' ? 'btn-success' : 'btn-outline-success'}`}
          onClick={() => setFilter('Completed')}
        >
          Completed
        </button>
        <button
          className={`btn me-2 ${filter === 'Pending' ? 'btn-warning' : 'btn-outline-warning'}`}
          onClick={() => setFilter('Pending')}
        >
          Pending
        </button>
      </div>

      {/* ✅ Add Todo Component */}
      <AddTodo onAdd={handleAdd} />

      {/* ✅ Todo List Component */}
      <TodoList
        todos={filteredTodos}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
