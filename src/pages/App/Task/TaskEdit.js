import TaskSimpleForm from '~/domains/Task/components/TaskSimpleForm'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { useTaskActions } from '~/domains/Task/hooks'

const TaskEdit = (props) => {
  const { text, description, id } = props
  const [_, { close }] = useDisclosure(false)

  const { handleEditTask } = useTaskActions()
  const handleFormSubmit = (taskData) => {
    handleEditTask({ ...taskData, id })
    close()
  }

  return (
    <div onClose={close} title="Edit task">
      <TaskSimpleForm
        onSubmit={handleFormSubmit}
        initialValues={{ text, description }}
      />
    </div>
  )
}
export default TaskEdit
