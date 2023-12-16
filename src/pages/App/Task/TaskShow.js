import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTaskContext } from '~/domains/Task/context'
import { TaskSimpleView } from '~/domains/Task'
import { useTaskActions } from '~/domains/Task/hooks'

const TaskShow = () => {
  const { handleGetTask } = useTaskActions()
  const { taskId } = useParams()
  const { task } = useTaskContext()

  console.log(taskId)

  useEffect(() => {
    handleGetTask(task)
  }, [task])

  return <TaskSimpleView {...task} />
}

export default TaskShow

//
// useEffect(() => {
//   if (task === null) {
//     handleGetTask(taskId)
//   }
// }, [taskId])
