import { TaskList, TaskSimpleForm } from '~/domains/Task'
import { Box, Center, Flex, Space } from '@mantine/core'
const TaskAdvancedView = () => {
  return (
    <Center>
      <div>
        <Flex justify="center" flex={1}>
          <Box w={'50%'}>
            <TaskSimpleForm />
          </Box>
        </Flex>
        <Space h="md" />
        <Box>
          <TaskList />
        </Box>
      </div>
    </Center>
  )
}

export default TaskAdvancedView
