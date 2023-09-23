import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppNavigator, AuthNavigator, ServicesNavigator } from '~/navigators'
import { MantineProvider } from '@mantine/core'

const App = () => {
  return (
    <BrowserRouter>
      <MantineProvider>
        <Routes>
          <Route path="/*" element={<AppNavigator />} />
          <Route path="auth/*" element={<AuthNavigator />} />
          <Route path="services/*" element={<ServicesNavigator />} />
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  )
}
export default App
