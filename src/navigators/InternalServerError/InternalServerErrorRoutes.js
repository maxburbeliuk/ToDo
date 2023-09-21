import { Navigate } from 'react-router-dom'
import { InternalServerError } from '~/pages/Services/InternalServerError'
import { ISE_PATHS } from '~/__constants__'

const { INTERNAL_SERVER_ERROR } = ISE_PATHS
export const ISE_ROUTES = [
  {
    key: INTERNAL_SERVER_ERROR,
    path: INTERNAL_SERVER_ERROR,
    element: <InternalServerError />
  },
  {
    key: '505',
    path: '*',
    element: <Navigate to={`services${INTERNAL_SERVER_ERROR}`} />
  }
]

export default ISE_ROUTES
