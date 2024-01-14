import { usePostAuthActions } from '~/domains/Auth/hooks/post'
import { Paper, Title, Text, Center, Box } from '@mantine/core'
import { ForgotPasswordForm } from '~/domains/Auth/components'

const ForgotPassword = () => {
  const { onForgotPassword } = usePostAuthActions()
  return (
    <Center bg="var(--mantine-color-gray-light)" h={'100vh'}>
      <Box w={500}>
        <Title ta="center" order={1}>
          Forgot your password?
        </Title>
        <Text c="dimmed" fz="sm" ta="center" mt={8}>
          Enter your email to get a reset link
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <ForgotPasswordForm onForgotPassword={onForgotPassword} />
        </Paper>
      </Box>
    </Center>
  )
}

export default ForgotPassword
