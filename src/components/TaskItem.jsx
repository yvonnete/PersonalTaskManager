"use client"

function TaskItem({ task, onToggle, onDelete }) {
  const handleToggle = () => {
    onToggle(task.id)
  }

  const handleDelete = () => {
    onDelete(task.id)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <input type="checkbox" checked={task.completed} onChange={handleToggle} className="task-checkbox" />
        <div className="task-info">
          <span className="task-text">{task.text}</span>
          <span className="task-date">{formatDate(task.createdAt)}</span>
        </div>
      </div>
      <button onClick={handleDelete} className="delete-button" aria-label="Delete task">
        ×
      </button>
    </div>
  )
}

export default TaskItem
