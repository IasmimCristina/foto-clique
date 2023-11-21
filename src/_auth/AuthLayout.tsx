import { Outlet, Navigate } from "react-router-dom"

const AuthLayout = () => {

  const isAuthenticated = false;


  return (
    <>

      {isAuthenticated ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>


          <img src="/assets/images/side-img.svg"
            alt="Logomarca"
            className="image-styling  object-cover  bg-no-repeat "
          />
          <div className="image-styling bg-primary-500  absolute right-0 opacity-25" />

        </>
      )}

    </>
  )
}

export default AuthLayout