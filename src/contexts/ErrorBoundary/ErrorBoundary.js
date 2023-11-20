import React from 'react'
import ErrorComponentFallback from '../ErrorComponentFallback'

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
    if (this.state.hasError) {
      return <ErrorComponentFallback onGoBack={this.resetState} />
    }

    return this.props.children
  }
}
export default ErrorBoundary
