"use client"

import { useState } from "react"

function TaskInput({ onAddTask }) {
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onAddTask(inputValue.trim())
      setInputValue("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="task-input-form">
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a new task..."
          className="task-input"
          maxLength={100}
        />
        <button type="submit" className="add-button" disabled={!inputValue.trim()}>
          Add Task
        </button>
      </div>
    </form>
  )
}

export default TaskInput
