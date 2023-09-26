import { useDisclosure } from '@mantine/hooks'
import {
  AppShell as AppShellMantine,
  Burger,
  Group,
  Skeleton
} from '@mantine/core'

const AppShell = ({ children }) => {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShellMantine
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened }
      }}
      padding="md"
    >
      <AppShellMantine.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          Logo
        </Group>
      </AppShellMantine.Header>
      <AppShellMantine.Navbar p="md">
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShellMantine.Navbar>
      <AppShellMantine.Main>{children}</AppShellMantine.Main>
    </AppShellMantine>
  )
}

export default AppShell
