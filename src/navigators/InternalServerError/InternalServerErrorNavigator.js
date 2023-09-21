import { Routes, Route } from 'react-router-dom'
import { ISE_ROUTES } from './InternalServerErrorRoutes'
const ISERoutes = () => {
  return (
    <Routes>
      {ISE_ROUTES.map(({ key, path, element }) => (
        <Route key={key} path={path} element={element} />
      ))}
    </Routes>
  )
}
export default ISERoutes
