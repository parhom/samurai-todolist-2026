import {changeTodolistTitleAC, deleteTodolistAC} from "@/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {EditableSpan} from "@/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TodolistItemProps} from "@/TodolistItem.tsx";

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
		<div className={'container'}>
			<h3>
				<EditableSpan value={title} onChange={changeTodolistTitle}/>
			</h3>
			<IconButton onClick={deleteTodolist}>
				<DeleteIcon/>
			</IconButton>
		</div>
	);
};