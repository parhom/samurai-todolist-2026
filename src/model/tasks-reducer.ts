import {TasksState} from '../app/App.tsx'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";

const initialState: TasksState = {}

export const deleteTaskAC = createAction('tasks/deleteTask', (payload:{todolistId:string, taskId:string}) => {
	return {payload: {...payload}}
})

export const createTaskAC = createAction('tasks/createTask', (payload:{todolistId:string, title:string}) => {
	return {payload: {...payload}}
})

export const changeTaskStatusAC= createAction('tasks/changeTaskStatus', (payload:{todolistId:string, taskId:string, isDone:boolean}) => {
	return {payload: {...payload}}
})

export const changeTaskTitleAC= createAction('tasks/changeTaskTitle', (payload:{todolistId:string, taskId:string, title:string}) => {
	return {payload: {...payload}}
})

export const tasksReducer = createReducer(initialState, builder => {
	builder
		.addCase(createTodolistAC, (state, action) => {
			state[action.payload.id] = []
		})
		.addCase(deleteTodolistAC, (state, action) => {
			delete state[action.payload.id]
		})
		.addCase(deleteTaskAC, (state, action) => {
			const index = state[action.payload.todolistId].findIndex(todolist=> todolist.id === action.payload.taskId)
			if (index !== -1) {
				state[action.payload.todolistId].splice(index, 1)
			}
		})
		.addCase(createTaskAC, (state, action) => {
			state[action.payload.todolistId].unshift({ id: nanoid(), title: action.payload.title, isDone: false })
		})
		.addCase(changeTaskStatusAC, (state, action) => {
			const task = state[action.payload.todolistId].find(todolist => todolist.id === action.payload.taskId)
			if (task) {
				task.isDone = action.payload.isDone
			}
		})
		.addCase(changeTaskTitleAC, (state, action) => {
			const task = state[action.payload.todolistId].find(todolist => todolist.id === action.payload.taskId)
			if (task) {
				task.title = action.payload.title
			}
		})
})