import * as z from "zod";

export const SignupValidation = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres." })
    .max(15, { message: "O nome  não pode ter mais de 15 caracteres." }),
  username: z
    .string()
    .min(2, { message: "O nome de usuário deve ter pelo menos 2 caracteres." })
    .max(10, {
      message: "O nome de usuário não pode ter mais de 10 caracteres.",
    }),
  email: z
    .string()
    .email({ message: "Por favor, insira um endereço de e-mail válido." }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, {
      message:
        "A senha deve conter pelo menos 1 letra, 1 número e ter pelo menos 8 caracteres.",
    }),
});

export const SigninValidation = z.object({
  email: z
    .string()
    .email({ message: "Por favor, insira um endereço de e-mail válido." }),
  password: z
    .string()
    .min(8, { message: "Senha inválida." }),
});

export const PostValidation = z.object({
  caption: z.string().min(5, { message: "Legenda muito curta." }).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2, { message: "Localização muito curta." }).max(100),
  tags: z.string(),
});
