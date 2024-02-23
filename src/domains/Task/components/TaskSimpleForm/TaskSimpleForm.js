import { TextInput, Button, Textarea, Flex, Space, Grid } from '@mantine/core'
import { useFormInitialValues } from '~/domains/Task/hooks'
import { ImageCropper, ImageUploader } from '~/components'
const TaskSimpleForm = (props) => {
  const { onCancel, onSubmit, initialValues } = props
  const { form } = useFormInitialValues(initialValues)

  const handleFormSubmit = (values) => {
    onSubmit(values)
    form.reset()
  }

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Grid>
        <ImageUploader />
        {/*<ImageCropper />*/}
        <Flex direction="column" pl={10} w={1000} pr={10}>
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
        </Flex>
      </Grid>
      <Space h="md" />
      <Flex
        mih={50}
        gap="md"
        justify="flex-end"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Button type="submit" color={'var(--mantine-color-violet-9)'}>
          Submit
        </Button>
        {!!onCancel ? (
          <Button
            onClick={onCancel}
            variant="light"
            color={'var(--mantine-color-orange-6)'}
          >
            Cancel
          </Button>
        ) : null}
      </Flex>
    </form>
  )
}

export default TaskSimpleForm
