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

  const { data, success } = await safe(
    snapshot,
    'Something went wrong during create'
  )

  if (!success) {
    notifications.show({
      color: 'red',
      title: 'Oops! Failed to create',
      message: data?.error
    })
    return { data: null, message: 'Something went wrong during update' }
  }

  const result = await data.json()

  if (result.statusCode !== 200) {
    notifications.show({
      color: 'yellow',
      title: 'Oops! Something went wrong',
      message: result.message
    })
    return { data: result.data, message: result.message }
  }

  return result
}

export default edit
