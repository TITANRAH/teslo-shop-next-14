'use server'

import { signIn } from '@/auth.config';
import { sleep } from '@/utils';
// signing viene de nuestro archivo de config
import { AuthError } from 'next-auth';

 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {

    // console.log({ formdata:Object.fromEntries(formData)});

    // await sleep(2)
    
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {


      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}