import { createTodolistTC, deleteTodolistTC } from "@/features/todolists/model/todolists-slice"
import { createSlice, nanoid } from "@reduxjs/toolkit"

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = {
  [key: string]: Task[]
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  },
  reducers: (create) => ({
    deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const index = state[action.payload.todolistId].findIndex((todolist) => todolist.id === action.payload.taskId)
      if (index !== -1) {
        state[action.payload.todolistId].splice(index, 1)
      }
    }),
    createTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
      state[action.payload.todolistId].unshift({ id: nanoid(), title: action.payload.title, isDone: false })
    }),
    changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string; isDone: boolean }>((state, action) => {
      const task = state[action.payload.todolistId].find((todolist) => todolist.id === action.payload.taskId)
      if (task) {
        task.isDone = action.payload.isDone
      }
    }),
    changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
      const task = state[action.payload.todolistId].find((todolist) => todolist.id === action.payload.taskId)
      if (task) {
        task.title = action.payload.title
      }
    }),
  }),
})

export const { selectTasks } = tasksSlice.selectors
export const { deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
