import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  PasswordInput,
  Stack,
  TextInput
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAt } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { APP_PATHS, AUTH_PATHS } from '~/__constants__'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  const { onLogin, loading } = props
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

  return (
    <Box mx="auto" pos="relative">
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
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
            <Button type="submit">Login</Button>
          </Group>
        </Stack>
      </form>
    </Box>
  )
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool
}

export default LoginForm
