import { useContext } from 'react'
import { TaskDispatchContext, useTaskContext } from '~/domains/Task/context'
import * as TASK_CONTEXT_ACTIONS from '~/domains/Task/context/__constants__/taskActions'
import { useSearchParams } from 'react-router-dom'

const useSortMenuActions = () => {
  const taskDispatch = useContext(TaskDispatchContext)
  const { sortByField, sortByType } = useTaskContext()

  // eslint-disable-next-line no-unused-vars
  const [_, setSearchParams] = useSearchParams({ sortByField, sortByType })

  const onChangeSortByField = (selectedField) => {
    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.SORT_TASK_BY_FIELD,
      payload: {
        sortByField: selectedField
      }
    })

    setSearchParams((prev) => {
      prev.set('sortByField', selectedField)

      return prev
    })
  }
  const onChangeSortType = (selectedType) => {
    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.SORT_TASK_BY_TYPE,
      payload: {
        sortByType: selectedType
      }
    })

    setSearchParams((prev) => {
      prev.set('sortByType', selectedType)

      return prev
    })
  }

  return { onChangeSortByField, onChangeSortType }
}

export default useSortMenuActions
