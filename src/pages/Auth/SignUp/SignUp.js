import { SignUpForm } from '~/domains/Auth/components'
import { usePostAuthActions } from '~/domains/Auth/hooks/post'
import { Center } from '@mantine/core'

const SignUp = () => {
  const { onSignUp } = usePostAuthActions()

  return (
    <Center h={'100vh'}>
      <SignUpForm onSignUp={onSignUp} />
    </Center>
  )
}

export default SignUp
