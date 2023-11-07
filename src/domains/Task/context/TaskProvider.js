import { useReducer } from 'react'
import { TaskContext, TaskDispatchContext } from './TaskContext'
import taskReducer from './reducer'
import { FILTER_TABS } from '~/domains/Task/components/__constants__'
import { transformSortMenuData } from '~/domains/Task/helpers'
import {
  MENU_OPTIONS_SORT_BY_FIELD,
  MENU_OPTIONS_SORT_TYPE
} from '~/domains/Task/components/__constants__'

const TaskProvider = (props) => {
  const { children } = props

  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    filter: FILTER_TABS.ALL,
    menuOptionsSortByField: transformSortMenuData(
      MENU_OPTIONS_SORT_BY_FIELD,
      MENU_OPTIONS_SORT_BY_FIELD.CREATE
    ),
    menuOptionsSortByType: transformSortMenuData(
      MENU_OPTIONS_SORT_TYPE,
      MENU_OPTIONS_SORT_TYPE.ASC
    ),
    sortByField: MENU_OPTIONS_SORT_BY_FIELD.CREATE,
    sortByType: MENU_OPTIONS_SORT_TYPE.ASC
  })

  return (
    <TaskDispatchContext.Provider value={dispatch}>
      <TaskContext.Provider value={state}>{children}</TaskContext.Provider>
    </TaskDispatchContext.Provider>
  )
}
export default TaskProvider
