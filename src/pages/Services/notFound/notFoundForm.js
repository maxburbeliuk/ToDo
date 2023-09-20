import { useNavigate } from 'react-router-dom'

const NotFoundForm = () => {
  const history = useNavigate()

  return (
    <>
      <h1>Oops page not found 404 error</h1>
      <button onClick={() => history('/')}>GoROOT</button>
    </>
  )
}
export default NotFoundForm
