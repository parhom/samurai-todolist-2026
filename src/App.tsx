import './App.css'
import {Task, TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";

export type filterValues = 'all' | 'active' | 'completed'

export type Todolist = {
	id: string
	title: string
	filter: filterValues
}

export type TasksState  = {
	[key:string]: Task[]
}

export const App = () => {
	const todolistId1 = v1()
	const todolistId2 = v1()
	
	const [todolists, setTodolists] = useState<Todolist[]>([
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	])
	
	const [tasks, setTasks] = useState<TasksState>({
		[todolistId1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistId2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	})
	
	const deleteTask = (todolistId:string, taskId: string) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => {
				return task.id !== taskId
			})})
	}
	
	const filterTask = (todolistId:string, filter: filterValues) => {
		setTodolists(prevState => prevState.map(todolist=>{
			return (
				todolistId === todolist.id ? {...todolist, filter} : todolist
			)
		}))
	}
	
	const createTask = (todolistId:string, taskTitle:string) =>{
		const newTask = {id: v1(), title: taskTitle, isDone: false}
		setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
	}
	
	const changeTaskStatus = (todolistId:string, taskId:string, isDone:boolean)=>{
		setTasks({...tasks, [todolistId]: tasks[todolistId].map(task=>{
				return taskId === task.id ? {...task, isDone} : task
			})})
	}
	
	const deleteTodolist = (todolistId:string)=>{
		setTodolists(prevState =>  prevState.filter(todolist=> todolist.id !== todolistId))
		
		const {[todolistId]: _, ...restTasks} = tasks
		setTasks(restTasks)
	}
	
	const createTodolist = (title:string) => {
		const newTodolistId = v1()
		setTodolists([{ id: newTodolistId, title: title, filter: 'all' }, ...todolists])
		setTasks({...tasks,[newTodolistId]:[]})
	}
	
	const changeTaskTitle = (todolistId:string, taskId:string, title:string) =>{
		setTasks({...tasks, [todolistId]: tasks[todolistId].map(task=>{
				return taskId === task.id ? {...task, title} : task
			})})
	}
	
	const changeTodolistTitle = (todolistId:string, title:string) => {
		setTodolists(prevState => prevState.map(todolist=>{
			return (
				todolistId === todolist.id ? {...todolist, title} : todolist
			)
		}))
	}
	
	return (
		<div className="app">
			<CreateItemForm onCreateItem={createTodolist}/>
			{
				todolists.map(todolist=> {
					let filteredTasks = tasks[todolist.id]
					if (todolist.filter == 'active') {
						filteredTasks = tasks[todolist.id].filter(task => {
							return !task.isDone
						})
					}
					if (todolist.filter == 'completed') {
						filteredTasks = tasks[todolist.id].filter(task => {
							return task.isDone
						})
					}
					
					return (<TodolistItem
					key={todolist.id}
					todolist={todolist}
					tasks={filteredTasks}
					deleteTask={deleteTask}
					filterTask={filterTask}
					createTask={createTask}
					changeTaskStatus={changeTaskStatus}
					deleteTodolist={deleteTodolist}
					changeTaskTitle={changeTaskTitle}
					changeTodolistTitle={changeTodolistTitle}
				/>)})
			}
		</div>
	)
}

export default App
