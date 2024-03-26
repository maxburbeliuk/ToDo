import { APP_PATHS, SERVICES_PATHS } from '~/__constants__'
import { TaskAll, TaskShow, TaskEdit, ThemeEditor } from '~/pages/App'

import { Navigate } from 'react-router-dom'

const { TASKS_ALL, TASKS_SHOW, TASK_EDIT, THEME_EDITOR } = APP_PATHS
const { NOT_FOUND } = SERVICES_PATHS
export const APP_ROUTES = [
  { key: TASKS_ALL, path: TASKS_ALL, element: <TaskAll /> },
  { key: TASKS_SHOW, path: TASKS_SHOW, element: <TaskShow /> },
  { key: TASK_EDIT, path: TASK_EDIT, element: <TaskEdit /> },
  { key: THEME_EDITOR, path: THEME_EDITOR, element: <ThemeEditor /> },
  {
    key: NOT_FOUND,
    path: '*',
    element: <Navigate to={`services${NOT_FOUND}`} />
  }
]

export default APP_ROUTES
