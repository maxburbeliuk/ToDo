import { rem, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useDebouncedValue } from '@mantine/hooks'
import { useSearchParams } from 'react-router-dom'

const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />

const TaskSearch = (props) => {
  const { onChange } = props

  const [searchParams, setSearchParams] = useSearchParams({ searchQuery: '' })

  const [value, setValue] = useState(searchParams.get('searchQuery'))
  const [debounced] = useDebouncedValue(value, 1000)

  useEffect(() => {
    onChange?.(debounced)
    setSearchParams((prev) => {
      prev.set('searchQuery', debounced)

      return prev
    })
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
