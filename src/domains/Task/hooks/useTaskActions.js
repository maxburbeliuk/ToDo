import { useContext } from 'react'
import { notifications } from '@mantine/notifications'
import { TaskDispatchContext } from '~/domains/Task/context'
import '@mantine/notifications/styles.css'
import * as TASK_CONTEXT_ACTIONS from '~/domains/Task/context/__constants__/taskActions'
import useCreateTask from '~/domains/Task/services/post'

export default function useTaskActions() {
  const taskDispatch = useContext(TaskDispatchContext)
  const { createTask } = useCreateTask()
  const handleEditTask = (taskData) => {
    try {
      const { text, description, _id } = taskData
      taskDispatch({
        type: TASK_CONTEXT_ACTIONS.EDIT_TASK,
        payload: {
          task: { text, description, _id }
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

  const handleDeleteTask = (_id) => {
    try {
      taskDispatch({
        type: TASK_CONTEXT_ACTIONS.DELETE_TASK,
        payload: {
          task: { _id }
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

  const handleCreateTask = async ({ text, description }) => {
    try {
      const newTask = await createTask(text, description)
      if (!newTask) return

      taskDispatch({
        type: TASK_CONTEXT_ACTIONS.CREATE_TASK,
        payload: {
          task: newTask
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
          task: { _id: taskId, done: !currentStatus }
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
