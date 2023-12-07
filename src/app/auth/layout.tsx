import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // ACA TENGO LOS DATOS DE AUTENTICACION DEL USUARIO
  const session = await auth();

  // console.log({session});

  if(session?.user){
    redirect('/')
  }

  

  return (
    <main className="flex justify-center">
      {/* MOBILE FIRST PARTE DE PANTALLAS PEQUEÑÑAS EN ESTE CASO W-FULL MOBILE */}
      <div className="w-full sm:w-[350px] px-10">{children}</div>
    </main>
  );
}
