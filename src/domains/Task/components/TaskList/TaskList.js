import { TaskSimpleView } from '~/domains/Task'
import { SimpleGrid } from '@mantine/core'
import { useTaskContext } from '~/domains/Task/context'
import FILTER_TABS from '~/domains/Task/components/__constans__'

const TaskList = () => {
  const { tasks, filter } = useTaskContext()

  const FILTER_TASKS_BY_DONE = {
    [FILTER_TABS.ALL]: tasks,
    [FILTER_TABS.DONE]: tasks.filter((task) => !!task?.done),
    [FILTER_TABS.TO_DO]: tasks.filter((task) => !task?.done)
  }

  return (
    <SimpleGrid cols={4}>
      {FILTER_TASKS_BY_DONE?.[filter]?.map((item) => (
        <TaskSimpleView {...item} />
      ))}
    </SimpleGrid>
  )
}

export default TaskList
