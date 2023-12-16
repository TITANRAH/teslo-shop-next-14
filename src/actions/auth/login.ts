"use server";

import { signIn } from "@/auth.config";
// signing viene de nuestro archivo de config
import { AuthError } from "next-auth";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // console.log({ formdata:Object.fromEntries(formData)});

    // await sleep(2)

    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    console.log("entro en el try de authenticated");

    return "Success";
  } catch (error) {
    console.log("entro en el catch de authenticated =>", { error });

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "CredentialsSignin";
        default:
          return "UnknowError";
      }
    }
    throw error;
  }
}


export const login = async(email:string, password: string) => {
try {
  await signIn('credentials', {email, password})

  return {ok: true}
} catch (error) {
  console.log(error);

  return {
    ok: false,
    message: 'No se pudo iniciar sesión'
  }
  
}
}
