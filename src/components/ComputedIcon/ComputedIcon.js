import { Center, rem } from '@mantine/core'
import { IconGripVertical } from '@tabler/icons-react'

const computedIcon = (icon, isShown) => {
  if (isShown) {
    return (
      <Center>
        <Center
          style={{
            marginRight: '6px'
          }}
        >
          <IconGripVertical
            style={{
              width: rem(18),
              height: rem(18)
            }}
            stroke={0.5}
          />
        </Center>
        {icon}
      </Center>
    )
  }

  return (
    <Center
      style={{
        marginLeft: '24px'
      }}
    >
      {icon}
    </Center>
  )
}
export default computedIcon
