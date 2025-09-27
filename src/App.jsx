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
        id: Date.now() + Math.random(),
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

  const activeTasks = tasks.filter((task) => !task.completed)
  const completedTasks = tasks.filter((task) => task.completed)

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Create Task</h1>
          <p>Simple task management</p>
        </header>

        <TaskInput onAddTask={addTask} />

        {activeTasks.length > 0 && (
          <div className="section">
            <h2 className="section-title">Active ({activeTasks.length})</h2>
            <TaskList tasks={activeTasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
          </div>
        )}

        {completedTasks.length > 0 && (
          <div className="section">
            <h2 className="section-title">Completed ({completedTasks.length})</h2>
            <TaskList tasks={completedTasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
          </div>
        )}

        {tasks.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">✓</div>
            <h3>No tasks yet</h3>
            <p>Add your first task above to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
