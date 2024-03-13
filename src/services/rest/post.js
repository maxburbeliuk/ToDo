import REST_METHODS from './__constants__/methods'
import { safe } from '~/helpers'
import { notifications } from '@mantine/notifications'
import { handleStatusCode } from '~/helpers'

const post = async (endpoint, body = {}, successMessage) => {
  const snapshot = fetch(endpoint, {
    method: REST_METHODS.POST,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
    // mode: 'cors',
    // credentials: 'include'
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

    return { data: null, message: 'Something went wrong during post' }
  }

  const result = await data.json()

  handleStatusCode(result, successMessage)

  return result
}

export default post
