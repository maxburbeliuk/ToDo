import { useTaskContext } from '~/domains/Task/context'
import { FILTER_TABS } from '~/domains/Task/components/__constants__'
import { useMemo } from 'react'
import {
  MENU_OPTIONS_SORT_BY_FIELD,
  MENU_OPTIONS_SORT_TYPE
} from '~/domains/Task/components/__constants__'
const FILTER_TASKS_BY_DONE = {
  [FILTER_TABS.ALL]: (tasks) => tasks,
  [FILTER_TABS.DONE]: (tasks) => tasks.filter((task) => !!task?.done),
  [FILTER_TABS.TO_DO]: (tasks) => tasks.filter((task) => !task?.done)
}

const SORT_FILED = {
  [MENU_OPTIONS_SORT_BY_FIELD.CREATE]: '_createdAt',
  [MENU_OPTIONS_SORT_BY_FIELD.UPDATE]: '_updatedAt'
}

const SORT_TYPE = {
  [MENU_OPTIONS_SORT_TYPE.ASC]: (
    sortFieldInFirstParam,
    sortSecondInSecondParam
  ) => -sortSecondInSecondParam.localeCompare(sortFieldInFirstParam),
  [MENU_OPTIONS_SORT_TYPE.DESC]: (
    sortFieldInFirstParam,
    sortSecondInSecondParam
  ) => sortSecondInSecondParam.localeCompare(sortFieldInFirstParam)
}

const useFilterAndSortTask = () => {
  const { tasks, filter, sortByField, sortByType } = useTaskContext()

  const computedTasks = useMemo(() => {
    const filteredTypes = FILTER_TASKS_BY_DONE[filter]
    const filteredTasks = filteredTypes(tasks)

    const sortField = SORT_FILED[sortByField]

    filteredTasks.sort((firstParam, secondParam) => {
      const sortType = SORT_TYPE[sortByType]

      const sortFieldInFirstParam = firstParam[sortField]
      const sortSecondInSecondParam = secondParam[sortField]

      return sortType(sortFieldInFirstParam, sortSecondInSecondParam)
    })

    return filteredTasks
  }, [tasks, filter, sortByType, sortByField])

  return { computedTasks }
}

export default useFilterAndSortTask
