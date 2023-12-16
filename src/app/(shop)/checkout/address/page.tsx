import { Title } from "@/components";
import Link from "next/link";
import { AddressForm } from "./ui/AddressForm";
import { getCountries } from "../../../../actions/country/get-countries";
import { auth } from "@/auth.config";
import { getUserAddress } from "@/actions";

// al no estar especiifado es un server component si no seria use client
// por lo que puedo llamar mis actions que son use server sin problema

export default async function AddresPage() {
  const countries = await getCountries();
  const session = await auth();

  if(!session?.user){
    return (
      <h3 className="text-5xl">500 No hay sesión de Usuario</h3>
    )
  }

  const userAddress = await getUserAddress(session.user.id);
  // puedo trabajar con la interface o modelo de prisma pero preferible 
  // crear una interface
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm 
           countries={countries}
           userStoreAddress={userAddress || {}}
        />
      </div>
    </div>
  );
}
