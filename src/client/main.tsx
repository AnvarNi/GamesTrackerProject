import ReactDom from 'react-dom/client'
import App from './App'
import './global.css'
import Layout from './components/layout/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5
    }
  }
})

ReactDom.createRoot(document.getElementById('root')!).render(
  <NuqsAdapter>
    <QueryClientProvider client={queryClient}>
      <Layout>
        <App />
      </Layout>
    </QueryClientProvider>
  </NuqsAdapter>
)
