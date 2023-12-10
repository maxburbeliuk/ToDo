import { useParams } from 'react-router-dom'
import { useTaskContext } from '~/domains/Task/context'
import { TaskSimpleView } from '~/domains/Task'

const TaskShow = () => {
  const { taskId } = useParams()

  const { tasks } = useTaskContext()

  const task = tasks?.find((task) => task?.id === taskId) || {}

  return <TaskSimpleView {...task} />
}

export default TaskShow
