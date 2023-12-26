"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js";
import { paypalCheckPayment, setTransactionIdtoOrder } from "@/actions";

interface Props{
  orderId: string;
  amount: number;
}


export const PayPalButton = ({orderId, amount}: Props) => {

  // hook para montar el skeleton para elt iempo de espede montaje del boton de pago paypal
  const [{ isPending }] = usePayPalScriptReducer();

  // redondear monto a pasarle 
  const roundedAmount = (Math.round(amount * 100)) / 100; // numero con 2 decimales
  
  // si esta pendiente el montaje del boton de paypal mopstrar este skeleton
  if (isPending) {
    return (
      <div className="animate-pulse">
        <div className="h-11 bg-gray-300 rounded mt-2 mb-4"></div>
        <div className="h-11 bg-gray-300 rounded mt-2"></div>
      </div>
    );
  }


  // esta funcion genera el id de transaccion (id de paypal) y esta funcion la requiere el paypal buttons que retorna el componente al final
  const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

    // este action es del parametro en la funcion 
    // se crea el id de transaccion
    const transactionId = await actions.order.create({
        purchase_units: [
          {
            invoice_id:orderId,
            amount: {
              value: `${roundedAmount}`,

            }
          }
        ]
    });


    // aca en esta funcion guardo el id generado y creado anteriormente
    // siempre dentro la funcion create que esta dentro de este paypalbutton
    // siempre await 
   const { ok } = await setTransactionIdtoOrder(orderId, transactionId)

   if (!ok) {
    throw new Error('No se pudo actualizar la orden')
   }

    console.log({transactionId});
    

    return transactionId;
  }

  // acaen esta funcion obtengo los detalles de la transaccion cuando es aprobado 
  // obtengo los detalles y rescato el details.id que es el id de transaccion
  const onApprove = async( data: OnApproveData, actions: OnApproveActions) => {
   
    console.log('onApprove');
    
    const details = await actions.order?.capture();

    if(!details)return;

    // paso el id de transaccion a la funcion que el chequea el pago finalmente
    await paypalCheckPayment(details.id)
  }

  return( <PayPalButtons 
  className="fade-in"
  createOrder={createOrder}
  onApprove={onApprove}
  />)
};
