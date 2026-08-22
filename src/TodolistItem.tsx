import {Button} from "./Button.tsx";

type Task = {
	id: number
	title: string
	isDone: boolean
}

type TodolistItemProps = {
	title: string
	tasks: Task[]
};

export const TodolistItem = ({title, tasks}:TodolistItemProps) => {
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
							<input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
						</li>
					)
				})}
			</ul>)}
			<div>
				<Button title={"All"}/>
				<Button title={"Active"}/>
				<Button title={"Completed"}/>
			</div>
		</div>
	);
};