import REST_METHODS from './__constants__/methods'
import { safe } from '~/helpers'
import { notifications } from '@mantine/notifications'

const remove = async (endpoint, body = {}) => {
  const snapshot = fetch(endpoint, {
    method: REST_METHODS.DELETE,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const { data, success } = await safe(
    snapshot,
    'Something went wrong during create'
  )

  if (!success) {
    notifications.show({
      color: 'red',
      title: 'Oops! Failed to create',
      message: data.error
    })
    return { data: null, message: 'Something went wrong during remove' }
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

export default remove
