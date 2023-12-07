import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }
  return (
    <div>
      <Title title="Perfil" />

      {JSON.stringify(session.user, null, 2)}
    </div>
  );
}
