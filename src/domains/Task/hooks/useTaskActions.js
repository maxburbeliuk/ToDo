import { useContext } from 'react'
import { TaskDispatchContext } from '~/domains/Task/context'
import * as TASK_CONTEXT_ACTIONS from '~/domains/Task/context/__constants__/taskActions'

export function useTaskActions() {
  const taskDispatch = useContext(TaskDispatchContext)

  const handleEditTask = (props) => {
    const { editedTask, id } = props
    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.EDIT_TASK,
      payload: {
        task: { ...editedTask, id }
      }
    })
  }

  const handleDeleteTask = (props) => {
    const { id } = props
    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.DELETE_TASK,
      payload: {
        task: { id }
      }
    })
  }

  const createTask = ({ text, description }) => {
    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.CREATE_TASK,
      payload: {
        task: { text, description, id: crypto.randomUUID() }
      }
    })
  }
  return {
    createTask,
    handleEditTask,
    handleDeleteTask
  }
}
