import { SegmentedControl } from '@mantine/core'
import { FILTER_TABS } from 'src/domains/Task/__constants__'
import { toTitleCase } from '~/helpers'
import { useContext } from 'react'
import { TaskDispatchContext, useTaskContext } from '~/domains/Task/context'
import { TASK_CONTEXT_ACTIONS } from '~/domains/Task/context/__constants__'
import { useSearchParams } from 'react-router-dom'

const TaskSimpleFilter = () => {
  const { filter } = useTaskContext()
  const taskDispatch = useContext(TaskDispatchContext)

  // eslint-disable-next-line no-unused-vars
  const [_, setSearchParams] = useSearchParams({ filter })
  const handleChangeFilter = (key) => {
    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.CHANGE_FILTER,
      payload: {
        filter: key
      }
    })
    setSearchParams((prev) => {
      prev.set('filter', key)

      return prev
    })
  }

  return (
    <SegmentedControl
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
