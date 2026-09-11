import './App.css'
import {Task, TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type filterValues = 'all' | 'active' | 'completed'

export const App = () => {
	let [tasks, setTesks] = useState<Task[]>([
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
		setTesks(tasks)
	}
	
	const filterTaskHandler = (filter: filterValues) => {
		setFilter(filter)
	}
	
	const createTaskHandler = (taskTitle:string) =>{
		const newTask = {id: v1(), title: taskTitle, isDone: false}
		setTesks([newTask, ...tasks])
	}
	
	return (
		<div className="app">
			<TodolistItem
				title={"What to learn"}
				tasks={filteredTasks}
				deleteTaskHandler={deleteTaskHandler}
				filterTaskHandler={filterTaskHandler}
				createTaskHandler={createTaskHandler}
			/>
		</div>
	)
}

export default App
