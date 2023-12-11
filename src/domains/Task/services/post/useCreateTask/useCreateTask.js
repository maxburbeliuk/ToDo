import { notifications } from '@mantine/notifications'
import { safe } from '../../../helpers'

const useCreateTask = () => {
  const createTask = async (text, description) => {
    const body = safe(
      () => JSON.stringify({ text, description }),
      'Failed to serialize request'
    )

    if (!body.success) {
      notifications.show({
        color: 'red',
        title: 'Oops! Task failed to create',
        message: body.error
      })
      return
    }

    const response = await safe(async () => {
      const snapshot = await fetch('http://localhost:8000/v1/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body.data
      })
      return snapshot.json()
    }, 'Failed to fetch data from server')

    if (!response.success) {
      notifications.show({
        color: 'red',
        title: 'Oops! Task failed to create',
        message: response.error.message
      })
      return
    }
    console.log(response.data)
    return response.data.data
  }

  return { createTask }
}

export default useCreateTask
