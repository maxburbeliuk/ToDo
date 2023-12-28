import { useContext } from 'react'
import { notifications } from '@mantine/notifications'
import { TaskDispatchContext } from '~/domains/Task/context'
import '@mantine/notifications/styles.css'
import * as TASK_CONTEXT_ACTIONS from '~/domains/Task/context/__constants__/taskActions'
import endpointsBuilder from '../../../helpers/endpointsBuilder'
import { ENDPOINTS } from '~/__constants__'
import { create, edit, remove, get } from '~/services'

export default function useTaskActions() {
  const taskDispatch = useContext(TaskDispatchContext)

  const handleEditOrChange = async (taskData) => {
    const { _id, text, description, done } = taskData
    const endpoint = endpointsBuilder(ENDPOINTS.TASKS_BY_ID, { taskId: _id })

    const { data: task, message } = await edit(endpoint, {
      done: !done,
      text,
      description
    })

    if (!task) return

    notifications.show({
      title: 'Notification',
      message: message,
      color: 'green'
    })

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

    const { data: task, message } = await remove(endpoint)

    if (!task) return

    notifications.show({
      title: 'Notification',
      message: message,
      color: 'green'
    })
  }

  const handleCreateTask = async ({ text, description }) => {
    const endpoint = endpointsBuilder(ENDPOINTS.TASKS)

    const { data: task, message } = await create(endpoint, {
      text,
      description
    })

    if (!task) return

    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.CREATE_TASK,
      payload: {
        task
      }
    })
    notifications.show({
      title: 'Notification',
      message: message,
      color: 'green'
    })
  }

  return {
    handleEditOrChange,
    handleCreateTask,
    handleDeleteTask,
    handleGetTask
  }
}
