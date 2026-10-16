import './App.css'
import {Task, TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Paper from "@mui/material/Paper";
import {containerSx} from "./TodolistItem.styles.ts";
import {NavButton} from './NavButton'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Switch from '@mui/material/Switch'

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
	
	const todolistId1 = v1()
	const todolistId2 = v1()
	
	const [todolists, setTodolists] = useState<Todolist[]>([
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	])
	
	const [tasks, setTasks] = useState<TasksState>({
		[todolistId1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistId2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	})
	
	const deleteTask = (todolistId:string, taskId: string) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => {
				return task.id !== taskId
			})})
	}
	
	const filterTask = (todolistId:string, filter: filterValues) => {
		setTodolists(prevState => prevState.map(todolist=>{
			return (
				todolistId === todolist.id ? {...todolist, filter} : todolist
			)
		}))
	}
	
	const createTask = (todolistId:string, taskTitle:string) =>{
		const newTask = {id: v1(), title: taskTitle, isDone: false}
		setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
	}
	
	const changeTaskStatus = (todolistId:string, taskId:string, isDone:boolean)=>{
		setTasks({...tasks, [todolistId]: tasks[todolistId].map(task=>{
				return taskId === task.id ? {...task, isDone} : task
			})})
	}
	
	const deleteTodolist = (todolistId:string)=>{
		setTodolists(prevState =>  prevState.filter(todolist=> todolist.id !== todolistId))
		
		const {[todolistId]: _, ...restTasks} = tasks
		setTasks(restTasks)
	}
	
	const createTodolist = (title:string) => {
		const newTodolistId = v1()
		setTodolists([{ id: newTodolistId, title: title, filter: 'all' }, ...todolists])
		setTasks({...tasks,[newTodolistId]:[]})
	}
	
	const changeTaskTitle = (todolistId:string, taskId:string, title:string) =>{
		setTasks({...tasks, [todolistId]: tasks[todolistId].map(task=>{
				return taskId === task.id ? {...task, title} : task
			})})
	}
	
	const changeTodolistTitle = (todolistId:string, title:string) => {
		setTodolists(prevState => prevState.map(todolist=>{
			return (
				todolistId === todolist.id ? {...todolist, title} : todolist
			)
		}))
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
