import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"



import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useForm } from "react-hook-form"
import { SigninValidation  } from "@/lib/validation"
import { z } from "zod"
import { Loader } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import {  useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"




const SigninForm = () => {

  const { toast } = useToast()
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()





  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })


  const { mutateAsync: signInAccount, isPending } = useSignInAccount();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
  
    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if (!session) {
      return toast({ title: 'Falha no cadastro', description: "Por favor, tente novamente.", variant: "destructive" })
    }


    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate('/')
    } else {
      return toast({ title: 'Falha no login', description: 'Por favor, tente novamente.', variant: "destructive" })
    }

  }


  return (

    <Form {...form}>



      <div className="sm:w-420 flex-center flex-col py-6">
        <img src="/assets/images/logo.png" alt="Logomarca" className="lg:h-[130px] sm:h-[110px] h-[80px] md:mt-0 sm:mt-2 mt-6" />
        <h2 className="h3-bold md:h2-bold  sm:pt-4 ">
          Entre na sua conta
        </h2>

        <p className="text-light-3 small-medium md:base-regular mb-2">Olá novamente, insira seus dados abaixo</p>


        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col  w-full mt-2">
 
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

            {isUserLoading ? (
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