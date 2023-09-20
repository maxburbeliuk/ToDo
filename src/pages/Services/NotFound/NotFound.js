import { useNavigate } from 'react-router-dom'
import { APP_PATHS } from '~/__constants__'

const NotFound = () => {
  const history = useNavigate()

  return (
    <>
      <h1>Oops page not found 404 error</h1>
      <button
        onClick={() => {
          history(APP_PATHS.TASKS_ALL)
        }}
      >
        GoROOT
      </button>
    </>
  )
}

export default NotFound
