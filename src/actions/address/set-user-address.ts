"use server";

import type { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    console.log('entro al setuseraddres action');
    
    const newAddress = await createOrReplaceAddress( address, userId );

    return {
      ok: true,
      address: newAddress,
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo grabar la dirección",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {

    console.log({ userId });

    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId: userId},
    });

    const addressToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      city: address.city,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
    };

    if (!storedAddress) {

      console.log('entro al if ');
      
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });

      console.log('newAddress desde action  ->', newAddress);
      

      return newAddress;
    }
    console.log('no entro al if y paso al update');
    const updatedAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave
    })

    return updatedAddress;



  } catch (error) {
    console.log(error);
    throw new Error("No se pudo grabar la dirección");
  }
};