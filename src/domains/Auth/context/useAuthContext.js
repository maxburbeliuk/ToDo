import { useContext } from 'react'
import { AuthContext, AuthDispatchContext } from './AuthContext'

const useAuthContext = () => useContext(AuthContext)
const useAuthDispatchContext = () => useContext(AuthDispatchContext)

export { useAuthContext, useAuthDispatchContext }
