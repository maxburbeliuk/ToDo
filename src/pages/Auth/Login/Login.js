import { LoginForm } from '~/domains/Auth/components'
import { usePostAuthActions } from '~/domains/Auth/hooks/post'
import { Anchor, Paper, Title, Text, Center, Box } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { AUTH_PATHS } from '~/__constants__'

const Login = () => {
  const { onLogin } = usePostAuthActions()

  const navigate = useNavigate()

  const goToSignUp = () => {
    navigate(`/auth${AUTH_PATHS.SIGN_UP}`)
  }
  return (
    <Center bg="var(--mantine-color-gray-light)" h={'100vh'}>
      <Box w={500}>
        <div>
          <Title ta="center" order={1}>
            Welcome back!
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={8}>
            Do not have an account yet?{' '}
            <Anchor size="sm" component="button" onClick={goToSignUp}>
              Create account
            </Anchor>
          </Text>
        </div>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <LoginForm onLogin={onLogin} />
        </Paper>
      </Box>
    </Center>
  )
}

export default Login
