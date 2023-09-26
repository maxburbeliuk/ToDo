import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppNavigator, AuthNavigator, ServicesNavigator } from '~/navigators'
import { MantineProvider } from '@mantine/core'
import { AppShell } from '~/components'

const App = () => {
  return (
    <BrowserRouter>
      <MantineProvider>
        <AppShell>
          <Routes>
            <Route path="/*" element={<AppNavigator />} />
            <Route path="auth/*" element={<AuthNavigator />} />
            <Route path="services/*" element={<ServicesNavigator />} />
          </Routes>
        </AppShell>
      </MantineProvider>
    </BrowserRouter>
  )
}
export default App
