import { useReducer } from 'react'
import { TaskContext, TaskDispatchContext } from './TaskContext'
import taskReducer from './reducer'
import { FILTER_TABS } from 'src/domains/Task/__constants__'
import { transformSortMenuData } from '~/domains/Task/helpers'
import {
  MENU_OPTIONS_SORT_BY_FIELD,
  MENU_OPTIONS_SORT_TYPE
} from 'src/domains/Task/__constants__'
import { useSearchParams } from 'react-router-dom'

const TaskProvider = (props) => {
  const { children } = props
  const [searchParams] = useSearchParams({
    filter: FILTER_TABS.ALL,
    sortByField: MENU_OPTIONS_SORT_BY_FIELD.CREATE,
    sortByType: MENU_OPTIONS_SORT_TYPE.ASC
  })

  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    filter: searchParams.get('filter'),
    menuOptionsSortByField: transformSortMenuData(
      MENU_OPTIONS_SORT_BY_FIELD,
      searchParams.get('sortByField')
    ),
    menuOptionsSortByType: transformSortMenuData(
      MENU_OPTIONS_SORT_TYPE,
      searchParams.get('sortByType')
    ),
    sortByField: searchParams.get('sortByField'),
    sortByType: searchParams.get('sortByType')
  })

  return (
    <TaskDispatchContext.Provider value={dispatch}>
      <TaskContext.Provider value={state}>{children}</TaskContext.Provider>
    </TaskDispatchContext.Provider>
  )
}
export default TaskProvider
