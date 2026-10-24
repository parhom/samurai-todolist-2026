import './App.css'
import {Task, TodolistItem} from "../TodolistItem.tsx";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "../CreateItemForm.tsx";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Paper from "@mui/material/Paper";
import {containerSx} from "../TodolistItem.styles.ts";
import {NavButton} from '../NavButton.ts'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Switch from '@mui/material/Switch'
import {
	changeTodolistFilterAC, changeTodolistTitleAC,
	createTodolistAC,
	deleteTodolistAC,
	todolistsReducer
} from "../model/todolists-reducer.ts";
import {
	changeTaskStatusAC,
	changeTaskTitleAC,
	createTaskAC,
	deleteTaskAC,
	tasksReducer
} from "../model/tasks-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {selectTodolists} from "../model/todolists-selectors.ts";
import {selectTasks} from "../model/tasks-selectors.ts";

export type filterValues = 'all' | 'active' | 'completed'

export type Todolist = {
	id: string
	title: string
	filter: filterValues
}

export type TasksState  = {
	[key:string]: Task[]
}

type ThemeMode = 'dark' | 'light'

export const App = () => {
	const [themeMode, setThemeMode] = useState<ThemeMode>('light')
	
	const theme = createTheme({
		palette: {
			mode: themeMode,
			primary: {
				main: '#ef6c00',
			},
		},
	})
	
	const changeMode = () => {
		setThemeMode(themeMode === 'light' ? 'dark' : 'light')
	}
	
	const todolists = useAppSelector(selectTodolists)
	
	const tasks = useAppSelector(selectTasks)
	
	const dispatch = useAppDispatch()
	
	const deleteTask = (todolistId:string, taskId: string) => {
		dispatch(deleteTaskAC({todolistId, taskId}))
	}
	
	const filterTask = (todolistId:string, filter: filterValues) => {
		dispatch(changeTodolistFilterAC({id:todolistId, filter}))
	}
	
	const createTask = (todolistId:string, title:string) =>{
		dispatch(createTaskAC({todolistId, title}))
	}
	
	const changeTaskStatus = (todolistId:string, taskId:string, isDone:boolean)=>{
		dispatch(changeTaskStatusAC({todolistId, taskId, isDone}))
	}
	
	const deleteTodolist = (todolistId:string)=>{
		dispatch(deleteTodolistAC({id:todolistId}))
	}
	
	const createTodolist = (title:string) => {
		const action = createTodolistAC(title)
		dispatch(action)
	}
	
	const changeTaskTitle = (todolistId:string, taskId:string, title:string) =>{
		dispatch(changeTaskTitleAC({todolistId, taskId, title}))
	}
	
	const changeTodolistTitle = (todolistId:string, title:string) => {
		dispatch(changeTodolistTitleAC({id:todolistId, title}))
	}
	
	return (
		<div className="app">
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar position="static" sx={{ mb: '30px' }}>
				<Toolbar>
					<Container maxWidth={'lg'} sx={containerSx}>
						<IconButton color="inherit">
							<MenuIcon/>
						</IconButton>
						<div>
							<NavButton >Sign in</NavButton >
							<NavButton >Sign up</NavButton >
							<NavButton background={theme.palette.primary.dark}>Faq</NavButton >
							<Switch color={'default'} onChange={changeMode} />
						</div>
					</Container>
				</Toolbar>
			</AppBar>
				<Container fixed maxWidth={'lg'}>
				<Grid container sx={{ mb: '30px' }}>
					<CreateItemForm onCreateItem={createTodolist}/>
				</Grid>
				<Grid container spacing={4}>
					{
						todolists.map(todolist=> {
							let filteredTasks = tasks[todolist.id]
							if (todolist.filter == 'active') {
								filteredTasks = tasks[todolist.id].filter(task => {
									return !task.isDone
								})
							}
							if (todolist.filter == 'completed') {
								filteredTasks = tasks[todolist.id].filter(task => {
									return task.isDone
								})
							}
							
							return (
								<Grid key={todolist.id}>
									<Paper sx={{ p: '0 20px 20px 20px' }}>
										<TodolistItem
											key={todolist.id}
											todolist={todolist}
											tasks={filteredTasks}
											deleteTask={deleteTask}
											filterTask={filterTask}
											createTask={createTask}
											changeTaskStatus={changeTaskStatus}
											deleteTodolist={deleteTodolist}
											changeTaskTitle={changeTaskTitle}
											changeTodolistTitle={changeTodolistTitle}
										/>
									</Paper>
								</Grid>
							)})
					}
				</Grid>
			</Container>
			</ThemeProvider>
		</div>
	)
}

export default App
