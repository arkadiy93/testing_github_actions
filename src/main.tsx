import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MsalProvider } from '@azure/msal-react'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { msalInstance } from '@/lib/msal'

const queryClient = new QueryClient()
console.log(process.env.REACT_TEST)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <MsalProvider instance={msalInstance}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </MsalProvider>
  </QueryClientProvider>
)
