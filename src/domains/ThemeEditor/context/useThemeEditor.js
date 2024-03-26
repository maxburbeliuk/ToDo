import { useContext } from 'react'
import {
  ThemeEditorContext,
  ThemeEditorDispatchContext
} from './ThemeEditorContext'

const useThemeEditorContext = () => useContext(ThemeEditorContext)
const useThemeEditorDispatchContext = () =>
  useContext(ThemeEditorDispatchContext)

export { useThemeEditorContext, useThemeEditorDispatchContext }
