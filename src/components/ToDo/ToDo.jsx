import React, { useState } from "react";
import "./ToDo.css";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";
import TaskFilter from "../TaskFilter/TaskFilter";

function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [filterTask, setFilterTask] = useState("");

  return (
    <div className="tasks__block">
      <h1 className="tasks__title">My Todo List</h1>
      <TaskFilter filterTask={filterTask} setFilterTask={setFilterTask} />
      <TaskList tasks={tasks} setTasks={setTasks} filterTask={filterTask} />
      <TaskForm tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default ToDo;
