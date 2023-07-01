import "./ToDoForm.css";
import React from "react";
import { useState } from "react";

function TodoForm() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null); //текущая задача
  const [editValue, setEditValue] = useState(""); // значение текущей задачи
  const [isEditing, setIsEditing] = useState(false); //состояние отображения

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTasks([...tasks, inputValue]);
    setInputValue("");
  }

  function handleDelete(index) {
    if (index === editingIndex) {
      setEditingIndex(null);
      setIsEditing(false);
    }
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }

  function handleEdit(index) {
    setEditingIndex(index);
    setEditValue(tasks[index]);
    setIsEditing(true);
  }

  function handleCancel() {
    setEditingIndex(null);
    setIsEditing(false);
  }

  function handleSave() {
    const newTasks = tasks.map((task, index) =>
      index === editingIndex ? editValue : task
    );
    setTasks(newTasks);
    setEditingIndex(null);
    setIsEditing(false);
  }

  return (
    <div>
      <h1>My todo List</h1>
      <form>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="new task"
        />
        <button onClick={handleSubmit}>Add Todo</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {index === editingIndex && isEditing ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                {task}
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoForm;
