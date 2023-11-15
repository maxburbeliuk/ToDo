import { Button, Paper, Text, Group, CloseButton, Affix } from '@mantine/core'
import { useState } from 'react'

const GDPR = () => {
  const isAcceptedGDPR = !!JSON.parse(window?.localStorage?.getItem('gdpr'))

  const [accepted, setAccepted] = useState(isAcceptedGDPR)

  const handleAccept = () => {
    localStorage.setItem('gdpr', JSON.stringify(true))
    setAccepted(true)
  }

  const handleDecline = () => {
    localStorage.setItem('gdpr', JSON.stringify(false))
    setAccepted(true)
  }

  return accepted ? null : (
    <Affix
      style={{
        position: 'absolute',
        width: 500,
        zIndex: 1000,
        bottom: 30,
        right: 40
      }}
    >
      <Paper withBorder p="lg" radius="md" shadow="md">
        <Group justify="space-between" mb="xs">
          <Text fz="md" fw={500}>
            Allow cookies
          </Text>
          <CloseButton onClick={handleDecline} mr={-9} mt={-9} />
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

export default GDPR
