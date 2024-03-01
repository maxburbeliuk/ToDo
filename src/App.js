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
import { useState } from 'react'

const App = () => {
  const { _, setColor } = useState()
  const handleChangePrimaryColor = (color) => {
    setColor(color)
  }
  return (
    <BrowserRouter>
      <MantineProvider
        theme={{
          primary: setColor || 'default-color',
          colors: {
            'pale-violet': [
              '#F6EEFF',
              '#E7DAF7',
              '#CAB1EA',
              '#AD86DD',
              '#9562D2',
              '#854BCB',
              '#7D3EC9',
              '#6B31B2',
              '#5F2AA0',
              '#52228D'
            ]
          }
        }}
      >
        <ErrorBoundary>
          <ModalsProvider>
            <Notifications />
            <GDPR />
            <AuthProvider>
              <AppShell>
                <Routes>
                  <Route
                    path="/*"
                    element={
                      <AppNavigator
                        onChangePrimaryColor={handleChangePrimaryColor}
                      />
                    }
                  />
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
