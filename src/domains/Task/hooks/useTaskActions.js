import { useContext } from 'react'
import { TaskDispatchContext } from '~/domains/Task/context'
import { TASK_CONTEXT_ACTIONS } from '~/domains/Task/context/__constants__'
import endpointsBuilder from '~/helpers/endpointsBuilder'
import { ENDPOINTS } from '~/__constants__'
import { post, update, remove, get } from '~/services'

export default function useTaskActions() {
  const taskDispatch = useContext(TaskDispatchContext)

  const handleEditOrChange = async (taskData) => {
    const { _id, text, description, done } = taskData
    const endpoint = endpointsBuilder(ENDPOINTS.TASKS_BY_ID, { taskId: _id })

    const { data: task } = await update(
      endpoint,
      {
        done: !done,
        text,
        description
      },
      true
    )

    if (!task) return

    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.EDIT_OR_CHANGE,
      payload: {
        task
      }
    })
  }

  const handleGetTask = async (_id) => {
    const endpoint = endpointsBuilder(ENDPOINTS.TASKS_BY_ID, { taskId: _id })

    const task = await get(endpoint)

    return task
  }

  const handleDeleteTask = async (_id) => {
    const endpoint = endpointsBuilder(ENDPOINTS.TASKS_BY_ID, { taskId: _id })

    const { data: task } = await remove(endpoint, {}, true)

    if (!task) return
  }

  const handleDeleteManyTask = async (taskIds) => {
    const endpoint = endpointsBuilder(ENDPOINTS.TASKS)
    const { data: tasks } = await remove(endpoint, { taskIds }, true)

    if (!tasks) return

    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.UPDATE_DELETED_TASKS,
      payload: {
        tasks
      }
    })
  }

  const handleCreateTask = async ({ text, description }) => {
    const endpoint = endpointsBuilder(ENDPOINTS.TASKS)

    const { data: task } = await post(
      endpoint,
      {
        text,
        description
      },
      true
    )

    if (!task) return

    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.CREATE_TASK,
      payload: {
        task
      }
    })
  }

  return {
    handleEditOrChange,
    handleCreateTask,
    handleDeleteTask,
    handleGetTask,
    handleDeleteManyTask
  }
}
