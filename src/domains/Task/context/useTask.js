import { useContext } from 'react'
import { TaskContext, TaskDispatchContext } from './TaskContext'

const useTaskContext = () => useContext(TaskContext)
const useTaskDispatchContext = () => useContext(TaskDispatchContext)

export { useTaskContext, useTaskDispatchContext }
