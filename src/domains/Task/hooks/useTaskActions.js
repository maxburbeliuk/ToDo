import { useContext } from 'react'
import { TaskDispatchContext } from '~/domains/Task/context'
import * as TASK_CONTEXT_ACTIONS from '~/domains/Task/context/__constants__/taskActions'

export function useTaskActions() {
  const taskDispatch = useContext(TaskDispatchContext)

  const handleEditTask = (taskData) => {
    const { text, description, id } = taskData
    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.EDIT_TASK,
      payload: {
        task: { text, description, id }
      }
    })
  }

  const handleDeleteTask = (id) => {
    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.DELETE_TASK,
      payload: {
        task: { id }
      }
    })
  }

  const handleCreateTask = ({ text, description }) => {
    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.CREATE_TASK,
      payload: {
        task: { text, description, id: crypto.randomUUID() }
      }
    })
  }
  const handleDone = (event) => {
    const { id } = event
    const newStatus = !event.currentTarget.checked
    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.TO_DO,
      payload: {
        task: { id, done: newStatus }
      }
    })
  }

  return {
    handleDone,
    handleCreateTask,
    handleEditTask,
    handleDeleteTask
  }
}
