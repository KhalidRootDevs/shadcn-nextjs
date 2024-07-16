'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function handleLogin(data: any, callbackUrl: string | null) {
  try {
    signIn('credentials', {
      email: data.email,
      redirectTo: '/dashboard'
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credential' };
        case 'CallbackRouteError':
          return { error: 'Invalid callback route' };
        default:
          return { error: 'Something went wrong' };
      }
    }
    throw error;
  }
}
