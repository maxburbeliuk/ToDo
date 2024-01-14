import { useDisclosure } from '@mantine/hooks'
import { AppShell, Burger, Group } from '@mantine/core'
import { MainMenu } from '~/components'

const AppShellElements = ({ children }) => {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
    // header={{ height: 60 }}
    // footer={{ height: 60 }}
    // navbar={{
    //   width: 300,
    //   breakpoint: 'sm',
    //   collapsed: { mobile: !opened }
    // }}
    // aside={{
    //   width: 300,
    //   breakpoint: 'md',
    //   collapsed: { desktop: false, mobile: true }
    // }}
    // padding="md"
    >
      {/*<AppShell.Header>*/}
      {/*  <Group h="100%" px="md">*/}
      {/*    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />*/}
      {/*    Logo*/}
      {/*  </Group>*/}
      {/*</AppShell.Header>*/}
      {/*<AppShell.Navbar p="md">*/}
      {/*  <MainMenu />*/}
      {/*</AppShell.Navbar>*/}
      <AppShell.Main>{children}</AppShell.Main>
      {/*<AppShell.Aside p="md">Aside</AppShell.Aside>*/}
      {/*<AppShell.Footer p="md">Footer</AppShell.Footer>*/}
    </AppShell>
  )
}

export default AppShellElements
