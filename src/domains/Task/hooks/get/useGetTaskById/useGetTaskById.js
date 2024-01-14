import { useEffect, useState } from 'react'
import endpointsBuilder from '~/helpers/endpointsBuilder'
import { ENDPOINTS } from '~/__constants__'
import { get } from '~/services'

const useGetTaskById = (taskId) => {
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchTask = async (taskId) => {
    setLoading(true)

    const endpoint = endpointsBuilder(ENDPOINTS.TASKS_BY_ID, { taskId: taskId })

    const result = await get(endpoint)

    if (!result?.data) {
      setError(result.message)
    }

    result?.data && setTask(result?.data)

    setLoading(false)
  }

  useEffect(() => {
    if (!!taskId && task === null) {
      fetchTask(taskId)
    }
  }, [taskId, task])

  return [task, loading, error]
}

export default useGetTaskById
