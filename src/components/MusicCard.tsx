import { Link } from 'react-router-dom'
import { Card, CardHeader, CardContent, CardFooter, Button } from '@/components' // Replace 'your-library' with the actual library you're using
import { FilledHeart } from '@/components/icons/FilledHeart'
import { Heart } from 'lucide-react'
import { ItemAlbum, ItemsTrack } from '@/types/types'

interface LikedItems {
  [key: string]: boolean
}

interface MusicCardProps {
  item: ItemsTrack | ItemAlbum
  type: 'track' | 'album'
  addLikedSongOrAlbum: (id: string, type: 'track' | 'album') => void
  likedSongs?: LikedItems
  likedAlbums?: LikedItems
}

export const MusicCard: React.FC<MusicCardProps> = ({ item, type, addLikedSongOrAlbum, likedAlbums, likedSongs }) => {

  const isLiked = type === 'track' ? !!likedSongs?.[item.id] : !!likedAlbums?.[item.id]

  return (
    <Card key={ `${item.id}` } className='hover:scale-105 flex transition-all hover:contrast-125 hover:shadow-2xl h-40 md:h-40'>
      <Link to={ `/details/${item.id}` } unstable_viewTransition className='flex items-center w-full'>
        <CardHeader className='w-full'>
          {
            'images' in item ? (
              <img src={ item.images[0].url } alt={ item.name } className='size-24 md:size-40 md:p-4 max-w-none' />
            ) : (
              <img src={ item.album.images[0].url } alt={ item.name } className='size-24 md:size-40 md:p-4 max-w-none' />
            )
          }
        </CardHeader>
        <CardContent className='w-full items-center p-0'>
          <p className='text-md text-clip md:text-xl'>{ item.name }</p>
          <p className='text-sm'>{ item.artists[0].name }</p>
        </CardContent>
      </Link>
      <CardFooter className='p-0 pr-4'>
        <Button onClick={ () => addLikedSongOrAlbum(item.id, type) } className='p-0'>
          { isLiked ? <FilledHeart /> : <Heart /> }

        </Button>
      </CardFooter>
    </Card>
  )
}
