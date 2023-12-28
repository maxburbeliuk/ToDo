import { TaskSimpleView } from '~/domains/Task'
import { SimpleGrid } from '@mantine/core'
import { useState } from 'react'

const TaskList = (props) => {
  const { computedTasks } = props
  const [selectedTasks, setSelectedTasks] = useState([])

  const handleClick = (taskId) => {
    const existingIndex = selectedTasks.findIndex((task) => task._id === taskId)

    if (existingIndex !== -1) {
      const updatedTasks = [...selectedTasks]
      updatedTasks.splice(existingIndex, 1)
      setSelectedTasks(updatedTasks)
    } else {
      const taskToAdd = computedTasks.find((task) => task._id === taskId)
      if (taskToAdd) {
        setSelectedTasks([...selectedTasks, taskToAdd])
        console.log('Selected tasks:', [...selectedTasks, taskToAdd])
      }
    }
  }

  return (
    <SimpleGrid cols={4}>
      {computedTasks?.map((item) => {
        const isSelected = selectedTasks.some((task) => task._id === item._id)
        return (
          <TaskSimpleView
            key={item._id}
            {...item}
            handleClick={handleClick}
            isSelected={isSelected}
          />
        )
      })}
    </SimpleGrid>
  )
}
export default TaskList
