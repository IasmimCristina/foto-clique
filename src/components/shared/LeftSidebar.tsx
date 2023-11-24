import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';

const LeftSidebar = () => {

  const { mutate: signOut, isSuccess } = useSignOutAccount();

  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);
  return (
    <nav className='leftsidebar'>
      <div className="flex flex-col gap-11">
        <Link to={"/"} className='flex gap-3 items-center'>

          <img src="/assets/images/logo.png" alt="logo" width={80} className='ml-[30%]' />
        </Link>

        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>

          <img src={user.imageUrl || 'assets/images/profile-placeholder.svg'} alt="Perfil" className='h-14 w-14 rounded-full border-2 border-primary-500 hover:opacity-50   ease-in-out duration-300' />
          <div className="flex flex-col">
            <p className="body-bold">
              {user.name}
            </p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>
      </div>
    </nav>
  )
}

export default LeftSidebar