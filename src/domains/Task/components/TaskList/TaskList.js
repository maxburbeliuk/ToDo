import { TaskSimpleView } from '~/domains/Task'
import { SimpleGrid } from '@mantine/core'
import { useFilterAndSortTask } from '~/domains/Task/hooks'

const TaskList = () => {
  const { computedTasks } = useFilterAndSortTask()

  return (
    <SimpleGrid cols={4}>
      {computedTasks?.map((item) => (
        <TaskSimpleView {...item} />
      ))}
    </SimpleGrid>
  )
}
export default TaskList
