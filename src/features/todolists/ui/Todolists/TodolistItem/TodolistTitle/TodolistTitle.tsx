import {changeTodolistTitleAC, deleteTodolistAC} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TodolistItemProps} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx";
import styles from './TodolistTitle.module.css'

export const TodolistTitle = ({todolist}:TodolistItemProps) => {
	const dispatch = useAppDispatch()
	
	const {id, title} = todolist
	
	const changeTodolistTitle = (title: string) => {
		dispatch(changeTodolistTitleAC({id, title}))
	}
	
	const deleteTodolist = () => {
		dispatch(deleteTodolistAC({id}))
	}
	return (
		<div className={styles.container}>
			<h3>
				<EditableSpan value={title} onChange={changeTodolistTitle}/>
			</h3>
			<IconButton onClick={deleteTodolist}>
				<DeleteIcon/>
			</IconButton>
		</div>
	);
};