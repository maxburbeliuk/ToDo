import REST_METHODS from './__constants__/methods'
import { safe } from '~/helpers'
import { notifications } from '@mantine/notifications'

const remove = async (endpoint, _id = {}) => {
  const snapshot = fetch(endpoint, {
    method: REST_METHODS.DELETE,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  // console.log(_id)

  const { data, success } = await safe(
    snapshot,
    'Something went wrong during create'
  )
  // console.log(snapshot)

  if (!success) {
    notifications.show({
      color: 'red',
      title: 'Oops! Failed to create',
      message: data.error
    })
    return { data: null, message: 'Something went wrong during create' }
  }
}

export default remove
