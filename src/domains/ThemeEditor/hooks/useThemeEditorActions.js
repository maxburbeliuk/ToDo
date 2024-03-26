import { THEME_EDITOR_CONTEXT_ACTIONS } from '~/domains/ThemeEditor/context/__constants__'
import { useThemeEditorDispatchContext } from '~/domains/ThemeEditor/context/useThemeEditor'
const useThemeEditorActions = () => {
  const themeEditorDispatch = useThemeEditorDispatchContext()

  const handleChangePrimaryColor = (primary) => {
    themeEditorDispatch({
      type: THEME_EDITOR_CONTEXT_ACTIONS.CHANGE_PRIMARY_COLOR,
      payload: { primary }
    })
  }

  return { handleChangePrimaryColor }
}

export default useThemeEditorActions
