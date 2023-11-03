import { TASK_CONTEXT_ACTIONS } from './__constants__'
import { useState } from 'react'
import {
  MENU_OPTIONS_SORT_BY,
  MENU_OPTIONS_SORT_TYPE
} from '~/domains/Task/components/__constants__'

const reducer = (state, action) => {
  switch (action.type) {
    case TASK_CONTEXT_ACTIONS.CREATE_TASK: {
      const newTask = {
        ...action.payload.task,
        done: false,
        isEdited: false,
        _updatedAt: new Date().toISOString(),
        _createdAt: new Date().toISOString()
      }

      return {
        ...state,
        tasks: [...state.tasks, newTask]
      }
    }
    case TASK_CONTEXT_ACTIONS.DELETE_TASK: {
      const task = action.payload.task
      const tasks = state.tasks.filter((item) => item.id !== task.id)
      return {
        ...state,
        tasks: tasks
      }
    }
    case TASK_CONTEXT_ACTIONS.EDIT_TASK: {
      const task = action.payload.task
      const tasks = state.tasks.map((item) =>
        item.id === task.id
          ? {
              ...task,
              isEdited: true,
              _updatedAt: new Date().toISOString()
            }
          : item
      )
      return {
        ...state,
        tasks: tasks
      }
    }
    case TASK_CONTEXT_ACTIONS.CHANGE_DONE: {
      const { id, done } = action.payload.task
      const tasks = state.tasks.map((item) =>
        item.id === id
          ? {
              ...item,
              done
            }
          : item
      )
      return {
        ...state,
        tasks: tasks
      }
    }

    case TASK_CONTEXT_ACTIONS.CHANGE_FILTER: {
      const filter = action.payload.filter

      return {
        ...state,
        filter
      }
    }

    // {
    //   ...Object.keys(MENU_OPTIONS_SORT_BY).reduce(
    //     (acc, key) => ({ ...acc, [key]: false }),
    //     {}
    //   ),
    //   [MENU_OPTIONS_SORT_BY.CREATE]: true
    // }
    case TASK_CONTEXT_ACTIONS.SORT_TASK: {
      const sortBy = action.payload.task
      const sortTask = {
        ...Object.keys(MENU_OPTIONS_SORT_TYPE).reduce(
          (acc, key) => ({ ...acc, [key]: false }),
          {}
        ),
        [MENU_OPTIONS_SORT_TYPE.ASC]: true
      }
      return { sortBy, sortTask }
      console.log(TASK_CONTEXT_ACTIONS.SORT_TASK)
    }
    default: {
      throw new Error(`Invalid action type: ${action.type}`)
    }
  }
}
export default reducer
