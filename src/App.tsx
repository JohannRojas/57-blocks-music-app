import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { Dashboard, Details, LikedSongs, Login } from '@/pages'
import { PrivateRoute } from './components'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={ <Login /> } />
        <Route path='/' element={ <PrivateRoute /> } >
          <Route path='/dashboard' element={ <Dashboard /> } />
          <Route path='/liked-songs' element={ <LikedSongs /> } />
          <Route path='/details/:id' element={ <Details /> } />
          <Route path='*' element={ <Dashboard /> } />
        </Route>
        <Route path="*" element={ <Login /> } />
      </Routes>
    </Router>
  )
}

export default App
