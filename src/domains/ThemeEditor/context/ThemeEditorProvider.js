import React, { useMemo, useReducer } from 'react'
import themeEditorReducer from './reducer'
import {
  ThemeEditorContext,
  ThemeEditorDispatchContext
} from './ThemeEditorContext'
import { createTheme, MantineProvider } from '@mantine/core'
const ThemeEditorProvider = (props) => {
  const { children } = props

  const [state, dispatch] = useReducer(themeEditorReducer, {
    primary: []
  })

  const theme = useMemo(() => createTheme(state), [state])
  return (
    <ThemeEditorDispatchContext.Provider value={dispatch}>
      <ThemeEditorContext.Provider value={state}>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          {children}
        </MantineProvider>
      </ThemeEditorContext.Provider>
    </ThemeEditorDispatchContext.Provider>
  )
}
export default ThemeEditorProvider
