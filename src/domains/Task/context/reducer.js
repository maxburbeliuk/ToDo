import { TASK_CONTEXT_ACTIONS } from './__constants__'

const reducer = (state, action) => {
  switch (action.type) {
    case TASK_CONTEXT_ACTIONS.CREATE_TASK: {
      const newTask = {
        ...action.payload.task,
        done: false,
        isEdited: false,
        _create: new Date().toISOString(),
        _update: new Date().toISOString()
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
              isEdited: true
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
    // case TASK_CONTEXT_ACTIONS.UPDATE_TASK: {
    //   const updatedTask = action.payload.task
    //   const tasks = state.tasks.map((item) =>
    //     item.id === updatedTask.id ? updatedTask : item
    //   )
    //   return {
    //     ...state,
    //     tasks
    //   }
    // }

    case TASK_CONTEXT_ACTIONS.UPDATE_TASK: {
      const updatedAt = {
        ...action.payload.task,
        _updatedAt: new Date().toISOString(),
        _createdAt: new Date().toISOString()
      }

      const tasks = state.tasks.map((item) =>
        item.id === updatedAt.id ? updatedAt : item
      )

      return {
        ...state,
        tasks
      }
    }

    default: {
      throw new Error(`Invalid action type: ${action.type}`)
    }
  }
}
export default reducer
