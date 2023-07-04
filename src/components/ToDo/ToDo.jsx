import React, { useState, useMemo } from 'react';
import "./ToDo.css";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";

function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [filterTask, setFilterTask] = useState("");

  const filteredTasks = useMemo(() => {
    return tasks.filter(task =>
      task.text.toUpperCase().includes(filterTask.toUpperCase())
    );
  }, [tasks, filterTask]);
  
  return (
    <div className="tasks__block">
      <h1 className="tasks__title">My Todo List</h1>
      <input
        value={filterTask}
        type="text"
        placeholder="filter"
        onChange={(e) => setFilterTask(e.target.value)}
      />
      <TaskList tasks={tasks} setTasks={setTasks} filteredTasks={filteredTasks} />
      <TaskForm setTasks={setTasks} />
    </div>
  );
}

export default ToDo;
