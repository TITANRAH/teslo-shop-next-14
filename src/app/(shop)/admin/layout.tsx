import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

// lrc es layout abreviado
// hago este layout para que no pueda entrar a los hijos 
// que son las pag de admin, si es que no es admin
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user.role !== "admin") {
    redirect("/login");
  }
  return <>{children}</>;
}
