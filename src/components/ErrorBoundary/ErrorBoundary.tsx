import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (!this.state.hasError) return this.props.children

    return (
      <>
        <h2>An error occurred!😕</h2>
        <button onClick={() => window.location.assign(window.location.origin)}>
          Please refresh
        </button>
      </>
    )
  }
}

export default ErrorBoundary
