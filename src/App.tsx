import './App.css'
import {Task, TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";

export type filterValues = 'all' | 'active' | 'completed'

export const App = () =>  {
  let [tasks, setTesks] = useState<Task[]>( [
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
  ])
  
  const [filter, setFilter] = useState<filterValues>('all')
  
  let filteredTasks = tasks
  if(filter == 'active') {
      filteredTasks = tasks.filter(task=> {return !task.isDone})
  }
  if(filter == 'completed') {
      filteredTasks = tasks.filter(task=> {return task.isDone})
  }
  
  
  const deleteTaskHandler = (taskId:number) =>{
      tasks = tasks.filter(task=>{
          return task.id !== taskId
      })
      setTesks(tasks)
  }
  
  const filterTaskHandler = (filter:filterValues) =>{
      setFilter(filter)
  }
  
  return (
      <div className="app">
        <TodolistItem
            title={"What to learn"}
            tasks={filteredTasks}
            deleteTaskHandler={deleteTaskHandler}
            filterTaskHandler={filterTaskHandler}
        />
      </div>
  )
}

export default App
