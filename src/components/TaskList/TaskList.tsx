import React, {  Dispatch, SetStateAction } from "react"
import { Task } from "../TaskItem/TaskItem";
import "./TaskList.css";
import TaskItem from "../TaskItem/TaskItem";

interface TaskListProps {
  tasks: Task[];
  filteredTasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, filteredTasks, setTasks }) => {
 
  return (
    <ol className="tasks">
      {filteredTasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          setTasks={setTasks}
          index={index}
          tasks={tasks}
        />
      ))}
    </ol>
  );
};
export default TaskList;
