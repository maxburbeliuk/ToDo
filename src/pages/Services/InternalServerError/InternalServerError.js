import { useNavigate } from 'react-router-dom'
import { APP_PATHS } from '~/__constants__'

const InternalServerError = () => {
  const history = useNavigate()

  return (
    <>
      <h1>Oops it`s Internal Server Error 505</h1>
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

export default InternalServerError
