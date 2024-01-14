import { AUTH_PATHS, SERVICES_PATHS } from '~/__constants__'

import { ForgotPassword, Login, SignUp } from '~/pages/Auth'
import { Navigate } from 'react-router-dom'

const { LOGIN, SIGN_UP, FORGOT_PASSWORD } = AUTH_PATHS
const { NOT_FOUND } = SERVICES_PATHS
const AUTH_ROUTES = [
  { key: LOGIN, path: LOGIN, element: <Login /> },
  { key: SIGN_UP, path: SIGN_UP, element: <SignUp /> },
  { key: FORGOT_PASSWORD, path: FORGOT_PASSWORD, element: <ForgotPassword /> },
  {
    key: NOT_FOUND,
    path: '*',
    element: <Navigate to={`services${NOT_FOUND}`} />
  }
]

export default AUTH_ROUTES
