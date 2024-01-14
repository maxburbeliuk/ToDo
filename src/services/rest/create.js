import REST_METHODS from './__constants__/methods'
import { safe } from '~/helpers'
import { notifications } from '@mantine/notifications'

const create = async (endpoint, body = {}) => {
  const snapshot = fetch(endpoint, {
    method: REST_METHODS.POST,
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
      message: data.error
    })
    return { data: null, message: 'Something went wrong during create' }
  }

  return await data.json()
}

export default create