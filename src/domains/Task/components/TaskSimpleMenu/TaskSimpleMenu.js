import { Menu, ActionIcon, Checkbox, Flex } from '@mantine/core'
import {
  MENU_OPTIONS_SORT_BY,
  MENU_OPTIONS_SORT_TYPE
} from '~/domains/Task/components/__constants__'
import { toTitleCase } from '~/helpers'
import { IconSortDescendingLetters } from '@tabler/icons-react'

const TaskSimpleMenu = () => {
  return (
    <Menu shadow="md" width={200} justify="">
      <Menu.Target>
        <ActionIcon variant="filled" aria-label="delete">
          <IconSortDescendingLetters size={18} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>
          Sort by
          {Object.entries(MENU_OPTIONS_SORT_BY).map(([key, value]) => (
            <Menu.Item fw={500} key={key} value={key}>
              <Checkbox labelPosition="right" label={toTitleCase(value)} />
            </Menu.Item>
          ))}
        </Menu.Label>
        <Menu.Label>
          Sort type
          {Object.entries(MENU_OPTIONS_SORT_TYPE).map(([key, value]) => (
            <Menu.Item fw={500} key={key} value={key}>
              <Checkbox labelPosition="right" label={toTitleCase(value)} />
            </Menu.Item>
          ))}
        </Menu.Label>
      </Menu.Dropdown>
    </Menu>
  )
}
export default TaskSimpleMenu
