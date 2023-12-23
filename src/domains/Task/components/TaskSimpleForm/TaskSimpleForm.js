import { TextInput, Button, Textarea, Flex, Space } from '@mantine/core'
import { useFormInitialValues } from '~/domains/Task/hooks'
import { useCreateTask } from '~/domains/Task/services/post'

const TaskSimpleForm = (props) => {
  const { onCancel, onSubmit, initialValues } = props
  const { form } = useFormInitialValues(initialValues)
  const { createTask } = useCreateTask()

  const handleFormSubmit = async (values) => {
    await createTask(values.text, values.description)
    onSubmit(values)
    form.reset()
  }

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <TextInput
        withAsterisk
        label="Task text"
        placeholder="Today I want to"
        {...form.getInputProps('text')}
      />
      <Textarea
        label="Description"
        placeholder="Task description"
        {...form.getInputProps('description')}
      />
      <Space h="md" />
      <Flex
        mih={50}
        gap="md"
        justify="flex-end"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Button type="submit">Submit</Button>
        {!!onCancel ? (
          <Button
            onClick={onCancel}
            variant="light"
            color={'var(--mantine-color-red-8)'}
          >
            Cancel
          </Button>
        ) : null}
      </Flex>
    </form>
  )
}

export default TaskSimpleForm
