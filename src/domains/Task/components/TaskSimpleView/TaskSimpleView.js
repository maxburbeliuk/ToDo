import {
  Badge,
  Card,
  Checkbox,
  Group,
  Text,
  ActionIcon,
  Button
} from '@mantine/core'
import { useState } from 'react'
import { IconEdit, IconTrashFilled } from '@tabler/icons-react'
import { useTaskDispatchContext } from '~/domains/Task/context'
import { TASK_CONTEXT_ACTIONS } from '~/domains/Task/context/__constants__'
import TaskSimpleForm from '../TaskSimpleForm'

const TaskSimpleView = (props) => {
  const { text, description, id } = props

  const taskDispatch = useTaskDispatchContext()

  const [checked, setChecked] = useState(false)
  const [edit, setEdit] = useState(false)

  const handleDone = (event) => setChecked(event.currentTarget.checked)

  const toggleEdit = () => setEdit(!edit)

  const handleEditTask = (editedTask) => {
    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.EDIT_TASK,
      payload: {
        task: { ...editedTask, id }
      }
    })
    toggleEdit()
  }

  const handleDeleteTask = () => {
    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.DELETE_TASK,
      payload: {
        task: { id }
      }
    })
  }

  const computedStatus = checked ? 'Done' : 'Todo'

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {edit ? (
        <TaskSimpleForm
          onSubmit={handleEditTask}
          initialValues={{ text, description }}
          onCancel={toggleEdit}
        />
      ) : (
        <>
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{text}</Text>
            <Badge color="pink" variant="light">
              {computedStatus}
            </Badge>
          </Group>

          <Text size="sm" c="dimmed">
            {description}
          </Text>
          <Group gap="md" justify="space-between" mt="md">
            <Checkbox
              checked={checked}
              onChange={handleDone}
              label={checked ? 'Mark done' : 'Mark todo'}
            />
            <Group gap="md">
              <ActionIcon
                variant="filled"
                aria-label="edit"
                onClick={toggleEdit}
              >
                <IconEdit size={18} />
              </ActionIcon>
              <ActionIcon
                variant="filled"
                aria-label="delete"
                color="red"
                onClick={handleDeleteTask}
              >
                <IconTrashFilled size={18} />
              </ActionIcon>
            </Group>
          </Group>
        </>
      )}
    </Card>
  )
}

export default TaskSimpleView
