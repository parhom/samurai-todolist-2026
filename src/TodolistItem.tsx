import {Button} from "./Button.tsx";
import {filterValues} from "./App.tsx";
import {ChangeEvent, KeyboardEvent , useState} from "react";

export type Task = {
	id: string
	title: string
	isDone: boolean
}

type TodolistItemProps = {
	title: string
	tasks: Task[]
	filter: filterValues
	deleteTaskHandler: (taskId:string) => void
	filterTaskHandler: (filter:filterValues) => void
	createTaskHandler: (taskTitle:string) => void
	changeTaskStatus: (taskId:string, isDone:boolean) => void
};


export const TodolistItem = ({title, tasks, filter, deleteTaskHandler, filterTaskHandler, createTaskHandler, changeTaskStatus}:TodolistItemProps) => {
	
	const [taskTitle, setTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null)
	
	const inputOnChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value)
		setError(null)
	}
	
	const addTaskTitleHandler = () =>{
		const trimmedTitle =  taskTitle.trim()
		if (trimmedTitle !== '') {
			createTaskHandler(trimmedTitle)
			setTaskTitle('')
		} else {
			setError('Title is required')
		}
	}
	
	const inputOnKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) =>{
		if (event.key === 'Enter') {
			const trimmedTitle =  taskTitle.trim()
			if (trimmedTitle !== '') {
				createTaskHandler(trimmedTitle)
				setTaskTitle('')
			} else {
				setError('Title is required')
			}
		}
	}
	
	return (
		<div>
			<h3>{title}</h3>
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
						changeTaskStatus(task.id, newStatusValue)
					}
					return (
						<li key={task.id} className={task.isDone ? 'is-done' : ''}>
							<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
							<span>{task.title}</span>
							<Button title={'x'} onClick={() => deleteTaskHandler(task.id)}/>
						</li>
					)
				})}
			</ul>)}
			<div>
				<Button className={filter === 'all' ? 'active-filter' : ''}
						title={"All"}
				        onClick={()=> filterTaskHandler('all')}/>
				<Button className={filter === 'active' ? 'active-filter' : ''}
						title={"Active"}
						onClick={()=> filterTaskHandler('active')}/>
				<Button className={filter === 'completed' ? 'active-filter' : ''}
						title={"Completed"}
						onClick={()=> filterTaskHandler('completed')}/>
			</div>
		</div>
	);
};