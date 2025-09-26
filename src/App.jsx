"use client"

import { useState, useEffect } from "react"
import TaskInput from "./components/TaskInput"
import TaskList from "./components/TaskList"
import "./App.css"

function App() {
  const [tasks, setTasks] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const savedTasks = localStorage.getItem("taskManagerTasks")
        return savedTasks ? JSON.parse(savedTasks) : []
      } catch (error) {
        console.error("Error loading tasks from localStorage:", error)
        return []
      }
    }
    return []
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("taskManagerTasks", JSON.stringify(tasks))
      } catch (error) {
        console.error("Error saving tasks to localStorage:", error)
      }
    }
  }, [tasks])

  const addTask = (taskText) => {
    if (taskText.trim() !== "") {
      const newTask = {
        id: Date.now() + Math.random(), // More unique ID to prevent conflicts
        text: taskText.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      }
      setTasks([...tasks, newTask])
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const completedCount = tasks.filter((task) => task.completed).length
  const totalCount = tasks.length

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Personal Task Manager</h1>
          <p>Stay organized and productive with your daily tasks</p>
        </header>

        <TaskInput onAddTask={addTask} />

        {tasks.length > 0 && (
          <div className="task-stats">
            <span>Total: {totalCount}</span>
            <span>Completed: {completedCount}</span>
            <span>Remaining: {totalCount - completedCount}</span>
          </div>
        )}

        <TaskList tasks={tasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />

       {tasks.length === 0 && (
  <div className="empty-state">
    <img
      src="/clipboard-icon.jpg"
      alt="No tasks"
      className="empty-icon"
      style={{ width: "100px", height: "100px" }}
    />
    <h3>No tasks yet</h3>
    <p>Add your first task above to get started!</p>
  </div>
        )}
      </div>
    </div>
  )
}

export default App
