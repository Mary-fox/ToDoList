import React, { useState, useCallback } from "react";
import "./TaskForm.css";

function TaskForm({ tasks, setTasks }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setTasks([...tasks, { text: inputValue, completed: false }]);
    setInputValue("");
  }, [inputValue, tasks, setTasks]);

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

export default React.memo(TaskForm);
