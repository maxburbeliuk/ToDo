import React from 'react'
import { Route, Routes } from 'react-router-dom'
import APP_ROUTES from './appRoutes'
import { TaskProvider } from '~/domains/Task/context'
import { ThemeEditorProvider } from '~/domains/ThemeEditor/context'

const AppNavigator = () => {
  return (
    <ThemeEditorProvider>
      <TaskProvider>
        <Routes>
          {APP_ROUTES.map(({ key, path, element }) => (
            <Route key={key} path={path} element={element} />
          ))}
        </Routes>
      </TaskProvider>
    </ThemeEditorProvider>
  )
}

export default AppNavigator
