import { Tabs } from '@mantine/core'
import FILTER_TABS from '~/domains/Task/components/__constans__'
import { toTitleCase } from '~/helpers'
import { useContext } from 'react'
import { TaskDispatchContext, useTaskContext } from '~/domains/Task/context'
import { TASK_CONTEXT_ACTIONS } from '~/domains/Task/context/__constants__'

const TaskSimpleFilter = () => {
  const { filter } = useTaskContext()
  const taskDispatch = useContext(TaskDispatchContext)
  const handleChangeFilter = (key) => {
    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.SET_FILTER,
      payload: {
        filter: key
      }
    })
  }

  return (
    <Tabs value={filter} onChange={handleChangeFilter}>
      <Tabs.List justify="flex-end">
        {Object.entries(FILTER_TABS).map(([key, value]) => (
          <Tabs.Tab fw={500} key={key} value={key}>
            {toTitleCase(value)}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  )
}

export default TaskSimpleFilter
