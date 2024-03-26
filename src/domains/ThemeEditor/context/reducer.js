import { THEME_EDITOR_CONTEXT_ACTIONS } from './__constants__'
import { generateColors } from '~/domains/ThemeEditor/helpers'

const reducer = (state, action) => {
  switch (action.type) {
    case THEME_EDITOR_CONTEXT_ACTIONS.CHANGE_PRIMARY_COLOR: {
      const { primary } = action.payload

      return {
        ...state,
        primaryColor: 'customPrimary',
        colors: {
          customPrimary: generateColors(primary)
        }
      }
    }

    default:
      break
  }
}
export default reducer
