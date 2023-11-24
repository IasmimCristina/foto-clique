import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';

const LeftSidebar = () => {

  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);
  return (
    <nav className='leftsidebar'>
      <Link to={"/"} className='flex py-4 gap-3 items-center bg-dark-1 w-full '>

        <img src="/assets/images/logo.png" alt="logo" width={80} className='ml-[30%]' />
      </Link>
      <div className="flex flex-col justify-between  h-full gap-11 px-6 py-10">

        <div className="gap-8 flex flex-col">
          <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>

            <img src={user.imageUrl || 'assets/images/profile-placeholder.svg'} alt="Perfil" className='h-14 w-14 rounded-full border-2 border-primary-500 hover:opacity-50   ease-in-out duration-300' />
            <div className="flex flex-col">
              <p className="body-bold">
                {user.name}
              </p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </Link>


          <ul className='flex   flex-col gap-6'>
            {sidebarLinks.map((link: INavLink) => {
              const isActive = pathname === link.route;

              return (
                <li key={link.label} className={`rounded-full  group leftsidebar-link ${isActive && 'bg-secondary-500 rounded-sm hover:bg-secondary-500'}`}>

                  <NavLink to={link.route} className={"flex gap-4 items-center p-4"}>
                    <img src={link.imgURL} alt={link.label} className={` group-hover:invert-white ${isActive && 'invert-white'}`} />
                    {link.label}
                  </NavLink>

                </li>
              )
            })}


          </ul>

        </div>

       
        <Button variant="ghost" className='shad-button_ghost p-7 ' onClick={() => signOut()}>

          <img src="/assets/icons/logout.svg" alt="Desconectar" />
          <p className='small-medium lg:base-medium font-bold text-red'>Desconectar</p>
        </Button>

      </div>

    </nav>
  )
}

export default LeftSidebar