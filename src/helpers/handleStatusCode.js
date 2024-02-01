import { notifications } from '@mantine/notifications'

const handleStatusCode = ({ statusCode, message }, successMessage) => {
  if (statusCode === 400) {
    notifications.show({
      title: 'Oops! Something went wrong',
      message: message,
      color: 'yellow'
    })
  }

  if (statusCode === 403) {
    notifications.show({
      title: 'Oops! Something went wrong',
      message: message,
      color: 'yellow'
    })
  }

  if (statusCode === 404) {
    notifications.show({
      title: 'Oops! Something went wrong',
      message: message,
      color: 'yellow'
    })
  }

  if (statusCode === 500) {
    notifications.show({
      color: 'red',
      title: 'Oops! Server error',
      message: message
    })
  }

  if (statusCode === 200 && successMessage) {
    let computedMessage =
      typeof successMessage === 'string' ? successMessage : message

    notifications.show({
      color: 'green',
      title: 'Notification',
      message: computedMessage
    })
  }
}

export default handleStatusCode
