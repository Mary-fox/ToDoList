import React, { useState } from "react";
import "./TaskForm.css";

function TaskForm({ tasks, setTasks }) {
  const [inputValue, setInputValue] = useState("");

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setTasks([...tasks, { text: inputValue, completed: false }]);
    setInputValue("");
  }

  return (
    <form className="tasks__form">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="new task"
      />
      <button onClick={handleSubmit}>Add Todo</button>
    </form>
  );
}

export default TaskForm;
