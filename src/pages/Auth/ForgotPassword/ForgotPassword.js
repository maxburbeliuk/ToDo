import { usePostAuthActions } from '~/domains/Auth/hooks/post'
import { Center } from '@mantine/core'
import { ForgotPasswordForm } from '~/domains/Auth/components'

const ForgotPassword = () => {
  const { onForgotPassword } = usePostAuthActions()
  return (
    <Center h={'100vh'}>
      <ForgotPasswordForm onForgotPassword={onForgotPassword} />
    </Center>
  )
}

export default ForgotPassword
