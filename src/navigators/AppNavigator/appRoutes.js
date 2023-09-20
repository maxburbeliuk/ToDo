import { APP_PATHS } from '~/__constants__'
import { TaskAll, TaskShow } from '~/pages/App'

const { TASKS_ALL, TASKS_SHOW } = APP_PATHS
export const APP_ROUTES = [
  { key: TASKS_ALL, path: TASKS_ALL, element: <TaskAll /> },
  { key: TASKS_SHOW, path: TASKS_SHOW, element: <TaskShow /> }
]
