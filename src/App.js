import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { AppNavigator, AuthNavigator, ServicesNavigator } from '~/navigators'
import { AppShell } from '~/components'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { GDPR } from '~/components'
import React from 'react'
import ErrorBoundary from '~/contexts'

const Dasa = () => {
  throw new Error('dasa')
}

const App = () => {
  return (
    <ErrorBoundary>
      <Dasa />
      <BrowserRouter>
        <MantineProvider defaultColorScheme="dark">
          <ModalsProvider>
            <Notifications />
            <GDPR />
            <AppShell>
              <Routes>
                <Route path="/*" element={<AppNavigator />} />
                <Route path="auth/*" element={<AuthNavigator />} />
                <Route path="services/*" element={<ServicesNavigator />} />
              </Routes>
            </AppShell>
          </ModalsProvider>
        </MantineProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
export default App
