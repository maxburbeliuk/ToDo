import {
  Box,
  Button,
  Center,
  Checkbox,
  Group,
  PasswordInput,
  TextInput
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAt } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { APP_PATHS } from '~/__constants__'

const LoginForm = () => {
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      termsOfService: false
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    }
  })

  const onLogin = (values) => {
    console.log(values)

    navigate(APP_PATHS.TASKS_ALL)
  }

  return (
    <Center maw={'100wh'} h={'100vh'} bg="var(--mantine-color-gray-light)">
      <Box maw={400} mx="auto">
        <form onSubmit={form.onSubmit(onLogin)}>
          <TextInput
            leftSection={<IconAt size={16} />}
            withAsterisk
            label="Email"
            placeholder="your@email.com"
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
            label="password"
            placeholder="******"
            {...form.getInputProps('password')}
          />

          <Checkbox
            mt="md"
            label="I agree to sell my privacy"
            {...form.getInputProps('termsOfService', { type: 'checkbox' })}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </Center>
  )
}

export default LoginForm
