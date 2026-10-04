import {Button} from "./Button.tsx";
import {filterValues, Todolist} from "./App.tsx";
import {ChangeEvent, KeyboardEvent , useState} from "react";

export type Task = {
	id: string
	title: string
	isDone: boolean
}

type TodolistItemProps = {
	todolist: Todolist
	tasks: Task[]
	deleteTaskHandler: (todolistId:string, taskId:string) => void
	filterTaskHandler: (todolistId:string, filter:filterValues) => void
	createTaskHandler: (todolistId:string, taskTitle:string) => void
	changeTaskStatus:  (todolistId:string, taskId:string, isDone:boolean) => void
	deleteTodolist:    (todolistId:string) => void
};


export const TodolistItem = ({todolist:{id, title, filter}, tasks, deleteTaskHandler, filterTaskHandler, createTaskHandler, changeTaskStatus, deleteTodolist}:TodolistItemProps) => {
	
	const [taskTitle, setTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null)
	
	const inputOnChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value)
		setError(null)
	}
	
	const addTaskTitleHandler = () =>{
		const trimmedTitle =  taskTitle.trim()
		if (trimmedTitle !== '') {
			createTaskHandler(id, trimmedTitle)
			setTaskTitle('')
		} else {
			setError('Title is required')
		}
	}
	
	const inputOnKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) =>{
		if (event.key === 'Enter') {
			addTaskTitleHandler()
		}
	}
	
	const changeFilterHandler = (filter: filterValues)=>{
		filterTaskHandler(id, filter)
	}
	
	const deleteTodolistHandler = () => {
		deleteTodolist(id)
	}
	
	return (
		<div>
			<div className={'container'}>
				<h3>{title}</h3>
				<Button title={'x'} onClick={deleteTodolistHandler}/>
			</div>
			<div>
				<input value={taskTitle}
				       onChange={inputOnChangeHandler}
				       onKeyDown={inputOnKeyDownHandler}
				       className={error ? 'error' : ''}
				/>
				<Button title={"+"} onClick={addTaskTitleHandler}/>
				{error && <div className={'error-message'}>{error}</div>}
			</div>
			{ tasks.length === 0 ?
				(<span> tasks not found </span>) :
			(<ul>
				{tasks.map(task=> {
					const changeTaskStatusHandler = (event:ChangeEvent<HTMLInputElement> )=>{
						const newStatusValue = event.currentTarget.checked
						changeTaskStatus(id, task.id, newStatusValue)
					}
					return (
						<li key={task.id} className={task.isDone ? 'is-done' : ''}>
							<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
							<span>{task.title}</span>
							<Button title={'x'} onClick={() => deleteTaskHandler(id, task.id)}/>
						</li>
					)
				})}
			</ul>)}
			<div>
				<Button className={filter === 'all' ? 'active-filter' : ''}
						title={"All"}
				        onClick={()=> changeFilterHandler('all')}/>
				<Button className={filter === 'active' ? 'active-filter' : ''}
						title={"Active"}
						onClick={()=> changeFilterHandler('active')}/>
				<Button className={filter === 'completed' ? 'active-filter' : ''}
						title={"Completed"}
						onClick={()=> changeFilterHandler('completed')}/>
			</div>
		</div>
	);
};