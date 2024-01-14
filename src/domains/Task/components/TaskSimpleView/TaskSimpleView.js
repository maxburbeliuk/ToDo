import { Badge, Checkbox, Group, Text, ActionIcon } from '@mantine/core'
import { IconEdit, IconTrashFilled } from '@tabler/icons-react'
import { modals } from '@mantine/modals'
import { useTaskActions } from '~/domains/Task/hooks'
import { APP_PATHS } from '~/__constants__'
import { generatePath, useLocation, useNavigate } from 'react-router-dom'
import StyledCard from '~/domains/Task/components/TaskSimpleView/Card.styled'

const TaskSimpleView = (props) => {
  const { task = {}, editCallback, handleClick, isSelected } = props
  const { _id, text, description, done } = task
  const { handleDeleteTask, handleEditOrChange } = useTaskActions()
  const navigate = useNavigate()
  const location = useLocation()
  const computedStatus = done ? 'Done' : 'ToDo'
  const computedCheckBoxLabel = done ? 'Mark todo' : 'Mark done'

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete your task',
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete your task?</Text>
      ),
      labels: { confirm: 'Delete task', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        handleDeleteTask(_id)

        if (location?.pathname !== APP_PATHS.TASKS_ALL) {
          navigate(APP_PATHS.TASKS_ALL)
        }
      }
    })

  const onDone = async () => {
    await handleEditOrChange({ _id, done })
    editCallback?.(!done)
  }

  const onEditTask = () => {
    const pathParams = {
      taskId: _id
    }
    const path = generatePath(APP_PATHS.TASK_EDIT, pathParams)
    navigate(path)
  }

  const onShowTask = () => {
    const pathParams = {
      taskId: _id
    }
    const path = generatePath(APP_PATHS.TASKS_SHOW, pathParams)
    navigate(path)
  }

  return (
    <>
      <StyledCard
        shadow="lg"
        padding="md"
        isSelected={isSelected}
        onClick={() => {
          handleClick?.(task)
        }}
        onDoubleClick={onShowTask}
      >
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
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            checked={done}
            onChange={onDone}
            label={computedCheckBoxLabel}
          />
          <Group gap="md">
            <ActionIcon variant="filled" aria-label="edit" onClick={onEditTask}>
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
      </StyledCard>
    </>
  )
}
export default TaskSimpleView
