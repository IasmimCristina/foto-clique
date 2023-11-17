import { zodResolver } from "@hookform/resolvers/zod"



import {
  Form, FormControl,  FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useForm } from "react-hook-form"
import { SignupValidation } from "@/lib/validation"
import { z } from "zod"
import { Loader } from "lucide-react"
import { Link } from "react-router-dom"




const SignupForm = () => {

  const isLoading = false;

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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);
  }


  return (

    <Form {...form}>



      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.png" alt="Logomarca" className="h-[160px] " />
        <h2 className="h3-bold md:h2-bold pt-4 sm:pt-8 pb-2">
          Crie uma nova conta!
        </h2>

        <p className="text-light-3 small-medium md:base-regular">Preencha o formulário abaixo</p>


        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
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

                <FormMessage />
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

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">

            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader />  Carregando...
              </div>
            ) : "Cadastrar-se"}


          </Button>



          <p className="text-small-regular text-light-2 text-center mt-2">
            Já posssui uma conta? <Link to={"/sign-in"} className="text-primary-500">Clique aqui</Link>
          </p>
        </form>
      </div>
    </Form>



  )
}

export default SignupForm