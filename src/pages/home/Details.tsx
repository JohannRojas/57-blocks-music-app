import { Button, Card, CardHeader } from '@/components'
import { useAuth } from '@/hooks'
import { ItemAlbum } from '@/types/types'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const Details = () => {

  const { id } = useParams()
  const [albumInfo, setAlbumInfo] = useState<ItemAlbum>()

  const navigate = useNavigate()

  const { logout } = useAuth()

  useEffect(() => {

    const token = localStorage.getItem('token')

    fetch(`https://api.spotify.com/v1/albums/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          logout()
        }
        setAlbumInfo(data)
      })

    return () => {
      setAlbumInfo(undefined)
    }
  }, [id, navigate])


  return (
    <>
      <Button onClick={ () => navigate(-1) } className='text-white'>
        <ArrowLeft color="#fff" strokeWidth={ 1.75 } />
      </Button>
      <main className=' gap-10 mt-10 md:flex'>
        <section className='md:w-[24rem] mb-10 flex flex-col justify-center items-center md:justify-start'>

          <img src={ albumInfo?.images[0].url } alt="Album Image" className='size-60 rounded-lg shadow-xl mb-4 hover:scale-105 flex transition-all hover:contrast-125 hover:shadow-2xl aspect-square' />
          <h1 className='text-4xl text-white'>Album: { albumInfo?.name }</h1>
          <h3 className='text-2xl text-white'>Artist: { albumInfo?.artists[0].name }</h3>


          <p className='text-white'>Release Date: { albumInfo?.release_date }</p>
          <p className='text-white'>Popularity: { albumInfo?.popularity }</p>
        </section>

        <section className='w-full h-full flex flex-col gap-2'>
          {
            albumInfo?.tracks?.items.map((track) => (
              <Card key={ track.id } className='flex justify-between items-center hover:scale-105 transition-all hover:contrast-125 hover:shadow-2xl'>
                <CardHeader>
                  <p>{ track.name }</p>
                  <p className='text-sm'>{ track.artists[0].name }</p>
                </CardHeader>
              </Card>
            ))
          }
        </section>
      </main>
    </>
  )
}