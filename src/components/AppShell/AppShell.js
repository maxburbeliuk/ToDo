import React from 'react'
import { useDisclosure } from '@mantine/hooks'
import { AppShell, Burger, Group } from '@mantine/core'
import { MainMenu } from '~/components'
import { AUTH_PATHS, SERVICES_PATHS } from '~/__constants__'
import { useLocation } from 'react-router-dom'

const AppShellElements = ({ children }) => {
  const [opened, { toggle }] = useDisclosure()
  const location = useLocation()

  const isAuthPath = Object.values(AUTH_PATHS).some((path) =>
    location.pathname.includes(path)
  )
  const isErrorPath = Object.values(SERVICES_PATHS).some((path) =>
    location.pathname.includes(path)
  )

  const appShellProps =
    !isAuthPath && !isErrorPath
      ? {
          bg: 'var(--mantine-color-gray-light)',
          header: { height: 60 },
          footer: { height: 60 },
          navbar: {
            width: 300,
            breakpoint: 'sm',
            collapsed: { mobile: !opened }
          },
          aside: {
            width: 300,
            breakpoint: 'md',
            collapsed: { desktop: false, mobile: true }
          },
          padding: 'md'
        }
      : null

  return (
    <AppShell bg={'var(--mantine-color-gray-light)'} {...appShellProps}>
      {!isAuthPath && !isErrorPath ? (
        <>
          {' '}
          <AppShell.Header>
            <Group h="100%" px="md">
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              Logo
            </Group>
          </AppShell.Header>
          <AppShell.Navbar p="md">
            <MainMenu />
          </AppShell.Navbar>
          <AppShell.Footer p="md">Footer</AppShell.Footer>
          <AppShell.Aside p="md">Aside</AppShell.Aside>
        </>
      ) : null}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}

export default AppShellElements
