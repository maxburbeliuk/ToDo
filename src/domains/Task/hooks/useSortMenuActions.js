import { useContext } from 'react'
import { TaskDispatchContext } from '~/domains/Task/context'
import * as TASK_CONTEXT_ACTIONS from '~/domains/Task/context/__constants__/taskActions'

const useSortMenuActions = () => {
  const taskDispatch = useContext(TaskDispatchContext)
  const onChangeSortByField = (selectedField) => {
    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.SORT_TASK_BY_FIELD,
      payload: {
        sortByField: selectedField
      }
    })
  }
  const onChangeSortType = (selectedType) => {
    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.SORT_TASK_BY_TYPE,
      payload: {
        sortByType: selectedType
      }
    })
  }

  return { onChangeSortByField, onChangeSortType }
}

export default useSortMenuActions
