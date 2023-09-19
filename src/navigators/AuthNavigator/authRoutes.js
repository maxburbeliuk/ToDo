import { AUTH_PATHS } from '~/__constants__'

import { Login } from '~/pages/Auth'

const { LOGIN } = AUTH_PATHS

export const AUTH_ROUTES = [{ key: LOGIN, path: LOGIN, element: <Login /> }]

export default AUTH_ROUTES
