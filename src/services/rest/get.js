import REST_METHODS from './__constants__/methods'
import { safe } from '~/helpers'
import { notifications } from '@mantine/notifications'

const get = async (endpoint) => {
  const snapshot = fetch(endpoint, {
    method: REST_METHODS.GET,
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
      title: 'Oops! Failed to fetch',
      message: data.error
    })
    return {
      data: null,
      error: 'Oops! Failed to fetch',
      message: 'Something went wrong during create',
      statusCode: 500
    }
  }

  const result = await data.json()

  if (result.statusCode !== 200) {
    notifications.show({
      color: 'yellow',
      title: 'Oops! Something went wrong',
      message: result.message
    })
  }

  return result
}

export default get
