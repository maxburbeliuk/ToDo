import React, { useState } from 'react'
import {
  TaskList,
  TaskSimpleForm,
  TaskSimpleFilter,
  TaskSimpleMenu
} from '~/domains/Task'
import { Space, Divider, Group } from '@mantine/core'
import { useTaskActions } from '~/domains/Task/hooks/useTaskActions'

const TaskAdvancedView = () => {
  const { handleCreateTask } = useTaskActions()
  const [activeFilter] = useState('all')

  return (
    <div>
      <TaskSimpleForm onSubmit={handleCreateTask} />
      <Space h="lg" />
      <Group justify="right" gap="sm">
        <TaskSimpleFilter />
        <Divider orientation="vertical" />
        <TaskSimpleMenu />
      </Group>
      <Space h="lg" />
      <TaskList activeFilter={activeFilter} />
    </div>
  )
}

export default TaskAdvancedView
