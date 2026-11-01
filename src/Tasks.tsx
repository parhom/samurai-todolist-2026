import List from "@mui/material/List";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {TodolistItemProps} from "@/TodolistItem.tsx";
import {TaskItem} from "@/TaskItem.tsx";


export const Tasks = ({todolist}: TodolistItemProps) => {
	const tasks = useAppSelector(selectTasks)
	
	const {id, filter} = todolist
	
	let filteredTasks = tasks[id]
	if (filter == 'active') {
		filteredTasks = tasks[id].filter(task => {
			return !task.isDone
		})
	}
	if (filter == 'completed') {
		filteredTasks = tasks[id].filter(task => {
			return task.isDone
		})
	}
	
	return (
		<>
			{filteredTasks.length === 0 ?
				(<span> tasks not found </span>) :
				(<List>
					{filteredTasks.map(task => {
						return (
							<TaskItem key={task.id} task={task} todolistId={id}/>
						)
					})}
				</List>)}
		</>
	);
};