import { Navigate } from 'react-router-dom'
import NotFound from '~/pages/Services/notFound/NotFound'
import { SERVICES_PATHS } from '~/__constants__'

const { NOT_FOUND } = SERVICES_PATHS
export const NOTFOUND_ROUTES = [
  { key: NOT_FOUND, path: NOT_FOUND, element: <NotFound /> },
  { key: '404', path: '*', element: <Navigate to={NOT_FOUND} /> }
]
