import { TASK_CONTEXT_ACTIONS } from './__constants__'

const reducer = (state, action) => {
  switch (action.type) {
    case TASK_CONTEXT_ACTIONS.CREATE_TASK: {
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task]
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
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export default reducer
