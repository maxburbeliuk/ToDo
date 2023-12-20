import { useEffect, useState } from 'react'
import { endpointsBuilder } from '~/helpers'
import { ENDPOINTS } from '~/__constants__'
import { get } from '~/services'

const useGetTaskById = (taskId) => {
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTask = async (taskId) => {
    setLoading(true)
    const endpoint = endpointsBuilder(ENDPOINTS.TASKS_BY_ID, { taskId })

    const result = await get(endpoint)
    if (!result?.data) {
      setError(result?.message || 'Oops! Failed to fetch')
    } else {
      setTask(result.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!task && taskId) {
      fetchTask(taskId)
    }
  }, [taskId, task])

  return [task, loading, error, fetchTask]
}

export default useGetTaskById
