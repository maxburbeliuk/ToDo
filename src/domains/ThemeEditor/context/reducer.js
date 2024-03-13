import { THEME_EDITOR_CONTEXT_ACTIONS } from './__constants__'
const reducer = (state, action) => {
  switch (action.type) {
    case THEME_EDITOR_CONTEXT_ACTIONS.CHANGE_THEME_COLOR: {
      const { primary } = action.payload.primary
      console.log(primary)
      return {
        ...state,
        primary: primary
      }
    }
  }
}
export default reducer
