import { Center } from '@mantine/core'
import { IconGripVertical } from '@tabler/icons-react'

const DragIcon = (props) => {
  const { isShown, children } = props

  if (isShown) {
    return (
      <Center>
        <Center className="mr-6">
          <IconGripVertical size="18" stroke={0.5} />
        </Center>
        {children}
      </Center>
    )
  }

  return <Center className="ml-24">{children}</Center>
}
export default DragIcon
