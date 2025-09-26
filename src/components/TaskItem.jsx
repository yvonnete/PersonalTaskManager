"use client"

function TaskItem({ task, onToggle, onDelete }) {
  const handleToggle = () => {
    onToggle(task.id)
  }

  const handleDelete = () => {
    onDelete(task.id)
  }

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <input type="checkbox" checked={task.completed} onChange={handleToggle} className="task-checkbox" />
        <span className="task-text">{task.text}</span>
      </div>
      <button onClick={handleDelete} className="delete-button" aria-label="Delete task">
        ×
      </button>
    </div>
  )
}

export default TaskItem
