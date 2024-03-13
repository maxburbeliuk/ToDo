import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  Paper
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAt } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { APP_PATHS, AUTH_PATHS } from '~/__constants__'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  const { onLogin } = props
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    }
  })

  const handleLogin = (values) => {
    onLogin(values)
    // navigate(APP_PATHS.TASKS_ALL)
  }

  const goToForgotPassword = () => {
    navigate(`/auth${AUTH_PATHS.FORGOT_PASSWORD}`)
  }

  const goToSignUp = () => {
    navigate(`/auth${AUTH_PATHS.SIGN_UP}`)
  }

  return (
    <Box w={500}>
      <Title ta="center" order={1}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={8}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button" onClick={goToSignUp}>
          Create account
        </Anchor>
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleLogin)}>
          <Stack gap="md">
            <TextInput
              leftSection={<IconAt size={16} />}
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              required
              {...form.getInputProps('email')}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="******"
              required
              {...form.getInputProps('password')}
            />

            <Group justify="space-between" mt="lg">
              <Checkbox
                label="Remember me"
                {...form.getInputProps('rememberMe', { type: 'checkbox' })}
              />
              <Anchor size="sm" onClick={goToForgotPassword}>
                Forgot password?
              </Anchor>
            </Group>

            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Box>
  )
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
}

export default LoginForm
