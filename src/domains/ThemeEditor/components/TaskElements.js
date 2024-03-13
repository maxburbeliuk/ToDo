import {
  SegmentedControl,
  Text,
  Box,
  ColorInput,
  Flex,
  Divider,
  VisuallyHidden,
  rem,
  Paper,
  Select,
  Button,
  ColorPicker,
  Group,
  ActionIcon
} from '@mantine/core'
import { IconMoon, IconSunHigh } from '@tabler/icons-react'
import { useState } from 'react'

const TaskElements = () => {
  const iconProps = {
    style: { width: rem(20), height: rem(20), display: 'block' },
    stroke: 1.5
  }

  return (
    <>
      <Paper shadow="xl" radius="lg" h="84vh" w={400}>
        <Flex gap="sm" align="center" p={10}>
          <Text size="lg" fw={500}>
            Theme Editor
          </Text>
          <SegmentedControl data={['Global', 'Component']} />
        </Flex>
        <Divider />
        <Flex gap="sm" align="center" p={10}>
          <Text size="md">Color</Text>
          <Text size="md">Size</Text>
          <Text size="md">Style</Text>
        </Flex>
        <Divider />
        <Flex align="center" p={10} justify="space-between">
          <Text size="lg" fw={500}>
            Color
          </Text>
          <SegmentedControl
            data={[
              {
                value: 'preview',
                label: (
                  <>
                    <IconSunHigh {...iconProps} />
                    <VisuallyHidden>White</VisuallyHidden>
                  </>
                )
              },
              {
                value: 'code',
                label: (
                  <>
                    <IconMoon {...iconProps} />
                    <VisuallyHidden>Dark</VisuallyHidden>
                  </>
                )
              }
            ]}
          />
        </Flex>
        <Divider />
        <Box p={10}>
          <Text size="md">Brand color</Text>
          <Flex align="center" justify="space-between">
            <Text fw={700}>colorPrimary</Text>
            <ColorInput
              variant="filled"
              placeholder="Input placeholder"
              w={180}
            />
          </Flex>
        </Box>
        <Select
          pl={10}
          pr={10}
          placeholder="Map token"
          data={['React', 'Angular', 'Vue', 'Svelte']}
          comboboxProps={{
            transitionProps: { transition: 'pop' },
            shadow: 'xl'
          }}
        />
      </Paper>
    </>
  )
}

export default TaskElements
