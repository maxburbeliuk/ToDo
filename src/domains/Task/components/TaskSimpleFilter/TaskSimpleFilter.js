import { Tabs } from '@mantine/core'
import filterStatus from '~/domains/Task/components/__constans__'
import { toTitleCase } from '~/helpers'
const TaskSimpleFilter = () => {
  const FilterStatus = Object.entries(filterStatus)
  return (
    <Tabs>
      <Tabs.List justify="flex-end">
        {FilterStatus.map(([key, value]) => (
          <Tabs.Tab fw={500} key={key} value={key}>
            {toTitleCase(value)}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  )
}

export default TaskSimpleFilter
