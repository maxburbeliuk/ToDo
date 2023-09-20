import { Navigate } from 'react-router-dom'
import NotFound from '~/pages/Services/notFound/notFound'

const NOT_FOUND = '/404'
export const NOTFOUND_ROUTES = [
  { key: NOT_FOUND, path: NOT_FOUND, element: <NotFound /> },
  { key: '404', path: '*', element: <Navigate to={NOT_FOUND} /> }
]
