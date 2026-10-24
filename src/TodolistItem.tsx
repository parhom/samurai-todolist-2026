import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {filterValues, Todolist} from "./app/App.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import Button from '@mui/material/Button'
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import {containerSx, getListItemSx} from "./TodolistItem.styles.ts";

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
				<IconButton onClick={deleteTodolistHandler}>
					<DeleteIcon />
				</IconButton>
			</div>
			<CreateItemForm onCreateItem={createTaskHandler}/>
			{ tasks.length === 0 ?
				(<span> tasks not found </span>) :
			(<List>
				{tasks.map(task=> {
					const changeTaskStatusHandler = (event:ChangeEvent<HTMLInputElement> )=>{
						const newStatusValue = event.currentTarget.checked
						changeTaskStatus(id, task.id, newStatusValue)
					}
					const changeTaskTitleHandler = (title:string) =>{
						changeTaskTitle(id, task.id, title)
					}
					const deleteTaskHandler = () => {
						deleteTask(id, task.id)
					}
					return (
						<ListItem key={task.id} sx={getListItemSx(task.isDone)}>
							<Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
							<EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
							<IconButton onClick={deleteTaskHandler}>
								<DeleteIcon />
							</IconButton>
						</ListItem>
					)
				})}
			</List>)}
			<Box sx={containerSx}>
				<Button onClick={()=> filterTaskHandler('all')} variant={filter === 'all' ? 'contained' : 'text'}>All</Button>
				<Button  color={'primary'} onClick={()=> filterTaskHandler('active')} variant={filter === 'active' ? 'contained' : 'text'}>Active</Button>
				<Button color={'secondary'} onClick={()=> filterTaskHandler('completed')} variant={filter === 'completed' ? 'contained' : 'text'}>Completed</Button>
			</Box>
		</div>
	);
};