import {
  Anchor,
  Box,
  Button,
  Center,
  Group,
  rem,
  Text,
  TextInput,
  Title,
  Paper
} from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useForm } from '@mantine/form'
import { AUTH_PATHS } from '~/__constants__'
import { IconArrowLeft } from '@tabler/icons-react'
import PropTypes from 'prop-types'

const ForgotPasswordForm = (props) => {
  const { onForgotPassword } = props
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      email: ''
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    }
  })

  const handleForgotPassword = (values) => {
    onForgotPassword(values)
    // navigate(APP_PATHS.TASKS_ALL)
  }

  const goToLogin = () => {
    navigate(`/auth${AUTH_PATHS.LOGIN}`)
  }
  return (
    <Box w={500}>
      <Title ta="center" order={1}>
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center" mt={8}>
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={form.onSubmit(handleForgotPassword)}>
          <TextInput
            label="Your email"
            placeholder="me@mantine.dev"
            required
            {...form.getInputProps('email')}
          />
          <Group justify="space-between" mt="lg">
            <Anchor c="dimmed" size="sm" onClick={goToLogin}>
              <Center inline>
                <IconArrowLeft
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
                <Box ml={5}>Back to the login page</Box>
              </Center>
            </Anchor>
            <Button type="submit">Reset password</Button>
          </Group>
        </form>
      </Paper>
    </Box>
  )
}
ForgotPasswordForm.propTypes = {
  onForgotPassword: PropTypes.func.isRequired
}
export default ForgotPasswordForm
