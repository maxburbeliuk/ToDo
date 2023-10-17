import { TaskList, TaskSimpleForm } from '~/domains/Task'
import { Box, Flex, Space } from '@mantine/core'
import { useTaskActions } from '~/domains/Task/hooks/useTaskActions'

const TaskAdvancedView = () => {
  const { createTask } = useTaskActions()
  return (
    <div>
      <Flex justify="center" flex={1}>
        <Box w={'1000%'}>
          <TaskSimpleForm onSubmit={createTask} />
        </Box>
      </Flex>
      <Space h="md" />
      <Box>
        <TaskList />
      </Box>
    </div>
  )
}

export default TaskAdvancedView
