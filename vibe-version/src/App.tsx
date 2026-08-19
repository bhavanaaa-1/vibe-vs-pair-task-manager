/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { FilterType, Task } from './types';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Complete project proposal', completed: false },
    { id: '2', title: 'Review team feedback', completed: false },
    { id: '3', title: 'Set up weekly sync schedule', completed: true },
  ]);
  const [taskTitle, setTaskTitle] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = taskTitle.trim();
    if (!trimmedTitle) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: trimmedTitle,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setTaskTitle('');
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeTasksCount = tasks.filter((task) => !task.completed).length;

  return (
    <div
      id="task-manager-app"
      className="min-h-screen w-full bg-slate-50 font-sans antialiased flex items-center justify-center p-4 sm:p-8"
    >
      <main
        id="task-manager-card"
        className="w-full max-w-md bg-white border border-slate-200 shadow-xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <header className="px-8 pt-8 pb-6 border-b border-slate-100">
          <h1
            id="header-title"
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            Task Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">
            Geometric Utility
          </p>
        </header>

        {/* Add Task Form */}
        <form
          id="add-task-form"
          onSubmit={handleAddTask}
          className="px-8 py-6 bg-slate-50/50 border-b border-slate-100"
        >
          <div className="flex gap-2">
            <input
              id="task-input"
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-2 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-700 bg-white text-sm transition-colors"
            />
            <button
              id="add-task-btn"
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium transition-colors shrink-0 cursor-pointer"
            >
              Add
            </button>
          </div>
        </form>

        {/* Filter Bar */}
        <div
          id="task-filters-bar"
          className="px-8 py-3 bg-white flex justify-between items-center border-b border-slate-100"
        >
          <div id="task-filters" className="flex gap-1 bg-slate-100 p-1 rounded-sm">
            <button
              id="filter-all-btn"
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              All
            </button>
            <button
              id="filter-active-btn"
              type="button"
              onClick={() => setFilter('active')}
              className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                filter === 'active'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Active
            </button>
            <button
              id="filter-completed-btn"
              type="button"
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                filter === 'completed'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Task List */}
        <ul
          id="task-list"
          className="flex-grow overflow-y-auto px-8 py-2 divide-y divide-slate-100 min-h-[160px] max-h-[300px]"
        >
          {filteredTasks.length === 0 ? (
            <li
              id="empty-task-message"
              className="py-8 text-center text-slate-400 text-sm"
            >
              No tasks to show
            </li>
          ) : (
            filteredTasks.map((task) => (
              <li
                key={task.id}
                id={`task-item-${task.id}`}
                onClick={() => handleToggleTask(task.id)}
                className="group flex items-center gap-3 py-4 cursor-pointer hover:bg-slate-50/70 transition-colors select-none"
              >
                <div
                  className={`w-[18px] h-[18px] border-2 flex items-center justify-center shrink-0 transition-colors ${
                    task.completed
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-300 bg-white group-hover:border-slate-400'
                  }`}
                >
                  {task.completed && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span
                  className={`text-sm font-medium flex-1 break-words transition-all ${
                    task.completed
                      ? 'line-through text-slate-400'
                      : 'text-slate-700'
                  }`}
                >
                  {task.title}
                </span>
              </li>
            ))
          )}
        </ul>

        {/* Footer */}
        <footer
          id="task-count-footer"
          className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center"
        >
          <span id="task-count" className="text-sm text-slate-500 font-medium">
            {activeTasksCount} {activeTasksCount === 1 ? 'task' : 'tasks'} remaining
          </span>
        </footer>
      </main>
    </div>
  );
}

