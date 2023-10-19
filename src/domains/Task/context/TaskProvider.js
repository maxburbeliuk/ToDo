import { useReducer } from 'react'
import { TaskContext, TaskDispatchContext } from './TaskContext'
import taskReducer from './reducer'
const TaskProvider = (props) => {
  const { children } = props

  const [state, dispatch] = useReducer(taskReducer, { tasks: [] })

  return (
    <TaskDispatchContext.Provider value={dispatch}>
      <TaskContext.Provider value={state}>{children}</TaskContext.Provider>
    </TaskDispatchContext.Provider>
  )
}

export default TaskProvider
