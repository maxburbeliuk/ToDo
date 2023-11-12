import { useDisclosure } from '@mantine/hooks'
import { AppShell, Burger, Group, Skeleton } from '@mantine/core'
import Cookies from '~/components/Cookies'
import { useState, useEffect } from 'react'

const AppShellElements = ({ children }) => {
  const [opened, { toggle }] = useDisclosure()
  const [showCookies, setShowCookies] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCookies(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened }
      }}
      aside={{
        width: 300,
        breakpoint: 'md',
        collapsed: { desktop: false, mobile: true }
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          Logo
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Aside p="md">Aside</AppShell.Aside>
      <AppShell.Footer p="md">Footer</AppShell.Footer>
      {showCookies && <Cookies />}
    </AppShell>
  )
}

export default AppShellElements
