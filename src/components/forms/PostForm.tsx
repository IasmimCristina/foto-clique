import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { Models } from "appwrite"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "../ui/use-toast"
import { useCreatePost } from "@/lib/react-query/queriesAndMutations";
import Loader from "../shared/Loader";



type PostFormProps = {
  post?: Models.Document
}

const PostForm = ({ post }: PostFormProps) => {
 const {toast} = useToast(); 
 const navigate = useNavigate();
  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();

  const { user } = useUserContext();
  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(',') : '',


    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    const newPost = await createPost({
      ...values,
      userId: user.id,
    })

    if (!newPost) {
      toast({
        title: "Por favor, tente novamente. "
      })
    }

    navigate('/')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Legenda</FormLabel>
              <FormControl>
                <Textarea placeholder="O que está na sua mente?" {...field} className="shad-textarea" />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Adidionar fotos</FormLabel>
              <FormControl>
                <FileUploader

                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Adicionar localização</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Adicionar tags(separadas por vírgula " , ")</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input"
                  placeholder="NextJS, Culinária, Mecânica" {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-between">
          <Button type="button" className="shad-button_dark_4">Cancelar</Button>
          <Button type="submit" className="shad-button_primary"
           disabled={isLoadingCreate }
          >
             {(isLoadingCreate ) && <Loader />}
          
            
            Postar
            </Button>

        </div>
      </form>
    </Form>
  )
}

export default PostForm