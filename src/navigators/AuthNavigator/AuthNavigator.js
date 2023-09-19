import { Route, Routes } from 'react-router-dom'
import { AUTH_ROUTES } from './authRoutes'

const AuthNavigator = () => {
  return (
    <Routes>
      {AUTH_ROUTES.map(({ key, path, element }) => (
        <Route key={key} path={path} element={element} />
      ))}
    </Routes>
  )
}

export default AuthNavigator
