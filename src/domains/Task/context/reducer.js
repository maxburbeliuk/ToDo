import { TASK_CONTEXT_ACTIONS } from './__constants__'
import {
  MENU_OPTIONS_SORT_BY_FIELD,
  MENU_OPTIONS_SORT_TYPE
} from 'src/domains/Task/__constants__'
import { transformSortMenuData } from '~/domains/Task/helpers'

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
              ...item,
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

    case TASK_CONTEXT_ACTIONS.SORT_TASK_BY_TYPE: {
      const sortByType = action.payload.sortByType

      return {
        ...state,
        sortByType,
        menuOptionsSortByType: transformSortMenuData(
          MENU_OPTIONS_SORT_TYPE,
          sortByType
        )
      }
    }

    case TASK_CONTEXT_ACTIONS.SORT_TASK_BY_FIELD: {
      const sortByField = action.payload.sortByField

      return {
        ...state,
        sortByField,
        menuOptionsSortByField: transformSortMenuData(
          MENU_OPTIONS_SORT_BY_FIELD,
          sortByField
        )
      }
    }
    default: {
      throw new Error(`Invalid action type: ${action.type}`)
    }
  }
}
export default reducer
