import React, { useState } from "react";
import "./TaskList.css";

function TaskList({ tasks, filteredTasks, setTasks }) {
  const [editingIndex, setEditingIndex] = useState(null); //текущая задача
  const [editValue, setEditValue] = useState(""); // значение текущей задачи
  const [isEditing, setIsEditing] = useState(false); //состояние отображения

  function resetEditing() {
    setEditingIndex(null);
    setIsEditing(false);
  }
  function handleDelete(index) {
    if (index === editingIndex) {
      resetEditing()
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
    resetEditing()
  }

  function handleSave() {
    const newTasks = tasks.map((task, index) =>
      index === editingIndex ? { ...task, text: editValue } : task
    );
    setTasks(newTasks);
    resetEditing()
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
    <ol className="tasks">
      {filteredTasks.map((task, index) => (
        <li key={index} className="task">
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
              <div className="task__buttons">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <span
                className={`task__text ${
                  task.completed ? "task__completed" : ""
                }`}
              >
                {task.text}
              </span>

              <div className="task__buttons">
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ol>
  );
}

export default TaskList;
