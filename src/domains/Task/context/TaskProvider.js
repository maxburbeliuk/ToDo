import { useReducer } from 'react'
import { TaskContext, TaskDispatchContext } from './TaskContext'
import taskReducer from './reducer'
import { FILTER_TABS } from '~/domains/Task/components/__constants__'
const TaskProvider = (props) => {
  const { children } = props

  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    filter: FILTER_TABS.ALL
  })

  return (
    <TaskDispatchContext.Provider value={dispatch}>
      <TaskContext.Provider value={state}>{children}</TaskContext.Provider>
    </TaskDispatchContext.Provider>
  )
}
export default TaskProvider
