import { Card, CardContent, CardHeader } from '@/components'
import { useAuth } from '@/hooks/useAuth'
import { ItemAlbum, ItemsTrack } from '@/types/types'
import { FC, useEffect, useState } from 'react'

export const LikedSongs: FC = () => {
  const token = localStorage.getItem('token')
  const [likedSongs, setLikedSongs] = useState<ItemsTrack[]>([])
  const [likedAlbums, setLikedAlbums] = useState<ItemAlbum[]>([])

  const { logout } = useAuth()

  useEffect(() => {
    const savedSongs = localStorage.getItem('likedSongs') || ''
    const savedSongsKeys = savedSongs ? Object.keys(JSON.parse(savedSongs)).join(',') : ''

    if (savedSongsKeys === '') return

    fetch(`https://api.spotify.com/v1/tracks?ids=${savedSongsKeys}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          logout()
        }
        setLikedSongs(data.tracks)
      })
  }, [])

  useEffect(() => {
    const savedAlbums = localStorage.getItem('likedAlbums') || ''
    const savedAlbumsKeys = savedAlbums ? Object.keys(JSON.parse(savedAlbums)).join(',') : ''

    if (savedAlbumsKeys === '') return

    fetch(`https://api.spotify.com/v1/albums?ids=${savedAlbumsKeys}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          logout()
        }
        setLikedAlbums(data.albums)
      })
  }, [])

  return (
    <div className='gap-4 flex flex-col'>
      {
        likedSongs.length > 0
          ? <h1 className='text-2xl font-bold text-white'>Liked Songs</h1>
          : <h1 className='text-2xl font-bold text-white'>No Liked Songs</h1>
      }
      {
        likedSongs && (
          likedSongs.map((song, idx: number) => (
            <Card key={ `${idx}-${song.id}` } className='hover:scale-105 flex transition-all hover:contrast-125 hover:shadow-2xl h-40 md:h-40'>
              <CardHeader className='w-full justify-center'>
                <img src={ song.album.images[0].url } alt={ song.name } className='size-24 md:size-40 md:p-4 max-w-none' />
              </CardHeader>
              <CardContent className='w-full p-0 flex flex-col justify-center'>
                <p className='text-md text-clip md:text-xl'>{ song.name }</p>
                <p className='text-sm'>{ song.artists[0].name }</p>
              </CardContent>
            </Card>
          ))
        )
      }

      {
        likedAlbums.length > 0
          ? <h1 className='text-2xl font-bold text-white'>Liked Albums</h1>
          : <h1 className='text-2xl font-bold text-white'>No Liked Albums</h1>
      }
      {
        likedAlbums && (

          likedAlbums.map((album, idx) => (
            <Card key={ `${idx}-${album.id}` } className='hover:scale-105 flex transition-all hover:contrast-125 hover:shadow-2xl h-40 md:h-40'>
              <CardHeader className='w-full justify-center'>
                <img src={ album.images[0].url } alt={ album.name } className='size-24 md:size-40 md:p-4 max-w-none' />
              </CardHeader>
              <CardContent className='w-full p-0 flex flex-col justify-center'>
                <p className='text-md text-clip md:text-xl'>{ album.name }</p>
                <p className='text-sm'>{ album.artists[0].name }</p>
              </CardContent>
            </Card>
          ))
        )

      }
    </div>
  )
}
