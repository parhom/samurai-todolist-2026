import {changeTodolistFilterAC, filterValues} from "@/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {TodolistItemProps} from "@/TodolistItem.tsx";
import {containerSx} from "@/TodolistItem.styles.ts";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const FilterButtons = ({todolist}:TodolistItemProps) => {
	const {id, filter} = todolist
	
	const dispatch = useAppDispatch()
	
	const filterTask = (filter: filterValues)=>{
		dispatch(changeTodolistFilterAC({id, filter}))
	}
	
	return (
		<Box sx={containerSx}>
			<Button onClick={()=> filterTask('all')} variant={filter === 'all' ? 'contained' : 'text'}>All</Button>
			<Button  color={'primary'} onClick={()=> filterTask('active')} variant={filter === 'active' ? 'contained' : 'text'}>Active</Button>
			<Button color={'secondary'} onClick={()=> filterTask('completed')} variant={filter === 'completed' ? 'contained' : 'text'}>Completed</Button>
		</Box>
	);
};