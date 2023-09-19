import { Route, Routes } from 'react-router-dom'
import { APP_ROUTES } from './appRoutes'

const AppNavigator = () => {
  return (
    <Routes>
      {APP_ROUTES.map(({ key, path, element }) => (
        <Route key={key} path={path} element={element} />
      ))}
    </Routes>
  )
}

export default AppNavigator
