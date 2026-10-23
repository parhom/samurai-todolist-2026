import {TasksState} from '../App'
import {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";
import {v1} from "uuid";

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
	switch (action.type) {
		case 'create_todolist': {
			return {...state,[action.payload.id]:[]}
		}
		case 'delete_todolist': {
			const {[action.payload.id]: _, ...newState} = state
			return newState
		}
		case 'delete_task': {
			return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => {
					return task.id !== action.payload.taskId
				})}
		}
		case 'create_task': {
			const newTask = {id: v1(), title: action.payload.title, isDone: false}
			return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
		}
		case 'change_task_status': {
			return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task=>{
					return action.payload.taskId === task.id ? {...task, isDone: action.payload.isDone} : task
				})}
		}
		case 'change_task_title': {
			return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task=>{
					return action.payload.taskId === task.id ? {...task, title:action.payload.title} : task
				})}
		}
		default:
			return state
	}
}

type Actions = CreateTodolistAction | DeleteTodolistAction | deleteTaskAction | createTaskAction | changeTaskStatusAction | changeTaskTitleAction

export const deleteTaskAC = (payload:{todolistId:string, taskId:string}) => {
	const {todolistId, taskId} = payload
	return {type: 'delete_task', payload: {todolistId, taskId}} as const
}

export const createTaskAC = (payload: {todolistId:string, title:string}) => {
	const {todolistId, title} = payload
	return {type: 'create_task', payload: {todolistId, title}} as const
}

export const changeTaskStatusAC = (payload: {todolistId:string, taskId:string, isDone:boolean}) => {
	const {todolistId, taskId, isDone} = payload
	return {type: 'change_task_status', payload:{todolistId, taskId, isDone}} as const
}

export const changeTaskTitleAC = (payload: {todolistId:string, taskId:string, title:string})=>{
	const {todolistId, taskId, title} = payload
	return {type: 'change_task_title', payload: {todolistId, taskId, title}} as const
}

export type deleteTaskAction = ReturnType<typeof deleteTaskAC>

export type createTaskAction = ReturnType<typeof createTaskAC>

export type changeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>

export type changeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>
