import { Tabs } from '@mantine/core'
import FILTER_TABS from '~/domains/Task/components/__constans__'
import { toTitleCase } from '~/helpers'
const TaskSimpleFilter = () => {
  const filterStatus = Object.entries(FILTER_TABS)
  return (
    <Tabs>
      <Tabs.List justify="flex-end">
        {filterStatus.map(([key, value]) => (
          <Tabs.Tab fw={500} key={key} value={key}>
            {toTitleCase(value)}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  )
}

export default TaskSimpleFilter
