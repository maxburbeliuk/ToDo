import REST_METHODS from './__constants__/methods'
import { handleStatusCode, safe } from '~/helpers'
import { notifications } from '@mantine/notifications'

const remove = async (endpoint, body = {}, successMessage) => {
  const snapshot = fetch(endpoint, {
    method: REST_METHODS.DELETE,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const { data, success } = await safe(
    snapshot,
    'Something went wrong during post'
  )

  if (!success) {
    notifications.show({
      color: 'red',
      title: 'Oops! Failed to post',
      message: data.error
    })
    return { data: null, message: 'Something went wrong during remove' }
  }

  const result = await data.json()

  handleStatusCode(result, successMessage)

  return result
}

export default remove
