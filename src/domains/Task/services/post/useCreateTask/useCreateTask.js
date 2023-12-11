import { notifications } from '@mantine/notifications'
import { safe } from '../../../helpers'

const useCreateTask = () => {
  const createTask = async (text, description) => {
    const createDocument = async () => {
      const snapshot = await fetch('http://localhost:8000/v1/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, description })
      })
      return await snapshot.json()
    }

    const response = await safe(
      createDocument(),
      'Failed to fetch data from server'
    )

    if (!response.success) {
      notifications.show({
        color: 'red',
        title: 'Oops! Task failed to create',
        message: response.error.message
      })
      return
    }

    return response.data.data
  }

  return { createTask }
}

export default useCreateTask
