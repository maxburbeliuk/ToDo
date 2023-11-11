import {
  Badge,
  Card,
  Checkbox,
  Group,
  Text,
  ActionIcon,
  Modal
} from '@mantine/core'
import { IconEdit, IconTrashFilled } from '@tabler/icons-react'
import TaskSimpleForm from '~/domains/Task/components/TaskSimpleForm'
import { useTaskActions } from '~/domains/Task/hooks'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'

const TaskSimpleView = (props) => {
  const { text, description, id, done } = props

  const [opened, { open, close }] = useDisclosure(false)
  const isMobile = useMediaQuery('(max-width: 50em)')

  const { handleEditTask, handleDeleteTask, handleDone } = useTaskActions()

  const computedStatus = done ? 'Done' : 'ToDo'
  const computedCheckBoxLabel = done ? 'Mark todo' : 'Mark done'

  const handleFormSubmit = (taskData) => {
    handleEditTask({ ...taskData, id })
    close()
  }

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
          {description}
        </Text>
        <Group gap="md" justify="space-between" mt="md">
          <Checkbox
            checked={done}
            onChange={() => handleDone(id, done)}
            label={computedCheckBoxLabel}
          />
          <Group gap="md">
            <ActionIcon variant="filled" aria-label="edit" onClick={open}>
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              aria-label="delete"
              color={'var(--mantine-color-red-8)'}
              onClick={() => handleDeleteTask(id)}
            >
              <IconTrashFilled size={18} />
            </ActionIcon>
          </Group>
        </Group>
      </Card>
      <Modal
        opened={opened}
        onClose={close}
        title="Edit task"
        centered
        fullScreen={isMobile}
        transitionProps={{
          transition: 'fade',
          duration: 300,
          timingFunction: 'linear'
        }}
      >
        <TaskSimpleForm
          onSubmit={handleFormSubmit}
          initialValues={{ text, description }}
        />
      </Modal>
    </>
  )
}
export default TaskSimpleView
