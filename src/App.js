import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Button, ColorInput, MantineProvider } from '@mantine/core'
import { AppNavigator, AuthNavigator, ServicesNavigator } from '~/navigators'
import { AppShell } from '~/components'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { GDPR } from '~/components'
import React from 'react'
import ErrorBoundary from '~/contexts'
import { AuthProvider } from '~/domains/Auth/context'
import { useState } from 'react'
import { generateColors } from './domains/ThemeEditor/hooks'
import useThemeEditorActions from '~/domains/ThemeEditor/hooks/useThemeEditorActions'

const App = () => {
  const [theme, setTheme] = useState()

  const handleChangePrimaryColor = (color) => {
    const newTheme = handleChangeTheme(generateColors(color))
    setTheme(newTheme)
  }

  const handleChangeTheme = useThemeEditorActions()

  // console.log('theme', theme)
  return (
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <ErrorBoundary>
          <ModalsProvider>
            <Notifications />
            <GDPR />
            <AuthProvider>
              <AppShell>
                <ColorInput
                  variant="filled"
                  placeholder="Input placeholder"
                  w={180}
                  onChange={handleChangePrimaryColor}
                />
                <Routes>
                  <Route path="/*" element={<AppNavigator />} />
                  <Route path="auth/*" element={<AuthNavigator />} />
                  <Route path="services/*" element={<ServicesNavigator />} />
                </Routes>
              </AppShell>
            </AuthProvider>
          </ModalsProvider>
        </ErrorBoundary>
      </MantineProvider>
    </BrowserRouter>
  )
}
export default App
