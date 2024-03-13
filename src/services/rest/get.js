import REST_METHODS from './__constants__/methods'
import { handleStatusCode, safe } from '~/helpers'
import { notifications } from '@mantine/notifications'

const get = async (endpoint, successMessage) => {
  const req = new Request(endpoint, {
    method: REST_METHODS.GET,
    headers: {
      'Content-Type': 'application/json'
    },
    // mode: 'cors',
    credentials: 'include'
  })
  const snapshot = fetch(req)

  const { data, success } = await safe(
    snapshot,
    'Something went wrong during post'
  )

  if (!success) {
    notifications.show({
      color: 'red',
      title: 'Oops! Failed to get',
      message: data?.error
    })

    return { data: null, message: 'Something went wrong during post' }
  }

  const result = await data.json()

  handleStatusCode(result, successMessage)

  return result
}

export default get
