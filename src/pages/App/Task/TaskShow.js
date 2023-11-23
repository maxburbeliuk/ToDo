import { ActionIcon, Badge, Checkbox, Group, Text, Card } from '@mantine/core'
import { IconEdit, IconTrashFilled } from '@tabler/icons-react'
import { modals } from '@mantine/modals'
import { useTaskActions } from '~/domains/Task/hooks'
import { useParams } from 'react-router-dom'
import { useMemo } from 'react'

const TaskShow = (props) => {
  const { done, id, text, description } = props
  const { taskId } = useParams()

  const { handleDeleteTask, handleDone } = useTaskActions()

  const computedStatus = done ? 'Done' : 'ToDo'
  const computedCheckBoxLabel = done ? 'Mark todo' : 'Mark done'
  console.log({ text, description })

  const currentTask = useMemo(() => {
    return {
      text,
      description
    }
  }, [text, description])

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete your task',
      centered: true,
      children: <Text size="sm">{currentTask.text}</Text>,
      labels: { confirm: 'Delete task', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onConfirm: () => handleDeleteTask(taskId)
    })
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{text}</Text>
          <Badge color={'var(--mantine-color-pink-5)'} variant="light">
            {computedStatus}
          </Badge>
        </Group>
        <Text size="sm" c="dimmed">
          {currentTask.description}
        </Text>
        <Group gap="md" justify="space-between" mt="md">
          <Checkbox
            checked={done}
            onChange={() => handleDone(id, done)}
            label={computedCheckBoxLabel}
          />
          <Group gap="md">
            <ActionIcon variant="filled" aria-label="edit">
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              aria-label="delete"
              color={'var(--mantine-color-red-8)'}
              onClick={openDeleteModal}
            >
              <IconTrashFilled size={18} />
            </ActionIcon>
          </Group>
        </Group>
      </Card>
    </>
  )
}

export default TaskShow
