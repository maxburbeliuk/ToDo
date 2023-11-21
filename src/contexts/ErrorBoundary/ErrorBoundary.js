import React from 'react'
import { ErrorComponentFallback } from '~/components'
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  resetState = () => {
    this.setState({ hasError: false })
  }
  render() {
    console.log(this.state.hasError)
    if (this.state.hasError) {
      return <ErrorComponentFallback onGoBack={this.resetState} />
    }

    return this.props.children
  }
}
export default ErrorBoundary
