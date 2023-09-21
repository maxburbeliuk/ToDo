import { AUTH_PATHS, SERVICES_PATHS } from '~/__constants__'

import { Login } from '~/pages/Auth'
import { Navigate } from 'react-router-dom'

const { LOGIN } = AUTH_PATHS
const { NOT_FOUND } = SERVICES_PATHS
export const AUTH_ROUTES = [
  { key: LOGIN, path: LOGIN, element: <Login /> },
  {
    key: NOT_FOUND,
    path: '*',
    element: <Navigate to={`services${NOT_FOUND}`} />
  }
]

export default AUTH_ROUTES
