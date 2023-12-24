"use server";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  // aca recibo el id de transaccion rescatado en onApprove del boton
  // para verlo
    console.log({ paypalTransactionId });

    // aca recibo el authtoken de haberlo para verificar el pago
  const authToken = await getPayPalBearerToken();

  console.log({authToken});
  

  if(!authToken){
    return {
        ok: false,
        message:'No se pudo verificar el token'
    }
  }

};

// esta funcion no la exporto por que la ocupo arriba en la funcion que si exporto
const getPayPalBearerToken = async() => {

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
    const result = await fetch(oauth2Url, requestOptions).then((r) => r.json());

    return result.access_token;
  } catch (error) {

    console.log('cayo en el error');
    
    console.log(error);
    return null;
  }
};
