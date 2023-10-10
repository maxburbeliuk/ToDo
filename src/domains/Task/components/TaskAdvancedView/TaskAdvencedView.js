import { TaskList, TaskSimpleForm } from '~/domains/Task'
import { Box, Flex, Space } from '@mantine/core'
import * as TASK_CONTEXT_ACTIONS from '~/domains/Task/context/__constants__/taskActions'
import { useTaskDispatchContext } from '~/domains/Task/context'

const TaskAdvancedView = () => {
  const taskDispatch = useTaskDispatchContext()

  const handleSubmitTask = (props) => {
    const { text, description } = props
    const id = new Date()

    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.CREATE_TASK,
      payload: {
        task: { text, description, id: id.toISOString() }
      }
    })
  }

  return (
    <div>
      <Flex justify="center" flex={1}>
        <Box w={'1000%'}>
          <TaskSimpleForm onSubmit={handleSubmitTask} />
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
