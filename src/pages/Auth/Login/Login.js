import { LoginForm } from '~/domains/Auth/components'
import { usePostAuthActions } from '~/domains/Auth/hooks/post'
import { Center } from '@mantine/core'

const Login = () => {
  const { onLogin } = usePostAuthActions()

  return (
    <Center h={'100vh'}>
      <LoginForm onLogin={onLogin} />
    </Center>
  )
}

export default Login
