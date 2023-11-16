import { Center } from '@mantine/core'
import { IconGripVertical } from '@tabler/icons-react'
import './Styles.css'

const ComputedIcon = (icon, isShown) => {
  if (isShown) {
    return (
      <Center className="iconContainer">
        <Center className="iconMarginRight">
          <IconGripVertical className="iconSize" stroke={0.5} />
        </Center>
        {icon}
      </Center>
    )
  }

  return <Center className="iconMarginLeft">{icon}</Center>
}
export default ComputedIcon
