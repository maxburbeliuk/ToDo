import { useForm, isNotEmpty, hasLength } from '@mantine/form'
import { useEffect } from 'react'

export function useFormInitialValues(initialValues = {}) {
  const form = useForm({
    initialValues: {
      text: '',
      description: ''
    },
    transformValues: (values) => ({
      fullName: `${values.text} ${values.description}`
    }),
    validate: {
      text: hasLength({ min: 1, max: 100 }, 'Task text must be filled'),
      description: isNotEmpty('Enter your description')
    }
  })

  form.getTransformedValues()
  form.getTransformedValues({
    text: ''.trim,
    description: ''.trim
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

// import { useForm } from '@mantine/form'
// import { useEffect } from 'react'
// export function useFormInitialValues(initialValues = {}) {
//   const form = useForm({
//     initialValues: {
//       text: '',
//       description: ''
//     },
//     validate: {
//       text: (value) =>
//         value.length < 1 ? 'Please write your task name ' : null,
//       description: (value) =>
//         value.length < 1 ? 'Please write your description' : null
//     }
//   })
//   useEffect(() => {
//     //викликаємо useEffect для редагування змін initialValues  після перерендерення компонента
//     if (!!Object.keys(initialValues)?.length) {
//       //умова чи не є initialValues пустим об'єктом
//       const { text = '', description = '' } = initialValues
//       // З initialValues дістаємо text та description
//       form.setValues({
//         // Встановлюємо початкові значення text та description
//         text,
//         description
//       })
//     }
//   }, [initialValues])
//   // Массив залежності, що якщо мзмінюєтося initialValues то визивається хук useEffect
//   return { form }
// }
