import './App.css'
import {Task, TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type filterValues = 'all' | 'active' | 'completed'

export const App = () => {
	let [tasks, setTasks] = useState<Task[]>([
		{id: v1(), title: 'HTML&CSS', isDone: true},
		{id: v1(), title: 'JS', isDone: true},
		{id: v1(), title: 'ReactJS', isDone: false},
	])
	
	const [filter, setFilter] = useState<filterValues>('all')
	
	let filteredTasks = tasks
	if (filter == 'active') {
		filteredTasks = tasks.filter(task => {
			return !task.isDone
		})
	}
	if (filter == 'completed') {
		filteredTasks = tasks.filter(task => {
			return task.isDone
		})
	}
	
	
	const deleteTaskHandler = (taskId: string) => {
		tasks = tasks.filter(task => {
			return task.id !== taskId
		})
		setTasks(tasks)
	}
	
	const filterTaskHandler = (filter: filterValues) => {
		setFilter(filter)
	}
	
	const createTaskHandler = (taskTitle:string) =>{
		const newTask = {id: v1(), title: taskTitle, isDone: false}
		setTasks([newTask, ...tasks])
	}
	
	const changeTaskStatus = (taskId:string, isDone:boolean)=>{
		const newState = tasks.map(task=>{
			return taskId === task.id ? {...task, isDone} : task
		})
		setTasks(newState)
	}
	
	return (
		<div className="app">
			<TodolistItem
				title={"What to learn"}
				tasks={filteredTasks}
				filter={filter}
				deleteTaskHandler={deleteTaskHandler}
				filterTaskHandler={filterTaskHandler}
				createTaskHandler={createTaskHandler}
				changeTaskStatus={changeTaskStatus}
			/>
		</div>
	)
}

export default App
