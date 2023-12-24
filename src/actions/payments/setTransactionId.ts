'use server'

import prisma from "@/lib/prisma";

// aca solo guardo el id de transaccion en la orden generada 
// con el id puedo saber si pago o cuando pago etc
export const setTransactionIdtoOrder = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId: transactionId },
    });

    if (!order) {
      return {
        ok: false,
        message: `No se encontro una orden con el id ${orderId}`,
      };
    }

    return {
      ok: true,
    }
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "No se pudo actualizar la orden",
    }
  }
};
