// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;
import {  getPaginatedUsers } from "@/actions";
import { Pagination, Title } from "@/components";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { UserTable } from './ui/UserTable';

export default async function OrderPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Mantenimiento de Usuarios" />

      <div className="mb-10">
        <UserTable users={users}/>

        <Pagination totalPages={3}/>
      </div>
    </>
  );
}
