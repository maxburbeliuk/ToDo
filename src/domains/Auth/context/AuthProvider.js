import React, { useEffect, useReducer } from 'react'
import { AuthContext, AuthDispatchContext } from './AuthContext'
import authReducer from './reducer'
import { Loader } from '@mantine/core'
import { useStateWithStorage } from '~/hooks'
import { endpointsBuilder } from '~/helpers'
import { ENDPOINTS } from '~/__constants__'
import { api } from '~/services'
import { AUTH_ACTIONS } from '~/domains/Auth/context/__constants__'

const checkAuth = async ({ authDispatch, setToken, token }) => {
  const endpoint = endpointsBuilder(ENDPOINTS.REFRESH)

  authDispatch({
    type: AUTH_ACTIONS.SET_LOADING,
    payload: {
      loading: true
    }
  })

  const { data: response } = await api.get(endpoint)

  if (!response) {
    authDispatch({
      type: AUTH_ACTIONS.SET_LOADING,
      payload: {
        loading: false
      }
    })
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

  authDispatch({
    type: AUTH_ACTIONS.SET_LOADING,
    payload: {
      loading: false
    }
  })
}

const TaskProvider = (props) => {
  const { children } = props

  /* State for active tab in AdvancedView with saving it to storage */
  const [token, setToken] = useStateWithStorage(null, 'token')

  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    tokens: null,
    isLoading: false,
    error: null
  })

  const setLoading = (loading) =>
    dispatch({
      type: AUTH_ACTIONS.SET_LOADING,
      payload: {
        loading
      }
    })

  useEffect(() => {
    if (token) {
      checkAuth({ authDispatch: dispatch, setToken, token })
    }
  }, [token])

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthContext.Provider value={{ ...state, setLoading }}>
        {state.isLoading ? <Loader color="blue" size={30} /> : children}
      </AuthContext.Provider>
    </AuthDispatchContext.Provider>
  )
}
export default TaskProvider
