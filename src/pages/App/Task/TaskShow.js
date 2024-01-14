import { useParams } from 'react-router-dom'
import { TaskSimpleView } from '~/domains/Task'
import { useGetTaskById } from '~/domains/Task/hooks'
import { Loader, Text } from '@mantine/core'

const TaskShow = () => {
  const { taskId } = useParams()
  const [task, loading, error] = useGetTaskById(taskId)

  if (error) {
    return <Text>{error}</Text>
  }

  return loading ? (
    <Loader color="blue" size={30} />
  ) : (
    <TaskSimpleView {...task} />
  )
}

export default TaskShow
