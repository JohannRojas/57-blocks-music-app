import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components'
import { Button } from '@/components'
import { useAuth } from '@/hooks/useAuth'

export const Navbar = () => {

  const { logout } = useAuth()

  return (
    <>
      <NavigationMenu className='max-w-none gap-10 w-full justify-around'>
        <NavigationMenuList className='flex gap-4 w-full'>
          <NavigationMenuItem >
            <NavigationMenuLink href="/dashboard" className='text-white'>Dashboard</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem >

            <NavigationMenuLink href="/liked-songs" className='text-white'>Liked Songs</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList >
        <Button type='button' onClick={ logout } className='text-white'>Logout</Button>
      </NavigationMenu >
    </>
  )
}