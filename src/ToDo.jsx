import React, { useState } from "react";
import "./ToDo.css";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";

function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [filterTask, setFilterTask] = useState("");

  return (
    <div className="wrapper">
      <h1 className="tasks__title">My Todo List</h1>
      <input
        value={filterTask}
        type="text"
        placeholder="filter"
        onChange={(e) => setFilterTask(e.target.value)}
      />
      <TaskList tasks={tasks} setTasks={setTasks} filterTask={filterTask} />
      <TaskForm tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default ToDo;
