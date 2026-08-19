# Pair Version

This folder contains the Task Manager application built using an AI pair programming assistant.

## Tool Used

**Cursor**

## Time to Build

**Approximately 45 minutes**

## Application

The application implements the required Task Manager features:

- Add a task using the input field and Add button
- Mark tasks as completed using checkboxes
- Filter tasks using All, Active, and Completed
- Display the number of tasks remaining
- Tasks reset when the page is refreshed
- No backend, authentication, persistence, or routing was added

## Project Structure

```text
pair-version/
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitkeep
├── index.html
├── package-lock.json
├── package.json
└── README.md

The project contains 8 files, excluding node_modules.

## AI Assistance

Cursor was used throughout the development process to assist with implementation.

The application was developed incrementally rather than being generated completely in one step. Suggestions were reviewed and accepted when they matched the specification.

At one point, a broad Cursor suggestion introduced duplicate state and handler logic. I noticed the duplication and reverted the suggestion before continuing with a cleaner implementation.

Cursor was also used to assist with the checkbox implementation. The checkbox reflects the task's completion state, and event handling prevents the checkbox click from triggering the task-row click twice.

## Observations

The main advantage of using Cursor was the level of control over the implementation. I could inspect suggestions before accepting them and revert changes when they did not fit the intended implementation.

The main disadvantage was development speed. The Pair version took approximately 45 minutes, which was significantly longer than the Vibe version.

## Live URL

https://vibe-vs-pair-task-manager-rjsh.vercel.app/