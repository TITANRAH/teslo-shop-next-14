"use server";

import { PayPalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  var authToken = "";

  // aca recibo el id de transaccion rescatado en onApprove del boton
  // para verlo
  console.log({ paypalTransactionId });

  // aca recibo el authtoken de haberlo para verificar el pago
  authToken = await getPayPalBearerToken();

  console.log({ authToken });

  if (!authToken) {
    return {
      ok: false,
      message: "No se pudo verificar el token",
    };
  }

  // para verificar el pago envio el id  de transaccion y el token de acceso a la cuenta
  const resp = await verifyPayPalPayment(paypalTransactionId, authToken);

  if (!resp) {
    return {
      ok: false,
      message: "Error al verificar el pago",
    };
  }

  console.log(resp);

  // sacamos los elemenos de respuesta que nos interesan
  const { status, purchase_units } = resp;
    // saco de purchase_units lo que necesito
  // se crea al crear el pago un invoice id que me servira 
  // cuando haga la verificacion me traera el purchase y de ahi saco el orderid
  const {invoice_id: orderId} = purchase_units[0]

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "Aún no se ha pagado en PayPal",
    };
  }

  //todo realizar la actualización de del pago en bc

  try {
    console.log({ status, purchase_units });

    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });
    
    //todo revalidar el path

    revalidatePath(`/orders/${orderId}`);
  } catch (error) {
    console.log(error);
    
    return {
      ok: false,
      message: "500 - El págo no se pudo realizar",
    };
  }
  

};

// esta funcion no la exporto por que la ocupo arriba en la funcion que si exporto
const getPayPalBearerToken = async () => {
  // esto se ejecuta en el boton al pagar
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };
  try {
    // el resultado lo opaso a json y devuevlo solo el acces_token
    const result = await fetch(oauth2Url, {
      ...requestOptions,
      cache: "no-store",
    }).then((r) => r.json());
    console.log({ result });

    return result.access_token;
  } catch (error) {
    console.log("cayo en el error");

    console.log(error);
    return null;
  }
};

// llamamos a los endpoint de order y token acceso a la cuenta paypal

// asi es como tipo mis interfaces en mis respuestas

// diciendo que sera una promesa del tipo de la interface o null
const verifyPayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PayPalOrderStatusResponse | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const resp = await fetch(paypalOrderUrl, {
      ...requestOptions,
      cache: "no-store",
    }).then((r) => r.json());

    return resp;
  } catch (error) {
    console.log("cayo en el catch");

    console.log(error);

    return null;
  }
};
