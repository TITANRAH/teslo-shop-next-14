'use server'
import prisma from "@/lib/prisma";

export const deleteUserAddres = async (userId: string) => {
try {
    const addresDeleted = await prisma.userAddress.delete({
        where: { userId: userId}
    })

    return {
        ok: true,
        message: 'Dirección eliminada',
        addressDeleted: addresDeleted
    }
} catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo eliminar la dirección",
    };
}
}