import REST_METHODS from './__constants__/methods'
import { safe } from '~/helpers'
import { notifications } from '@mantine/notifications'

const edit = async (endpoint, body = {}) => {
  const snapshot = fetch(endpoint, {
    method: REST_METHODS.PATCH,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  console.log(body)

  const { data, success } = await safe(
    snapshot,
    'Something went wrong during create'
  )
  console.log(snapshot)

  if (!success) {
    notifications.show({
      color: 'red',
      title: 'Oops! Failed to create',
      message: data.error
    })
    return { data: null, message: 'Something went wrong during create' }
  }
  return await body
}

export default edit
