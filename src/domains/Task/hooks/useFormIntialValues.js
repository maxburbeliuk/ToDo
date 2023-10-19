import { useForm, isNotEmpty, hasLength } from '@mantine/form'
import { useEffect } from 'react'

export function useFormInitialValues(initialValues = {}) {
  const form = useForm({
    initialValues: {
      text: '',
      description: ''
    },
    transformValues: ({ text, description }) => ({
      text: text.trim(),
      description: description.trim()
    }),
    validate: {
      text: hasLength({ min: 1, max: 100 }, 'Task text must be filled'),
      description: isNotEmpty('Enter your description')
    }
  })

  useEffect(() => {
    if (!!Object.keys(initialValues)?.length) {
      const { text = '', description = '' } = initialValues
      form.setValues({
        text,
        description
      })
    }
  }, [initialValues])
  return { form }
}
