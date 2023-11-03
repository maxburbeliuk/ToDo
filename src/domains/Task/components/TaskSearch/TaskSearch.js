import { rem, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useDebouncedValue } from '@mantine/hooks'

const TaskSearch = (props) => {
  const { onChange } = props

  const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />

  const [value, setValue] = useState('')
  const [debounced] = useDebouncedValue(value, 1000)

  useEffect(() => {
    onChange?.(debounced)
  }, [debounced])

  return (
    <TextInput
      rightSectionPointerEvents="none"
      rightSection={icon}
      placeholder="Your text"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  )
}

export default TaskSearch
