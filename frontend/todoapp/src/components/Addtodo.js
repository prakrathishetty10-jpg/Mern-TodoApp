import React, { useState } from 'react';
import axios from 'axios';

function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleAdd = async () => {
    if (!title) return;
    try {
      const res = await axios.post('http://localhost:5000/todos', {
        title,
        completed: false,
      });
      onAdd(res.data);
      setTitle('');
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  return (
    <div className="d-flex justify-content-center mb-3">
      <input
        type="text"
        value={title}
        placeholder="New todo"
        onChange={(e) => setTitle(e.target.value)}
        className="form-control me-2"
        style={{ maxWidth: '400px' }}
      />
      <button className="btn btn-primary" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default AddTodo;
