import React from 'react'
import { Route, Routes } from 'react-router-dom'
import APP_ROUTES from './appRoutes'
import { TaskProvider } from '~/domains/Task/context'

const AppNavigator = ({ onChangePrimaryColor }) => {
  return (
    <TaskProvider onChangePrimaryColor={onChangePrimaryColor}>
      <Routes>
        {APP_ROUTES.map(({ key, path, element }) => (
          <Route key={key} path={path} element={element} />
        ))}
      </Routes>
    </TaskProvider>
  )
}

export default AppNavigator
