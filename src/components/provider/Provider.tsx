import { SessionProvider } from 'next-auth/react'
import React from 'react'
// archivo para saber si usuario esta autenticado o no
interface Props {
    children: React.ReactNode;
}

export const Provider = ({children}: Props) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}
