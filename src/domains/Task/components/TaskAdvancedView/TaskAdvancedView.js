import {
  TaskList,
  TaskSimpleForm,
  TaskSimpleFilter,
  TaskSimpleMenu,
  TaskSearch,
  ImageUpload
} from '~/domains/Task'
import { useDisclosure } from '@mantine/hooks'
import { IconTrashFilled } from '@tabler/icons-react'
import {
  Space,
  Divider,
  Group,
  Grid,
  Drawer,
  Button,
  ActionIcon,
  Text
} from '@mantine/core'
import { useSearchTask, useTaskActions } from '~/domains/Task/hooks'
import { modals } from '@mantine/modals'
import { useState } from 'react'

const TaskAdvancedView = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const { handleCreateTask, handleDeleteManyTask } = useTaskActions()
  const { tasksWithSearchedValue, setSearchedValue } = useSearchTask()
  const [currentTaskIds, setCurrentTaskIds] = useState([])

  const onChangeSelectedTask = (taskIds) => {
    setCurrentTaskIds(taskIds)
  }

  const openDeleteModal = () => {
    modals.openConfirmModal({
      title: 'Delete your task',
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete your task?</Text>
      ),
      labels: { confirm: 'Delete task', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        handleDeleteManyTask(currentTaskIds)
        close()
      }
    })
  }

  return (
    <>
      <Drawer
        withCloseButton={false}
        position="top"
        size="62px"
        opened={opened}
        onClose={close}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <ActionIcon
          variant="filled"
          aria-label="delete"
          color={'var(--mantine-color-red-8)'}
          onClick={openDeleteModal}
        >
          <IconTrashFilled size={18} />
        </ActionIcon>
      </Drawer>
      <ImageUpload />
      <TaskSimpleForm onSubmit={handleCreateTask} />
      <Space h="lg" />
      <Grid align="center">
        <Grid.Col span={'auto'}>
          <TaskSearch onChange={setSearchedValue} />
        </Grid.Col>

        <Grid.Col span="content">
          <Group justify="right" gap="sm">
            <TaskSimpleFilter />
            <Divider orientation="vertical" />
            <TaskSimpleMenu />
            <Button onClick={open}>Open Drawer</Button>
          </Group>
        </Grid.Col>
      </Grid>
      <Space h="lg" />
      <TaskList
        computedTasks={tasksWithSearchedValue}
        onChangeSelectedTask={onChangeSelectedTask}
      />
    </>
  )
}
export default TaskAdvancedView
