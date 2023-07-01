import React from "react";

function TaskFilter({ filterTask, setFilterTask}) {

  return (
    <input
        value={filterTask}
        type="text"
        placeholder="filter"
        onChange={(e) => setFilterTask(e.target.value)}
    />
  );
}

export default TaskFilter;
