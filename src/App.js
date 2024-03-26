import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { AppNavigator, AuthNavigator, ServicesNavigator } from '~/navigators'
import { AppShell } from '~/components'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { GDPR } from '~/components'
import React from 'react'
import ErrorBoundary from '~/contexts'
import { AuthProvider } from '~/domains/Auth/context'
import { ThemeEditorProvider } from '~/domains/ThemeEditor/context'

const App = () => {
  return (
    <BrowserRouter>
      <ThemeEditorProvider>
        <ErrorBoundary>
          <ModalsProvider>
            <Notifications />
            <GDPR />
            <AuthProvider>
              <AppShell>
                <Routes>
                  <Route path="/*" element={<AppNavigator />} />
                  <Route path="auth/*" element={<AuthNavigator />} />
                  <Route path="services/*" element={<ServicesNavigator />} />
                </Routes>
              </AppShell>
            </AuthProvider>
          </ModalsProvider>
        </ErrorBoundary>
      </ThemeEditorProvider>
    </BrowserRouter>
  )
}
export default App
