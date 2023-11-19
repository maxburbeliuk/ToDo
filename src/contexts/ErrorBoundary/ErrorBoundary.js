import React from 'react'
import NotFoundImage from '../NotFoundImage'
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <NotFoundImage />
    }

    return this.props.children
  }
}
export default ErrorBoundary
