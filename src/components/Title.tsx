import { Music } from 'lucide-react'

export const Title = () => {
  return (
    <div className='flex gap-1 w-full justify-center p-4'>
      <h1 className='text-white text-5xl'>Music App</h1>
      <Music className='size-4 text-white' />
    </div>
  )
}