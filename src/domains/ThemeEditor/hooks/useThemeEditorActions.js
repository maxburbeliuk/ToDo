import { useContext } from 'react'
import { ThemeEditorContext } from '~/domains/ThemeEditor/context'
import { THEME_EDITOR_CONTEXT_ACTIONS } from '~/domains/ThemeEditor/context/__constants__'
export default function useThemeEditorActions() {
  const themeEditorDicpatch = useContext(ThemeEditorContext)

  const handleChangeTheme = (primary) => {
    themeEditorDicpatch({
      type: THEME_EDITOR_CONTEXT_ACTIONS.CHANGE_THEME_COLOR,
      payload: { primary }
    })
  }
  return handleChangeTheme
}
