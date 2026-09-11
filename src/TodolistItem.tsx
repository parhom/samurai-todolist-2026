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
	deleteTaskHandler: (taskId:string) => void
	filterTaskHandler: (filter:filterValues) => void
	createTaskHandler: (taskTitle:string) => void
};


export const TodolistItem = ({title, tasks, deleteTaskHandler, filterTaskHandler, createTaskHandler}:TodolistItemProps) => {
	
	const [taskTitle, setTaskTitle] = useState('')
	
	const inputOnChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value)
	}
	
	const addTaskTitleHandler = () =>{
		createTaskHandler(taskTitle)
		setTaskTitle('')
	}
	
	const inputOnKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) =>{
		if (event.key === 'Enter') {
			createTaskHandler(taskTitle)
			setTaskTitle('')
		}
	}
	
	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input value={taskTitle}
				       onChange={inputOnChangeHandler}
				       onKeyDown={inputOnKeyDownHandler}
				/>
				<Button title={"+"} onClick={addTaskTitleHandler}/>
			</div>
			{ tasks.length === 0 ?
				(<span> tasks not found </span>) :
			(<ul>
				{tasks.map(task=> {
					return (
						<li key={task.id}>
							<input type="checkbox" checked={task.isDone}/>
							<span>{task.title}</span>
							<Button title={'x'} onClick={() => deleteTaskHandler(task.id)}/>
						</li>
					)
				})}
			</ul>)}
			<div>
				<Button title={"All"} onClick={()=> filterTaskHandler('all')}/>
				<Button title={"Active"} onClick={()=> filterTaskHandler('active')}/>
				<Button title={"Completed"} onClick={()=> filterTaskHandler('completed')}/>
			</div>
		</div>
	);
};