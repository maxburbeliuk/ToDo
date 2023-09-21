import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppNavigator from '~/navigators/AppNavigator'
import AuthNavigator from '~/navigators/AuthNavigator'
import { MantineProvider } from '@mantine/core'
import ServicesNavigator from '~/navigators/ServicesNavigator'
import ISERoutes from '~/navigators/InternalServerError'

const App = () => {
  return (
    <BrowserRouter>
      <MantineProvider>
        <Routes>
          <Route path="/*" element={<AppNavigator />} />
          <Route path="auth/*" element={<AuthNavigator />} />
          <Route path="services/*" element={<ServicesNavigator />} />
          <Route path="notfound/*" element={<ISERoutes />} />
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  )
}
export default App
