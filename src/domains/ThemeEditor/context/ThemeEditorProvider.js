import React, { useEffect, useReducer } from 'react'
import themeEditorReducer from './reducer'
import {
  ThemeEditorContext,
  ThemeEditorDispatchContext
} from './ThemeEditorContext'
import { Loader } from '@mantine/core'
const ThemeEditorProvider = (props) => {
  const { children } = props

  const [state, dispatch] = useReducer(themeEditorReducer, {
    primary: []
  })
  console.log(state, dispatch)

  return (
    <ThemeEditorDispatchContext.Provider value={dispatch}>
      <ThemeEditorContext.Provider value={state}>
        {children}
      </ThemeEditorContext.Provider>
    </ThemeEditorDispatchContext.Provider>
  )
}
export default ThemeEditorProvider
