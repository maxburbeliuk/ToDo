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
  const handleEditTask = async (taskData) => {
    const { text, description, _id } = taskData

    const endpoint = endpointsBuilder(ENDPOINTS.TASKS_BY_ID, { taskId: _id })

    const { data: task, message } = await edit(endpoint, {
      text,
      description
    })

    if (!task) return

    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.EDIT_TASK,
      payload: {
        task: { text, description, _id }
      }
    })
    notifications.show({
      title: 'Notification',
      message: message,
      color: 'green'
    })
  }

  const handleGetTask = async (_id) => {
    const endpoint = endpointsBuilder(ENDPOINTS.TASKS_BY_ID, { taskId: _id })

    const { data: task, message } = await get(endpoint)

    console.log(_id)
    if (!task) return

    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.DELETE_TASK,
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
    console.log({ data: task, message })

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

  const handleDone = (taskId, currentStatus) => {
    try {
      taskDispatch({
        type: TASK_CONTEXT_ACTIONS.CHANGE_DONE,
        payload: {
          task: { _id: taskId, done: !currentStatus }
        }
      })
    } catch (error) {}
  }

  return {
    handleDone,
    handleCreateTask,
    handleEditTask,
    handleDeleteTask,
    handleGetTask
  }
}
