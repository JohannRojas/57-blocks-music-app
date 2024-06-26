import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {

  const navigate = useNavigate()

  const getAccessToken = (route: string) => {
    const authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${import.meta.env.VITE_CLIENT_ID}&client_secret=${import.meta.env.VITE_CLIENT_SECRET}`,
    }
    fetch('https://accounts.spotify.com/api/token', authParams)
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('token', data.access_token)
        navigate(route)
      })
  }


  const logout = useCallback(() => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('token')
    localStorage.removeItem('likedSongs')
    localStorage.removeItem('likedAlbums')
    navigate('/login')
  }, [navigate])


  return {
    getAccessToken,
    logout
  }
}