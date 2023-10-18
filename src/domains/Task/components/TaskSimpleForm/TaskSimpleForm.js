import { TextInput, Button, Textarea, Flex, Space } from '@mantine/core'
import { useFormInitialValues } from '~/domains/Task/hooks/useFormIntialValues'
const TaskSimpleForm = (props) => {
  const { onCancel, onSubmit, initialValues } = props
  const { form } = useFormInitialValues(initialValues)
  const handleFormSubmit = (values) => {
    onSubmit(values)
    form.reset()
  }
  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
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
      <Flex
        mih={50}
        gap="md"
        justify="flex-end"
        align="center"
        заюхзак
        direction="row"
        wrap="wrap"
      >
        <Button type="submit">Submit</Button>
        {!!onCancel ? (
          <Button onClick={onCancel} variant="light" color="rgba(255, 0, 0, 1)">
            Cancel
          </Button>
        ) : null}
      </Flex>
    </form>
  )
}
export default TaskSimpleForm
