import React, { useState, Dispatch, SetStateAction } from "react"
import { Task } from "../ToDo/ToDo";
import "./TaskList.css";

interface TaskListProps {
  tasks: Task[];
  filteredTasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, filteredTasks, setTasks }) => {
  const [editingIndex, setEditingIndex] =  useState<number | null>(null); //текущая задача
  const [editValue, setEditValue] = useState<string>(""); // значение текущей задачи
  const [isEditing, setIsEditing] = useState<boolean>(false);//состояние отображения

  function resetEditing() {
    setEditingIndex(null);
    setIsEditing(false);
  }
  function handleDelete(index: number) {
    if (index === editingIndex) {
      resetEditing()
    }
    const taskToDelete = tasks[index];
    const newTasks = tasks.filter((task) => task !== taskToDelete);
    setTasks(newTasks);
  }

  function handleEdit(index: number) {
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

  function handleComplete(index: number) {
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
      {filteredTasks.map((task, index) => {
        const originalIndex = tasks.findIndex((t) => t === task);

        return (
          <li key={index} className="task">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleComplete(originalIndex)}
          />
          {originalIndex === editingIndex && isEditing ? (
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
                  task.completed ? "task_completed" : ""
                }`}
              >
                {task.text}
              </span>

              <div className="task__buttons">
                <button onClick={() => handleEdit(originalIndex)}>Edit</button>
                <button onClick={() => handleDelete(originalIndex)}>Delete</button>
              </div>
            </>
          )}
       </li>
        );
      })}
    </ol>
  );
}

export default TaskList;
