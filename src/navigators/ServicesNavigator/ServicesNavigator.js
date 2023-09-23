import { Routes, Route } from 'react-router-dom'
import SERVICES_ROUTES from './servicesRoutes'
const ServicesRoutes = () => {
  return (
    <Routes>
      {SERVICES_ROUTES.map(({ key, path, element }) => (
        <Route key={key} path={path} element={element} />
      ))}
    </Routes>
  )
}
export default ServicesRoutes
