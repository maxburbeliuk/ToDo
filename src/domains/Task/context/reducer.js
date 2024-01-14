import { TASK_CONTEXT_ACTIONS } from './__constants__'
import {
  MENU_OPTIONS_SORT_BY_FIELD,
  MENU_OPTIONS_SORT_TYPE
} from 'src/domains/Task/__constants__'
import { transformSortMenuData } from '~/domains/Task/helpers'

const reducer = (state, action) => {
  switch (action.type) {
    case TASK_CONTEXT_ACTIONS.CREATE_TASK: {
      const task = action.payload.task
      return {
        task,
        ...state,
        tasks: [...state.tasks, task]
      }
    }
    case TASK_CONTEXT_ACTIONS.DELETE_TASK: {
      const task = action.payload.task
      const tasks = state.tasks.filter((item) => item._id !== task._id)
      return {
        ...state,
        tasks: tasks
      }
    }

    case TASK_CONTEXT_ACTIONS.EDIT_OR_CHANGE: {
      const task = action.payload

      const updatedTasks = state.tasks.map((item) =>
        item._id === task._id
          ? {
              ...task
            }
          : item
      )

      return {
        ...state,
        tasks: updatedTasks
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

    case TASK_CONTEXT_ACTIONS.SET_TASKS: {
      return {
        ...state,
        tasks: action.payload.tasks
      }
    }
    default: {
      throw new Error(`Invalid action type: ${action.type}`)
    }
  }
}
export default reducer
