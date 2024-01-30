import { AUTH_ACTIONS } from './__constants__'

const reducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_USER_WITH_TOKENS: {
      const user = action.payload.user
      const { accessToken, refreshToken } = action.payload.tokens

      return {
        ...state,
        user,
        accessToken,
        refreshToken
      }
    }

    case AUTH_ACTIONS.SET_LOADING: {
      const loading = action.payload.loading

      return {
        ...state,
        isLoading: loading
      }
    }

    case AUTH_ACTIONS.SET_TOKENS: {
      const { accessToken, refreshToken } = action.payload.tokens

      return {
        ...state,
        accessToken,
        refreshToken
      }
    }

    default: {
      throw new Error(`Invalid action type: ${action.type}`)
    }
  }
}
export default reducer
