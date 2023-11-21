import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"



import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useForm } from "react-hook-form"
import { SignupValidation } from "@/lib/validation"
import { z } from "zod"
import { Loader } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"




const SignupForm = () => {

  const { toast } = useToast()
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()





  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);
    if (!newUser) {
      return toast({
        title: "Falha no cadastro",
        description: "Por favor, tente novamente.",
      });
    }
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
          Crie uma nova conta!
        </h2>

        <p className="text-light-3 small-medium md:base-regular mb-2">Por favor, preencha o formulário abaixo</p>


        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col  w-full mt-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage className="text-red italic" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome de usuário</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage className="text-red italic" />
              </FormItem>
            )}
          />
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

            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader />  Carregando...
              </div>
            ) : "Cadastrar-se"}


          </Button>



          <p className="text-small-regular text-light-2 text-center mt-2">
            Já posssui uma conta? <Link to={"/sign-in"} className="text-primary-500 hover:underline ease-in-out hover:font-bold hover:text-primary-600">Clique aqui</Link>
          </p>


        </form>
      </div>
    </Form>



  )
}

export default SignupForm