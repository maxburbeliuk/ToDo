import { APP_PATHS, ISE_PATHS, SERVICES_PATHS } from '~/__constants__'
import { TaskAll, TaskShow } from '~/pages/App'
import { Navigate } from 'react-router-dom'

const { TASKS_ALL, TASKS_SHOW } = APP_PATHS
const { NOT_FOUND } = SERVICES_PATHS
const { INTERNAL_SERVER_ERROR } = ISE_PATHS
export const APP_ROUTES = [
  { key: TASKS_ALL, path: TASKS_ALL, element: <TaskAll /> },
  { key: TASKS_SHOW, path: TASKS_SHOW, element: <TaskShow /> },
  {
    key: NOT_FOUND,
    path: '*',
    element: <Navigate to={`services${NOT_FOUND}`} />
  },
  {
    key: INTERNAL_SERVER_ERROR,
    path: '*',
    element: <Navigate to={`services${INTERNAL_SERVER_ERROR}`} />
  }
]
