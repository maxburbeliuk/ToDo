import { notifications } from '@mantine/notifications'
import { useState } from 'react'

const useCreateTask = () => {
  const [_, setTasks] = useState([])
  const [error, setError] = useState(null)

  const createTask = async (text, description) => {
    if (!text || !description) {
      notifications.show({
        color: 'red',
        title: 'Missing information!',
        message: 'Please fill in both "Text" and "Description" fields.'
      })
      return
    }

    try {
      const snapshot = await fetch('http://localhost:8000/v1/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, description })
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

      setTasks((prevTasks) => {
        if (!Array.isArray(prevTasks)) {
          return [response.data]
        }
        return [...prevTasks, response.data]
      })
    } catch (err) {
      setError(err)
      notifications.show({
        color: 'red',
        title: 'Oops! Task failed to create',
        message: err.message
      })
    }
  }

  return { createTask, error }
}

export default useCreateTask
