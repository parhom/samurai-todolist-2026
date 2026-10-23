import {filterValues, Todolist} from "../App.tsx";
import {v1} from "uuid";

const initialState: Todolist[] = []

type Actions = DeleteTodolistAction | CreateTodolistAction | changeTodolistTitleAction | changeTodolistFilterAction

export const todolistsReducer = (state:Todolist[] = initialState , action:Actions):Todolist[] => {
	switch (action.type){
		case 'delete_todolist': {
			return state.filter(todolist=> todolist.id !== action.payload.id)
		}
		case 'create_todolist': {
			return [...state, { id: action.payload.id, title: action.payload.title, filter: 'all' }]
		}
		case 'change_todolist_title': {
			return state.map(todolist=>{
				return (
					action.payload.id === todolist.id ? {...todolist, title: action.payload.title} : todolist
				)
			})
		}
		case 'change_todolist_filter': {
			return state.map(todolist=>{
				return (
					action.payload.id === todolist.id ? {...todolist, filter: action.payload.filter} : todolist
				)
			})
		}
		default:
			return state
	}
}

export const deleteTodolistAC = (id:string) =>{
	return {type: 'delete_todolist', payload: { id }} as const
}

export const createTodolistAC = (title:string)=>{
	const id = v1()
	return {type:'create_todolist', payload:{id, title}} as const
}

export const changeTodolistTitleAC = (payload:{id:string,title:string}) =>{
	const {id, title} = payload
	return {type:'change_todolist_title', payload:{id,title}} as const
}

export const changeTodolistFilterAC = (payload:{id:string,filter:filterValues}) => {
	const {id, filter} = payload
	return {type:'change_todolist_filter', payload:{id,filter}} as const
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>

export type CreateTodolistAction = ReturnType<typeof createTodolistAC>

export type changeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>

export type changeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>