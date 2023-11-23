import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';

const Topbar = () => {

  const { mutate: signOut, isSuccess } = useSignOutAccount();

  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-1 px-5">
        <Link to={"/"} className='flex gap-3 items-center'>

          <img src="/assets/images/logo.png" alt="logo" width={55} />
        </Link>

        <div className="flex gap-4">

          <Button variant="ghost" className='shad-button_ghost' onClick={() => signOut()}>

            <img src="/assets/icons/logout.svg" alt="Desconectar" />
          </Button>

          <Link to={`/profile/${user.id}`} className='flex-center gap-3'>

            <img src={user.imageUrl || 'assets/images/profile-placeholder.svg'} alt="Perfil" className='h-9 rounded-full border-2 border-primary-500 hover:border-secondary-700-opacity   ease-in-out duration-300' />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Topbar