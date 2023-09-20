import { Routes, Route } from 'react-router-dom'
import { NOTFOUND_ROUTES } from './servicesRoutes'
const NotFoundRoutes = () => {
  return (
    <Routes>
      {NOTFOUND_ROUTES.map(({ key, path, element }) => (
        <Route key={key} path={path} element={element} />
      ))}
    </Routes>
  )
}
export default NotFoundRoutes
