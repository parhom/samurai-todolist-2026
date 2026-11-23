import { useAppSelector } from "@/common/hooks"
import { selectTasks } from "@/features/todolists/model/tasks-slice"
import List from "@mui/material/List"

import { TodolistItemProps } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"

export const Tasks = ({ todolist }: TodolistItemProps) => {
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)

  let filteredTasks = tasks[id]
  if (filter == "active") {
    filteredTasks = tasks[id].filter((task) => {
      return !task.isDone
    })
  }
  if (filter == "completed") {
    filteredTasks = tasks[id].filter((task) => {
      return task.isDone
    })
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <span> tasks not found </span>
      ) : (
        <List>
          {filteredTasks?.map((task) => {
            return <TaskItem key={task.id} task={task} todolistId={id} />
          })}
        </List>
      )}
    </>
  )
}
