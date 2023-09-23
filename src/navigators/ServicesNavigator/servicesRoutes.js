import { Navigate } from 'react-router-dom'
import { NotFound, InternalServerError } from '~/pages/Services'
import { SERVICES_PATHS, ISE_PATHS } from '~/__constants__'

const { NOT_FOUND } = SERVICES_PATHS
const { INTERNAL_SERVER_ERROR } = ISE_PATHS

const SERVICES_ROUTES = [
  { key: NOT_FOUND, path: NOT_FOUND, element: <NotFound /> },
  { key: '404', path: '*', element: <Navigate to={NOT_FOUND} /> },
  {
    key: INTERNAL_SERVER_ERROR,
    path: INTERNAL_SERVER_ERROR,
    element: <InternalServerError />
  }
]
export default SERVICES_ROUTES
