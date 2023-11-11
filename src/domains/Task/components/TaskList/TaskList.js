import { TaskSimpleView } from '~/domains/Task'
import { SimpleGrid } from '@mantine/core'

const TaskList = (props) => {
  const { computedTasks } = props

  return (
    <SimpleGrid cols={4}>
      {computedTasks?.map((item) => (
        <TaskSimpleView {...item} />
      ))}
    </SimpleGrid>
  )
}
export default TaskList
