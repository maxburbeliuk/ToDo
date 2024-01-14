const usePostAuthActions = () => {
  const onLogin = async (values) => {
    console.log(values)
  }

  const onSignUp = async (values) => {
    console.log(values)
  }

  const onForgotPassword = async (values) => {
    console.log(values)
  }

  return { onLogin, onSignUp, onForgotPassword }
}

export default usePostAuthActions
