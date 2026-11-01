import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {ChangeEvent} from "react";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, Task} from "@/features/todolists/model/tasks-reducer.ts";
import {getListItemSx} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts";


type TaskItemProps = {
	task: Task
	todolistId: string
};

export const TaskItem = ({task, todolistId}:TaskItemProps) => {
	const dispatch = useAppDispatch()
	
	const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
		const newStatusValue = event.currentTarget.checked
		dispatch(changeTaskStatusAC({todolistId, taskId: task.id, isDone: newStatusValue}))
	}
	const changeTaskTitle = (title: string) => {
		dispatch(changeTaskTitleAC({todolistId, taskId: task.id, title}))
	}
	const deleteTask = () => {
		dispatch(deleteTaskAC({todolistId, taskId: task.id}))
	}
	return (
		<ListItem sx={getListItemSx(task.isDone)}>
			<Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
			<EditableSpan value={task.title} onChange={changeTaskTitle}/>
			<IconButton onClick={deleteTask}>
				<DeleteIcon/>
			</IconButton>
		</ListItem>
	);
};