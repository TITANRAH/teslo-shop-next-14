import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function CheckoutLayout({children}: {
 children: React.ReactNode;
}) {

  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?redirectTo=/checkout/address");
  }
  return (
   <>
   {children}
   </>
  );
}

// lrc para crear rapidamente un layout
// al crear este layout las dos pantallas de checkout estaran pasando por el layout