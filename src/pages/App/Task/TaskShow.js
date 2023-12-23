import { Loader } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { TaskSimpleView } from '~/domains/Task'
import { useGetTaskById } from '~/domains/Task/hooks'

const TaskShow = () => {
  const { taskId } = useParams()
  const [task, loading, error, fetchTask] = useGetTaskById(taskId)

  if (error) return error.message
  if (loading) {
    return <Loader color="blue" size={30} />
  }
  const handleUpdateDone = () => {
    fetchTask(taskId)
  }

  return Object.keys(task || {}).length > 0 ? (
    <TaskSimpleView {...task} editCallback={handleUpdateDone} />
  ) : null
}

export default TaskShow
