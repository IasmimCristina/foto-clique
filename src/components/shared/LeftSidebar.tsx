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

          <img src="/assets/images/logo.png" alt="logo" width={55} />
        </Link>

        <Link to={`/profile/${user.id}`}>
        </Link>
      </div>
    </nav>
  )
}

export default LeftSidebar