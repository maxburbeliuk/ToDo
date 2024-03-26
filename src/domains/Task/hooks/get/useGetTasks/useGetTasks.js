import { useEffect, useState } from 'react'
import { notifications } from '@mantine/notifications'
import { get } from '~/services'
import { ENDPOINTS } from '~/__constants__'
import { endpointsBuilder } from '~/helpers'

const useGetTasks = () => {
  const [tasks, setTasks] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const fetchTasks = async () => {
    try {
      setLoading(true)

      const endpoint = endpointsBuilder(ENDPOINTS.TASKS)

      const response = await get(endpoint)

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
