import { notifications } from '@mantine/notifications'
import { safe } from '../../../helpers'

const useDeleteTaskById = () => {
  const deleteTask = async (id) => {
    const body = safe(
      () => JSON.stringify({ id }),
      'Failed to serialize request'
    )

    const response = await safe(async () => {
      const snapshot = await fetch(`http://localhost:8000/v1/tasks/${id}`, {
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
