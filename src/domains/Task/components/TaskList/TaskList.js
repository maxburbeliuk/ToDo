import { TaskSimpleView } from '~/domains/Task'
import { SimpleGrid } from '@mantine/core'
import { useState } from 'react'

const TaskList = (props) => {
  const { computedTasks } = props
  const [selectedTasks, setSelectedTasks] = useState(new Map())
  const handleClick = (task) => {
    const taskId = task._id
    setSelectedTasks((currentSelectedTasks) => {
      const copySelectedTasks = new Map(
        Object.entries(Object.fromEntries(currentSelectedTasks.entries()))
      )
      if (copySelectedTasks.has(taskId)) {
        copySelectedTasks.delete(taskId)
      } else {
        copySelectedTasks.set(taskId, task)
      }
      return copySelectedTasks
    })
  }

  const taskIds = Array.from(selectedTasks.keys())
  console.log(taskIds)
  return (
    <SimpleGrid cols={4}>
      {computedTasks?.map((item) => {
        return (
          <TaskSimpleView
            key={item._id}
            task={item}
            handleClick={handleClick}
            isSelected={selectedTasks.has(item._id)}
            taskIds={taskIds}
          />
        )
      })}
    </SimpleGrid>
  )
}
export default TaskList
