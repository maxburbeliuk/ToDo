import { useForm } from '@mantine/form'
import { useEffect } from 'react'

export function useFormInitialValues(props) {
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

  useEffect(() => {
    if (!!Object.keys(props.initialValues || {})?.length) {
      form.setValues({
        text: props.initialValues?.text,
        description: props.initialValues?.description
      })
    }
  }, [props.initialValues])
  return { form }
}
