import { Navigate } from 'react-router-dom'
import { InternalServerError, NotFound } from '~/pages/Services'
import { SERVICES_PATHS } from '~/__constants__'

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = SERVICES_PATHS
export const SERVICES_ROUTES = [
  { key: NOT_FOUND, path: NOT_FOUND, element: <NotFound /> },
  { key: '404', path: '*', element: <Navigate to={NOT_FOUND} /> },
  {
    key: INTERNAL_SERVER_ERROR,
    path: INTERNAL_SERVER_ERROR,
    element: <InternalServerError />
  }
]

export default SERVICES_ROUTES
