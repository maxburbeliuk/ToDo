import { TextInput, Button, Textarea, Flex, Space } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useTaskDispatchContext } from '~/domains/Task/context'
import { TASK_CONTEXT_ACTIONS } from '~/domains/Task/context/__constants__'

const TaskSimpleForm = () => {
  const taskDispatch = useTaskDispatchContext()
  const form = useForm({
    initialValues: {
      text: '',
      description: ''
    }
  })

  const handleTaskAdd = (values) => {
    const { text, description } = values
    const id = new Date()

    taskDispatch({
      type: TASK_CONTEXT_ACTIONS.CREATE_TASK,
      payload: {
        task: { text, description, id: id.toISOString() }
      }
    })

    form.reset()
  }

  return (
    <form onSubmit={form.onSubmit(handleTaskAdd)}>
      <TextInput
        withAsterisk
        label="Task text"
        placeholder="Today i want to"
        {...form.getInputProps('text')}
      />
      <Textarea
        label="Description"
        placeholder="Task description"
        {...form.getInputProps('description')}
      />

      <Space h="md" />
      <Flex gap="md" justify="flex-end">
        <Button type="submit">Submit</Button>
      </Flex>
    </form>
  )
}

export default TaskSimpleForm
