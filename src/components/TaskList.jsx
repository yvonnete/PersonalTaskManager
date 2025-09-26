"use client"

import TaskItem from "./TaskItem"

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return null
  }

  return (
    <div className="task-list">
      <h2>Your Tasks</h2>
      <div className="tasks-container">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={onToggleTask} onDelete={onDeleteTask} />
        ))}
      </div>
    </div>
  )
}

export default TaskList
