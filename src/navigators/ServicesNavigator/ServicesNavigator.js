import { Routes, Route } from 'react-router-dom'
import SERVICES_ROUTES from './servicesRoutes'
const ServicesNavigator = () => {
  return (
    <Routes>
      {SERVICES_ROUTES.map(({ key, path, element }) => (
        <Route key={key} path={path} element={element} />
      ))}
    </Routes>
  )
}
export default ServicesNavigator
