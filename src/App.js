import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { AppNavigator, AuthNavigator, ServicesNavigator } from '~/navigators'
import { AppShell, NavLinks } from '~/components'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { GDPR } from '~/components'

const App = () => {
  return (
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
  )
}
export default App
