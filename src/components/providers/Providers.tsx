'use client'

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react";
// archivo para saber si usuario esta autenticado o no
interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {

  console.log(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);
  
  return (
    <PayPalScriptProvider options={{
       clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
       intent: 'capture',
       currency: 'USD'
       }}>
      <SessionProvider>{children}</SessionProvider>
    </PayPalScriptProvider>
  );
};
