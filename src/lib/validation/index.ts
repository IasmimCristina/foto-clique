import * as z from "zod"

export const SignupValidation = z.object({
  name: z.string().min(2,{message: "Muito curto"}),
  username: z.string().min(2,{message: "Nome de usuário muito curto"}).max(50,{message: "Muito longo"}),
  email: z.string().email(),
  password: z.string().min(8, {message: "A senha deve ter pelo menos 8 caracteres."})
})
