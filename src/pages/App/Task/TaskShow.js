import { useParams } from 'react-router-dom'
import { TaskSimpleView } from '~/domains/Task'
import { useTaskContext } from '~/domains/Task/context'

const TaskShow = () => {
  const { taskId } = useParams()
  const { tasks } = useTaskContext()

  const task = tasks.find((task) => task._id === taskId)
  return Object.keys(task || {}).length > 0 ? (
    <TaskSimpleView {...task} />
  ) : null
}

export default TaskShow
