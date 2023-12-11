import { notifications } from '@mantine/notifications'
import { safe } from '../../../helpers'

const useDeleteTaskById = () => {
  const deleteTask = async (_id) => {
    const response = await safe(async () => {
      const snapshot = await fetch(`http://localhost:8000/v1/tasks/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return snapshot.json()
    }, 'Failed to fetch data from server')

    if (!response.success) {
      notifications.show({
        color: 'red',
        title: 'Oops! Task failed to delete',
        message: response.error.message
      })
      return
    }
  }

  return { deleteTask }
}

export default useDeleteTaskById
