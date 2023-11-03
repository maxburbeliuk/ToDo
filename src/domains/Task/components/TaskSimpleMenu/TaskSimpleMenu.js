import { Menu, ActionIcon, Checkbox } from '@mantine/core'
import {
  MENU_OPTIONS_SORT_BY_FIELD,
  MENU_OPTIONS_SORT_TYPE
} from 'src/domains/Task/__constants__'
import { toTitleCase } from '~/helpers'
import { IconSortDescendingLetters } from '@tabler/icons-react'
import { useSortMenuActions } from '~/domains/Task/hooks'
import { useTaskContext } from '~/domains/Task/context'

const TaskSimpleMenu = () => {
  const { menuOptionsSortByField, menuOptionsSortByType } = useTaskContext()
  const { onChangeSortByField, onChangeSortType } = useSortMenuActions()

  return (
    <Menu width={200} shadow="md">
      <Menu.Target>
        <ActionIcon variant="filled" aria-label="delete">
          <IconSortDescendingLetters size={18} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Sort by</Menu.Label>
        {Object.entries(MENU_OPTIONS_SORT_BY_FIELD).map(([key, value]) => (
          <Menu.Item
            fw={500}
            key={key}
            value={key}
            closeMenuOnClick={false}
            onClick={() => onChangeSortByField(key)}
          >
            <Checkbox
              labelPosition="right"
              label={toTitleCase(value)}
              checked={menuOptionsSortByField?.[key]}
            />
          </Menu.Item>
        ))}
        <Menu.Divider />
        <Menu.Label>Sort type</Menu.Label>
        {Object.entries(MENU_OPTIONS_SORT_TYPE).map(([key, value]) => (
          <Menu.Item
            fw={500}
            key={key}
            value={key}
            closeMenuOnClick={false}
            onClick={() => onChangeSortType(key)}
          >
            <Checkbox
              labelPosition="right"
              label={toTitleCase(value)}
              checked={menuOptionsSortByType?.[key]}
            />
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
export default TaskSimpleMenu
