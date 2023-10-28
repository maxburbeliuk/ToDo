import React, { useState } from 'react'
import { TaskList, TaskSimpleForm, TaskSimpleFilter } from '~/domains/Task'
import { Box, Flex, Space } from '@mantine/core'
import { useTaskActions } from '~/domains/Task/hooks/useTaskActions'

const TaskAdvancedView = () => {
  const { handleCreateTask } = useTaskActions()
  const [activeFilter, setActiveFilter] = useState('all')

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
  }

  return (
    <div>
      <Flex justify="center" flex={1}>
        <Box w={'1000%'}>
          <TaskSimpleForm onSubmit={handleCreateTask} />
          <TaskSimpleFilter
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </Box>
      </Flex>
      <Space h="md" />
      <Box>
        <TaskList activeFilter={activeFilter} />
      </Box>
    </div>
  )
}

export default TaskAdvancedView
