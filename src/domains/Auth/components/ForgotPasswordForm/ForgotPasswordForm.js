import {
  Anchor,
  Box,
  Button,
  Center,
  Group,
  rem,
  TextInput
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

  const handleForgotPassword = (values) => {
    onForgotPassword(values)
    // navigate(APP_PATHS.TASKS_ALL)
  }

  const goToLogin = () => {
    navigate(`/auth${AUTH_PATHS.LOGIN}`)
  }
  return (
    <Box mx="auto">
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
    </Box>
  )
}
ForgotPasswordForm.propTypes = {
  onForgotPassword: PropTypes.func.isRequired
}
export default ForgotPasswordForm
