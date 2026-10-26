import ReactDom from 'react-dom/client'
import Home from './pages/home/Home'
import './global.css'
import Layout from './components/layout/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Admin } from './pages/admin/Admin'
import { StrictMode, Suspense } from 'react'
import { AdminLoginForm } from './pages/admin/login-form/AdminLoginForm'
import { Toaster } from 'sonner'

const routes = [
  { path: '/', Component: Home },
  { path: '/admin', Component: Admin },
  { path: '/admin-login', Component: AdminLoginForm }
] as const

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5
    }
  }
})

ReactDom.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <BrowserRouter>
          <Layout>
            <Routes>
              {routes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Routes>
            <Toaster />
          </Layout>
        </BrowserRouter>
      </NuqsAdapter>
    </QueryClientProvider>
  </StrictMode>
)
