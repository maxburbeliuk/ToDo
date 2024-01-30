import { useNavigate } from 'react-router-dom'
import { useForm } from '@mantine/form'
import { AUTH_PATHS } from '~/__constants__'
import {
  Anchor,
  Box,
  Button,
  Center,
  Checkbox,
  Group,
  LoadingOverlay,
  PasswordInput,
  rem,
  Stack,
  TextInput
} from '@mantine/core'
import { IconArrowLeft, IconAt } from '@tabler/icons-react'
import PropTypes from 'prop-types'

const SignUpForm = (props) => {
  const { onSignUp, loading } = props
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      rememberMe: false
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    }
  })

  const handleSignUp = (values) => {
    onSignUp(values)
    // navigate(APP_PATHS.TASKS_ALL)
  }

  const goToLogin = () => {
    navigate(`/auth${AUTH_PATHS.LOGIN}`)
  }

  return (
    <Box mx="auto" pos="relative">
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <form onSubmit={form.onSubmit(handleSignUp)}>
        <Stack gap="md">
          <TextInput
            leftSection={<IconAt size={16} />}
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            required
            {...form.getInputProps('email')}
          />
          <TextInput
            withAsterisk
            label="First Name"
            placeholder="Dima"
            {...form.getInputProps('firstName')}
          />
          <TextInput
            withAsterisk
            label="Last name"
            placeholder="okr"
            {...form.getInputProps('lastName')}
          />
          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="******"
            required
            {...form.getInputProps('password')}
          />

          <Checkbox
            mt="lg"
            label="Remember me"
            {...form.getInputProps('rememberMe', { type: 'checkbox' })}
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
            <Button type="submit">Sign up</Button>
          </Group>
        </Stack>
      </form>
    </Box>
  )
}

SignUpForm.propTypes = {
  onSignUp: PropTypes.func.isRequired,
  loading: PropTypes.bool
}
export default SignUpForm
