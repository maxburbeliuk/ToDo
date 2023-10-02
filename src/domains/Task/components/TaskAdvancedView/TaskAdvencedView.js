import { TaskList, TaskSimpleForm } from '~/domains/Task'
import { Box, Center, Flex, Space } from '@mantine/core'
const TaskAdvancedView = () => {
  return (
    <div>
      <Flex justify="center" flex={1}>
        <Box w={'1000%'}>
          <TaskSimpleForm />
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
