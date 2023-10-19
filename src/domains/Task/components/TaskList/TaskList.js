import { TaskSimpleView } from '~/domains/Task'
import { SimpleGrid } from '@mantine/core'
import { useTaskContext } from '~/domains/Task/context'

const TaskList = () => {
  const { tasks } = useTaskContext()

  return (
    <SimpleGrid cols={4}>
      {tasks.map((item) => (
        <TaskSimpleView {...item} />
      ))}
    </SimpleGrid>
  )
}

export default TaskList
