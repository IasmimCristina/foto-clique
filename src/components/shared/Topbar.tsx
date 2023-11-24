import { Link, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useEffect } from "react";

const Topbar = () => {

  const { mutate: signOut, isSuccess } = useSignOutAccount();

  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess, navigate]);
  

  return (
    <section className="topbar">
      <div className="flex-between py-1 px-5">
        <Link to={"/"} className='flex gap-3 items-center'>

          <img src="/assets/images/logo.png" alt="logo" width={45} />
        </Link>

        <div className="flex gap-4">



          <Link to={`/profile/${user.id}`} className='flex-center gap-3'>

            <img src={user.imageUrl || 'assets/images/profile-placeholder.svg'} alt="Perfil" className='h-8 rounded-full border-2 border-primary-500 hover:opacity-50   ease-in-out duration-300' />
          </Link>
          <Button variant="ghost" className='shad-button_ghost' onClick={() => signOut()}>

            <img src="/assets/icons/logout.svg" alt="Desconectar" height={18} width={18} />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Topbar