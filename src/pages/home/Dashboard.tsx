import { Input, MusicCard } from '@/components'
import { useAuth } from '@/hooks/useAuth'
import { ItemAlbum, ItemsTrack } from '@/types/types'
import { Search } from 'lucide-react'
import { FormEvent, useEffect, useState, useRef, useCallback } from 'react'

interface LikedItems {
  [key: string]: boolean
}

export const Dashboard = () => {
  const [trendingMusic, setTrendingMusic] = useState<ItemAlbum[]>([])
  const [search, setSearch] = useState<string>('')
  const [searchResult, setSearchResult] = useState<ItemsTrack[]>([])
  const [page, setPage] = useState<number>(0)

  const [likedSongs, setLikedSongs] = useState<LikedItems>(() => {
    const localData = localStorage.getItem('likedSongs')
    return localData ? JSON.parse(localData) : {}
  })

  const [likedAlbums, setLikedAlbums] = useState<LikedItems>(() => {
    const localData = localStorage.getItem('likedAlbums')
    return localData ? JSON.parse(localData) : {}
  })

  const loader = useRef<HTMLDivElement | null>(null)

  const { logout } = useAuth()

  const handleObserver = useCallback((entities: IntersectionObserverEntry[]) => {
    const target = entities[0]
    if (target.isIntersecting) {
      setPage((prev) => prev + 1)
    }
  }, [])

  const searchMusic = (e: FormEvent<HTMLFormElement>) => {

    const token = localStorage.getItem('token')
    e.preventDefault()
    if (search.trim() !== '') {
      fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(search)}&type=track`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            logout()
          }
          setSearchResult(data.tracks.items)
        })
        .catch(() => {
          logout()
        })
    }
  }

  const addLikedSongOrAlbum = (id: string, type: 'track' | 'album') => {
    if (type === 'track') {
      setLikedSongs((prevSongs) => {
        const newLikedSongs: LikedItems = { ...prevSongs }
        if (newLikedSongs[id]) {
          delete newLikedSongs[id]
        } else {
          newLikedSongs[id] = true
        }
        localStorage.setItem('likedSongs', JSON.stringify(newLikedSongs))
        return newLikedSongs
      })
    } else if (type === 'album') {
      setLikedAlbums((prevAlbums) => {
        const newLikedAlbums: LikedItems = { ...prevAlbums }
        if (newLikedAlbums[id]) {
          delete newLikedAlbums[id]
        } else {
          newLikedAlbums[id] = true
        }
        localStorage.setItem('likedAlbums', JSON.stringify(newLikedAlbums))
        return newLikedAlbums
      })
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    })

    const currentLoader = loader.current
    if (loader.current) observer.observe(loader.current)

    return () => {
      if (currentLoader) observer.unobserve(currentLoader)
    }
  }, [handleObserver])

  useEffect(() => {
    if (search === '' && page > 0) {
      const token = localStorage.getItem('token') || ''
      const fetchURL = `https://api.spotify.com/v1/browse/new-releases?offset=${page * 20}`
      fetch(fetchURL, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            logout()
          }
          setTrendingMusic((prev) => [...prev, ...data.albums.items])
        })
    }

  }, [logout, page, search])

  return (
    <main className='flex flex-col'>
      <div>

        <form onSubmit={ searchMusic } className='mt-4'>
          <Search className='absolute left-12 top-[10rem] md:left-[11rem]' />
          <Input onChange={ (e) => setSearch(e.target.value) } placeholder='Search music...' className='pl-[2.75rem]' />
        </form>
      </div>
      <section className='my-5 flex flex-col gap-4'>
        { search === ''
          ? trendingMusic.map((album, idx) => (
            <MusicCard key={ `${idx}-${album.id}` } item={ album } type='album' likedSongs={ likedSongs } likedAlbums={ likedAlbums } addLikedSongOrAlbum={ addLikedSongOrAlbum } />
          ))
          : searchResult.map((track, idx) => (
            <MusicCard key={ `${idx}-${track.id}` } item={ track } type='track' likedSongs={ likedSongs } likedAlbums={ likedAlbums } addLikedSongOrAlbum={ addLikedSongOrAlbum } />
          )) }
        <div ref={ loader } />
      </section>

    </main>
  )
}
