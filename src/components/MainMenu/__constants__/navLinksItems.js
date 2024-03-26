import { IconHome, IconList, IconArrowBack } from '@tabler/icons-react'
import { APP_PATHS, AUTH_PATHS } from '~/__constants__'

const NAV_LINKS_ITEMS = [
  {
    icon: <IconHome size="1rem" stroke={1.5} />,
    label: 'Theme editor',
    path: APP_PATHS.THEME_EDITOR
  },
  {
    icon: <IconList size="1rem" stroke={1.5} />,
    label: 'Tasks',
    path: APP_PATHS.TASKS_ALL
  },
  {
    icon: <IconArrowBack size="1rem" stroke={1.5} />,
    label: 'Back to login',
    path: AUTH_PATHS.LOGIN
  }
]
export default NAV_LINKS_ITEMS
