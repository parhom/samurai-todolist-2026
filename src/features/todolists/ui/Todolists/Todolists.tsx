import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { todolistsApi } from "@/features/todolists/api/todolistsApi"
import { setTodolistsAC } from "@/features/todolists/model/todolists-slice"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { selectTodolists } from "@/features/todolists/model/todolists-selectors.ts"
import { useEffect } from "react"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    todolistsApi.getTodolists().then((todolists) => {
      dispatch(setTodolistsAC({ todolists }))
    })
  }, [])

  return todolists.map((todolist) => {
    return (
      <Grid key={todolist.id}>
        <Paper sx={{ p: "0 20px 20px 20px" }}>
          <TodolistItem key={todolist.id} todolist={todolist} />
        </Paper>
      </Grid>
    )
  })
}
