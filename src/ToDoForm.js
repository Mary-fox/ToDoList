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
    if (inputValue.trim() === "") return;
    setTasks([...tasks, { text: inputValue, completed: false }]);
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
    setEditValue(tasks[index].text);
    setIsEditing(true);
  }

  function handleCancel() {
    setEditingIndex(null);
    setIsEditing(false);
  }

  function handleSave() {
    const newTasks = tasks.map((task, index) =>
      index === editingIndex ? { ...task, text: editValue } : task
    );
    setTasks(newTasks);
    setEditingIndex(null);
    setIsEditing(false);
  }
  function handleComplete(index) {
    const newTasks = tasks.map((task, i) =>
      i === index
        ? {
            ...task,
            completed: !task.completed,
          }
        : task
    );
    setTasks(newTasks);
  }
  return (
    <div className="wrapper">
      <h1>My Todo List</h1>
      <ol className="tasks">
        {tasks.map((task, index) => (
          <li key={index} className="tasks__item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleComplete(index)}
            />
            {index === editingIndex && isEditing ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <div className="tasks__buttons">
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <span
                  className={`tasks__text ${
                    task.completed ? "tasks__completed" : ""
                  }`}
                >
                  {task.text}
                </span>

                <div className="tasks__buttons">
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
      <form className="tasks__form">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="new task"
        />
        <button onClick={handleSubmit}>Add Todo</button>
      </form>
    </div>
  );
}

export default TodoForm;
