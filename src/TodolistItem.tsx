import {Button} from "./Button.tsx";
import {filterValues, Todolist} from "./App.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

export type Task = {
	id: string
	title: string
	isDone: boolean
}

type TodolistItemProps = {
	todolist: Todolist
	tasks: Task[]
	deleteTask: (todolistId:string, taskId:string) => void
	filterTask: (todolistId:string, filter:filterValues) => void
	createTask: (todolistId:string, taskTitle:string) => void
	changeTaskStatus:  (todolistId:string, taskId:string, isDone:boolean) => void
	deleteTodolist:    (todolistId:string) => void
	changeTaskTitle: (todolistId:string, taskId:string, title:string)=> void
	changeTodolistTitle: (todolistId:string, title:string)=> void
};


export const TodolistItem = ({todolist:{id, title, filter}, tasks, deleteTask, filterTask, createTask, changeTaskStatus, deleteTodolist, changeTaskTitle, changeTodolistTitle}:TodolistItemProps) => {
	
	const filterTaskHandler = (filter: filterValues)=>{
		filterTask(id, filter)
	}
	
	const deleteTodolistHandler = () => {
		deleteTodolist(id)
	}
	
	const createTaskHandler = (title:string) => {
		createTask(id, title)
	}
	
	const changeTodolistTitleHandler = (title:string) =>{
		changeTodolistTitle(id, title)
	}
	
	return (
		<div>
			<div className={'container'}>
				<h3>
					<EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
				</h3>
				<Button title={'x'} onClick={deleteTodolistHandler}/>
			</div>
			<CreateItemForm onCreateItem={createTaskHandler}/>
			{ tasks.length === 0 ?
				(<span> tasks not found </span>) :
			(<ul>
				{tasks.map(task=> {
					const changeTaskStatusHandler = (event:ChangeEvent<HTMLInputElement> )=>{
						const newStatusValue = event.currentTarget.checked
						changeTaskStatus(id, task.id, newStatusValue)
					}
					const changeTaskTitleHandler = (title:string) =>{
						changeTaskTitle(id, task.id, title)
					}
					return (
						<li key={task.id} className={task.isDone ? 'is-done' : ''}>
							<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
							<EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
							<Button title={'x'} onClick={() => deleteTask(id, task.id)}/>
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