import { useContext } from 'react'
import { notifications } from '@mantine/notifications'
import { TaskDispatchContext } from '~/domains/Task/context'
import '@mantine/notifications/styles.css'
import * as TASK_CONTEXT_ACTIONS from '~/domains/Task/context/__constants__/taskActions'

export default function useTaskActions() {
  const taskDispatch = useContext(TaskDispatchContext)

  const handleEditTask = (taskData) => {
    try {
      const { text, description, id } = taskData
      taskDispatch({
        type: TASK_CONTEXT_ACTIONS.EDIT_TASK,
        payload: {
          task: { text, description, id }
        }
      })
      notifications.show({
        title: 'Notification',
        message: 'Edit success 🤩',
        color: 'green'
      })
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Notification with custom styles',
        message: error.message
      })
    }
  }

  const handleDeleteTask = (id) => {
    try {
      taskDispatch({
        type: TASK_CONTEXT_ACTIONS.DELETE_TASK,
        payload: {
          task: { id }
        }
      })
      notifications.show({
        title: 'Notification',
        message: 'Delete success 🤩',
        color: 'green'
      })
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Notification with custom styles',
        message: error.message
      })
    }
  }

  const handleCreateTask = ({ text, description }) => {
    try {
      taskDispatch({
        type: TASK_CONTEXT_ACTIONS.CREATE_TASK,
        payload: {
          task: { text, description, id: crypto.randomUUID() }
        }
      })
      notifications.show({
        title: 'Notification',
        message: 'Create task success 🤩',
        color: 'green'
      })
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Notification with custom styles',
        message: error.message
      })
    }
  }

  const handleDone = (taskId, currentStatus) => {
    try {
      taskDispatch({
        type: TASK_CONTEXT_ACTIONS.CHANGE_DONE,
        payload: {
          task: { id: taskId, done: !currentStatus }
        }
      })
    } catch (error) {}
  }

  return {
    handleDone,
    handleCreateTask,
    handleEditTask,
    handleDeleteTask
  }
}
