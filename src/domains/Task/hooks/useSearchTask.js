import { useMemo, useState } from 'react'
import { useFilterAndSortTask } from '~/domains/Task/hooks/index'

const useSearchTask = () => {
  const [searchedValue, setSearchedValue] = useState('')

  const { computedTasks } = useFilterAndSortTask()

  const tasksWithSearchedValue = useMemo(() => {
    //  This is our sort logic by text
    return searchedValue?.length
      ? computedTasks.filter((item) =>
          item?.text?.toLowerCase().includes(searchedValue.toLowerCase())
        )
      : computedTasks
  }, [computedTasks, searchedValue])

  return { setSearchedValue, tasksWithSearchedValue }
}

export default useSearchTask
