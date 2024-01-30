import REST_METHODS from './__constants__/methods'
import { handleStatusCode, safe } from '~/helpers'
import { notifications } from '@mantine/notifications'

const update = async (endpoint, body = {}, successMessage) => {
  const snapshot = fetch(endpoint, {
    method: REST_METHODS.PATCH,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const { data, success } = await safe(
    snapshot,
    'Something went wrong during post'
  )

  if (!success) {
    notifications.show({
      color: 'red',
      title: 'Oops! Failed to post',
      message: data?.error
    })
    return { data: null, message: 'Something went wrong during update' }
  }

  const result = await data.json()

  handleStatusCode(result, successMessage)

  return result
}

export default update
