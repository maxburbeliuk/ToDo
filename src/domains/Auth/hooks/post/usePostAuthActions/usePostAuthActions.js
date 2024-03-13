import { endpointsBuilder } from '~/helpers'
import { ENDPOINTS } from '~/__constants__'
import { api } from '~/services'
import { useAuthContext, useAuthDispatchContext } from '~/domains/Auth/context'
import { useStateWithStorage } from '~/hooks'
import { AUTH_ACTIONS } from '~/domains/Auth/context/__constants__'
import { useState } from 'react'

const usePostAuthActions = () => {
  const authDispatch = useAuthDispatchContext()

  const [loading, setLoading] = useState(false)
  /* State for active tab in AdvancedView with saving it to storage */
  const [token, setToken] = useStateWithStorage(null, 'token')

  const onLogin = async (values) => {
    const { email, password } = values
    const endpoint = endpointsBuilder(ENDPOINTS.LOGIN)

    setLoading(true)

    const { data: response } = await api.post(
      endpoint,
      { email, password },
      'Successfully login'
    )

    if (!response) {
      setLoading(false)
      return
    }

    const { user, ...tokens } = response

    authDispatch({
      type: AUTH_ACTIONS.SET_USER_WITH_TOKENS,
      payload: {
        user,
        tokens
      }
    })

    setToken(tokens.accessToken)

    setLoading(false)
  }

  const onSignUp = async (values) => {
    const { email, password } = values
    const endpoint = endpointsBuilder(ENDPOINTS.REGISTRATION)

    setLoading(true)

    const { data: response } = await api.post(
      endpoint,
      { email, password },
      'User was successfully created'
    )

    if (!response) {
      setLoading(false)
      return
    }

    const { user, ...tokens } = response

    authDispatch({
      type: AUTH_ACTIONS.SET_USER_WITH_TOKENS,
      payload: {
        user,
        tokens
      }
    })

    setToken(tokens.accessToken)

    setLoading(false)
  }

  const onForgotPassword = async (values) => {
    const { email } = values
    const endpoint = endpointsBuilder(ENDPOINTS.FORGOT_PASSWORD)

    const { data: user } = await api.post(endpoint, { email }, 'Email was send')

    if (!user) return
  }

  const onLogout = async () => {
    const endpoint = endpointsBuilder(ENDPOINTS.LOGOUT)

    const { data: user } = await api.post(endpoint, undefined, 'Email was send')

    if (!user) return

    authDispatch({
      type: AUTH_ACTIONS.SET_USER_WITH_TOKENS,
      payload: {
        user: null,
        tokens: null
      }
    })

    setToken(null)
  }

  return { onLogin, onSignUp, onForgotPassword, onLogout, loading, token }
}

export default usePostAuthActions
