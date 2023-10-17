import { Badge, Card, Checkbox, Group, Text, ActionIcon } from '@mantine/core'
import { useState } from 'react'
import { IconEdit, IconTrashFilled } from '@tabler/icons-react'
import TaskSimpleForm from '../TaskSimpleForm'
import { useTaskActions } from '~/domains/Task/hooks/useTaskActions'

const TaskSimpleView = (props) => {
  const { text, description, id } = props

  const [checked, setChecked] = useState(false)
  const [edit, setEdit] = useState(false)
  const toggleEdit = () => setEdit(!edit)
  const handleDone = (event) => setChecked(event.currentTarget.checked)

  const taskActions = useTaskActions()

  const computedStatus = checked ? 'Done' : 'ToDo'
  const handleFormSubmit = (editedTask) => {
    taskActions.handleEditTask({ editedTask, id })
    toggleEdit()
  }

  const ide = window.crypto.randomUUID()
  console.log(ide)

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {edit ? (
        <TaskSimpleForm
          onSubmit={handleFormSubmit}
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
                onClick={() => taskActions.handleDeleteTask({ id })}
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
