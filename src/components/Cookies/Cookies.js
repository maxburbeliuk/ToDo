import { Button, Paper, Text, Group, CloseButton, Affix } from '@mantine/core'
import { useDisclosure, useLocalStorage } from '@mantine/hooks'

const Cookies = () => {
  const [_, setCookies] = useLocalStorage({
    key: 'accept',
    defaultValue: 'false'
  })

  const handleAccept = () => {
    console.log('Cookies accepted')
    setCookies('true')
  }

  const handleDecline = () => {
    console.log('Cookies declined')
    setCookies('false')
  }

  const handleClose = () => {
    console.log('Cookies closed')
    setCookies('null')
  }

  return (
    <Affix
      style={{
        bottom: 20,
        right: 20,
        maxWidth: 500,
        width: '100%'
      }}
    >
      <Paper withBorder p="lg" radius="md" shadow="md">
        <Group justify="space-between" mb="xs">
          <Text fz="md" fw={500}>
            Allow cookies
          </Text>
          <CloseButton onClick={handleClose} mr={-9} mt={-9} />
        </Group>
        <Text c="dimmed" fz="xs">
          So the deal is, we want to spy on you. We would like to know what did
          you have for todays breakfast, where do you live, how much do you earn
          and like 50 other things. To view our landing page you will have to
          accept all cookies. That&apos;s all, and remember that we are
          watching...
        </Text>
        <Group justify="flex-end" mt="md">
          <Button
            variant="outline"
            size="xs"
            color="red"
            onClick={handleDecline}
          >
            Decline
          </Button>
          <Button variant="filled" size="xs" onClick={handleAccept}>
            Accept all
          </Button>
        </Group>
      </Paper>
    </Affix>
  )
}

export default Cookies
