import {Button} from "./Button.tsx";
import {filterValues} from "./App.tsx";

export type Task = {
	id: number
	title: string
	isDone: boolean
}

type TodolistItemProps = {
	title: string
	tasks: Task[]
	deleteTaskHandler: (taskId:number) => void
	filterTaskHandler: (filter:filterValues) => void
};

export const TodolistItem = ({title, tasks, deleteTaskHandler, filterTaskHandler}:TodolistItemProps) => {
	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input/>
				<Button title={"+"}/>
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