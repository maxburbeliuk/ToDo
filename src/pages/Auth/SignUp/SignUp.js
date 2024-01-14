import { SignUpForm } from '~/domains/Auth/components'
import { usePostAuthActions } from '~/domains/Auth/hooks/post'
import { Paper, Title, Text, Center, Box } from '@mantine/core'

const SignUp = () => {
  const { onSignUp } = usePostAuthActions()

  return (
    <Center bg="var(--mantine-color-gray-light)" h={'100vh'}>
      <Box w={500}>
        <div>
          <Title ta="center" order={1}>
            Sign up
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={8}>
            Create an account easily using email
          </Text>
        </div>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <SignUpForm onSignUp={onSignUp} />
        </Paper>
      </Box>
    </Center>
  )
}

export default SignUp
