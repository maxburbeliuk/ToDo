import { TaskSimpleView } from '~/domains/Task'
import { SimpleGrid } from '@mantine/core'
import { useState } from 'react'

const TaskList = (props) => {
  const { computedTasks, onChangeSelectedTask } = props
  const [selectedTasks, setSelectedTasks] = useState(new Map())

  const handleClick = (task) => {
    const taskId = task._id
    const copySelectedTasks = new Map(
      Object.entries(Object.fromEntries(selectedTasks.entries()))
    )
    if (copySelectedTasks.has(taskId)) {
      copySelectedTasks.delete(taskId)
    } else {
      copySelectedTasks.set(taskId, task)
    }

    setSelectedTasks(copySelectedTasks)
    const taskIds = Array.from(copySelectedTasks.keys())
    onChangeSelectedTask(taskIds)
  }

  return (
    <SimpleGrid cols={4}>
      {computedTasks?.map((item) => {
        return (
          <TaskSimpleView
            key={item._id}
            task={item}
            handleClick={handleClick}
            isSelected={selectedTasks.has(item._id)}
          />
        )
      })}
    </SimpleGrid>
  )
}
export default TaskList
