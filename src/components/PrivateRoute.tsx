import { Navigate, Outlet } from 'react-router-dom'
import { Navbar } from '@/components'

export const PrivateRoute = () => {
  const auth = localStorage.getItem('isLoggedIn')
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <main className='my-4'>
        <Navbar />
        <div className='mx-10'>
          { children }
        </div>
      </main>
    )
  }

  return auth ? <Wrapper><Outlet /></Wrapper> : <Navigate to="/login" />
}
