import {
  TaskList,
  TaskSimpleForm,
  TaskSimpleFilter,
  TaskSimpleMenu,
  TaskSearch
} from '~/domains/Task'
import { Space, Divider, Group, Grid } from '@mantine/core'
import { useSearchTask, useTaskActions } from '~/domains/Task/hooks'
import React, { useState } from 'react'

const TaskAdvancedView = () => {
  const { handleCreateTask } = useTaskActions()

  const { tasksWithSearchedValue, setSearchedValue } = useSearchTask()
  const ButtonWithError = () => {
    const [hasError, setHasError] = useState(false)
    if (hasError) {
      throw Error('Error')
    }
    return <button onClick={() => setHasError(true)}>Error</button>
  }
  return (
    <div>
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
          </Group>
        </Grid.Col>
      </Grid>
      <Space h="lg" />
      <TaskList computedTasks={tasksWithSearchedValue} />
    </div>
  )
}

export default TaskAdvancedView
