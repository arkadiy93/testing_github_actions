import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { AuthProvider } from '@/providers/Auth'
import { MsalProvider } from '@azure/msal-react'
import { msalInstance } from '@/lib/msal'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <MsalProvider instance={msalInstance}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MsalProvider>
    </ErrorBoundary>
  </QueryClientProvider>
)
