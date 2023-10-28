import { useContext } from 'react'
import {
  TaskContext,
  TaskDispatchContext,
  TaskFilterContext
} from './TaskContext'

const useTaskContext = () => useContext(TaskContext)
const useTaskDispatchContext = () => useContext(TaskDispatchContext)
const useTaskFilter = () => useContext(TaskFilterContext)

export { useTaskContext, useTaskDispatchContext, useTaskFilter }
