import TaskSimpleForm from '~/domains/Task/components/TaskSimpleForm'
import { useTaskActions } from '~/domains/Task/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { useTaskContext } from '~/domains/Task/context'
import { APP_PATHS } from '~/__constants__'

const TaskEdit = () => {
  const navigate = useNavigate()
  const { taskId } = useParams()

  const { tasks } = useTaskContext()

  const { text, description, id } =
    tasks?.find((task) => task?.id === taskId) || {}

  const { handleEditTask } = useTaskActions()
  const handleFormSubmit = (taskData) => {
    handleEditTask({ ...taskData, id })

    navigate(APP_PATHS.TASKS_ALL)
  }

  return (
    <TaskSimpleForm
      onSubmit={handleFormSubmit}
      initialValues={{ text, description }}
    />
  )
}
export default TaskEdit
