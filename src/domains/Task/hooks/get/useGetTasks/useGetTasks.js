import { useEffect, useState } from 'react'
import { notifications } from '@mantine/notifications'

const useGetTasks = () => {
  const [tasks, setTasks] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const fetchTasks = async () => {
    try {
      setLoading(true)

      const snapshot = await fetch('http://localhost:8000/v1/tasks', {
        method: 'GET'
      })

      const response = await snapshot.json()

      if (response.statusCode !== 200) {
        notifications.show({
          color: 'red',
          title: response.message,
          message: response.error
        })
        return
      }

      setTasks(response.data)
    } catch (err) {
      setError(err)
      notifications.show({
        color: 'red',
        title: 'Error during fetching tasks',
        message: err.message
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (tasks === null) {
      fetchTasks()
    }
  }, [])

  return [tasks, loading, error]
}

export default useGetTasks
