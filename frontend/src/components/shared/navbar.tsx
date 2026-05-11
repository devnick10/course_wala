import { Button } from '@/components/ui/button'
import { logout } from '@/features/auth/store/auth-slice'
import { useAppDispatch } from '@/hooks/use-app-dispatch'
import { useAppSelector } from '@/hooks/use-app-selector'
import { BookIcon, UserIcon } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Navbar: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector(s => s.auth)
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  return (
    <nav className='px-4 py-2 flex justify-between max-w-7xl w-full mx-auto bg-gray-100'>
      <div className='flex gap-1'>
        <BookIcon />
        <p>CourseWala</p>
      </div>
      <div className=' flex gap-2 items-center'>
        {!isAuthenticated && (<>
          <Button variant={'outline'} className={"bg-blue-100"}>
            <Link to={'/auth/login'}>
              Login
            </Link>
          </Button>
          <Button variant={"outline"}>
            <Link to={'/auth/register'}>
              Register
            </Link>
          </Button>
        </>)}
        {
          user && (<>
            <div className='flex gap-2 items-center'>
              <UserIcon /> <p>{user.name.charAt(0).toUpperCase()+user.name.slice(1)}</p>
              <Button onClick={() => {
                dispatch(logout())
                navigate("/")
                localStorage.removeItem("token");
              }}>
                Logout
              </Button>
            </div>
          </>)
        }
      </div>
    </nav>
  )
}
