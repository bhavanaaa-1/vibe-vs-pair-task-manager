import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAddTask = () => {
    const title = newTask.trim();
    if (!title) return;
    setTasks([...tasks, { title, completed: false }]);
    setNewTask("");
  };

  const handleToggleTask = (taskToToggle) => {
    setTasks(
      tasks.map((task) =>
        task === taskToToggle
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const remaining = tasks.filter((task) => !task.completed).length;

  return (
    <div className="app">
      <h1>Task Manager</h1>

      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTask();
          }}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li
            key={task.title + String(task.completed)}
            className={task.completed ? "completed" : ""}
            onClick={() => handleToggleTask(task)}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task)}
              onClick={(e) => e.stopPropagation()}
            />
            {task.title}
          </li>
        ))}
      </ul>

      <p className="task-count">{remaining} tasks remaining</p>
    </div>
  );
}

export default App;