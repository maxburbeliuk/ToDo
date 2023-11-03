import { Menu, ActionIcon, Checkbox } from '@mantine/core'
import {
  MENU_OPTIONS_SORT_BY,
  MENU_OPTIONS_SORT_TYPE
} from '~/domains/Task/components/__constants__'
import { toTitleCase } from '~/helpers'
import { IconSortDescendingLetters } from '@tabler/icons-react'
import { useState } from 'react'

const TaskSimpleMenu = () => {
  const [sortBy, setSortBy] = useState()
  const [sortType, setSortType] = useState()
  const onChangeSortBy = (selectedSortBy) => {
    setSortBy((prev) => {
      const transformed = Object.keys(prev).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      )
      return { ...transformed, [selectedSortBy]: true }
    })
  }
  const onChangeSortType = (selectedType) => {
    setSortType((prev) => {
      const transformed = Object.keys(prev).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      )
      return { ...transformed, [selectedType]: true }
    })
  }
  return (
    <Menu width={200} shadow="md">
      <Menu.Target>
        <ActionIcon variant="filled" aria-label="delete">
          <IconSortDescendingLetters size={18} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Sort by</Menu.Label>
        {Object.entries(MENU_OPTIONS_SORT_BY).map(([key, value]) => (
          <Menu.Item
            fw={500}
            key={key}
            value={key}
            closeMenuOnClick={false}
            onClick={() => onChangeSortBy(key)}
          >
            <Checkbox
              labelPosition="right"
              label={toTitleCase(value)}
              checked={sortBy[key]}
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
              checked={sortType[key]}
            />
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
export default TaskSimpleMenu
