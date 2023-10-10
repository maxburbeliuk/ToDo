import {
  TextInput,
  Button,
  Textarea,
  Flex,
  Space,
  CloseButton,
  VisuallyHidden
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
const TaskSimpleForm = (props) => {
  const { onSubmit, initialValues, onCancel } = props
  const form = useForm({
    initialValues: {
      text: '',
      description: ''
    },
    validate: {
      text: (value) =>
        value.length < 1 ? 'Please write your task name ' : null,
      description: (value) =>
        value.length < 1 ? 'Please write your description' : null
    }
  })
  const handleFormSubmit = (values) => {
    onSubmit(values)
    form.reset()
  }
  useEffect(() => {
    if (initialValues) {
      form.setValues({
        text: initialValues.text,
        description: initialValues.description
      })
    }
  }, [initialValues])
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
        direction="row"
        wrap="wrap"
      >
        <Button type="submit">Submit</Button>
        {onCancel ? <Button onClick={onCancel}>Cancel</Button> : null}
      </Flex>
    </form>
  )
}
export default TaskSimpleForm
