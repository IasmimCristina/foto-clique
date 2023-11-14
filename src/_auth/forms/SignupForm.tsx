import { zodResolver } from "@hookform/resolvers/zod"



import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useForm } from "react-hook-form"
import { SignupValidation } from "@/lib/validation"
import { z } from "zod"




const SignupForm = () => {

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
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }


  return (

    <Form {...form}>



      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.png" alt="Logomarca" className="h-[160px] " />
        <h2 className="h3-bold md:h2-bold pt-4 sm:pt-8 pb-2">
          Crie uma nova conta!
        </h2>
        <p className="text-light-3 small-medium md:base-regular">Preencha o formulário abaixo</p>
      </div>
      {/* 43:54 */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>



  )
}

export default SignupForm