import { SegmentedControl } from '@mantine/core'
import { FILTER_TABS } from '~/domains/Task/components/__constants__'
import { toTitleCase } from '~/helpers'
import { useContext } from 'react'
import { TaskDispatchContext, useTaskContext } from '~/domains/Task/context'
import { TASK_CONTEXT_ACTIONS } from '~/domains/Task/context/__constants__'

const TaskSimpleFilter = () => {
  const { filter } = useTaskContext()
  const taskDispatch = useContext(TaskDispatchContext)
  const handleChangeFilter = (key) => {
    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.CHANGE_FILTER,
      payload: {
        filter: key
      }
    })
  }

  return (
    <SegmentedControl
      color="blue"
      value={filter}
      onChange={handleChangeFilter}
      data={Object.values(FILTER_TABS).map((param) => ({
        label: toTitleCase(param),
        value: param
      }))}
    />
  )
}
export default TaskSimpleFilter
