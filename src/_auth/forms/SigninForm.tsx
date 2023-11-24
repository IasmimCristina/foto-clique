import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";

import { SigninValidation } from "@/lib/validation";
import { useSignInAccount } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";




const SigninForm = () => {

  const { toast } = useToast()
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()



  // Query
  const { mutateAsync: signInAccount, isPending } = useSignInAccount();


  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })



  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    const session = await signInAccount(user);

    if (!session) {
      toast({ title: "Houve um erro. Por favor, tente novamente." });

      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      navigate("/");
    } else {
      toast({ title: "Houve um erro. Por favor, tente novamente.", });

      return;
    }
  };


  return (

    <Form {...form}>



      <div className="sm:w-420 flex-center flex-col py-6">
        <img src="/assets/images/logo.png" alt="Logomarca" className="lg:h-[130px] sm:h-[110px] h-[80px] md:mt-0 sm:mt-2 mt-6" />
        <h2 className="h3-bold md:h2-bold  sm:pt-4 ">
          Entre na sua conta
        </h2>

        <p className="text-light-3 small-medium md:base-regular mb-2">Olá novamente, insira seus dados abaixo</p>


        <form onSubmit={form.handleSubmit(handleSignin)} className="space-y-8 flex flex-col  w-full mt-2">

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>

                <FormMessage className="text-red italic" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>

                <FormMessage className="text-red italic" />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">

            {isPending || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader />  Carregando...
              </div>
            ) : "Entrar"}


          </Button>



          <p className="text-small-regular text-light-2 text-center mt-2">
            Ainda não posssui uma conta? <Link to={"/sign-up"} className="text-primary-500 hover:underline ease-in-out hover:font-bold hover:text-primary-600">Clique aqui</Link>
          </p>


        </form>
      </div>
    </Form>



  )
}

export default SigninForm