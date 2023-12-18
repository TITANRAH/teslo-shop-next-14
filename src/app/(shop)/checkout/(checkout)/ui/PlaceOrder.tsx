"use client";

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {

  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlacingOrder, setIsPlaceOrder] = useState(false);

  const address = useAddressStore((state) => state.address);

  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlaceOrder(true);

    const productToOrders = cart.map((p) => ({
      productId: p.id,
      quantity: p.quantity,
      size: p.size,
    }));

    console.log({ address, productToOrders });

    // todo server
   const resp = await placeOrder(productToOrders, address)
    // console.log(resp);

   if(!resp.ok){
     setIsPlaceOrder(false);
     setErrorMessage(resp.message)
      return;
   }

  //  todo salio bnien
  clearCart()
  router.replace('/orders/' + resp.prismaTx?.order.id)
    
  };

  if (!loaded) {
    return <p>Cargando...</p>;
  }
  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2 ">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl ">
          {address.firstName} {address.lastName}
        </p>
        <p className="font-bold">{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* { DIVIDER} */}

      <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>
      <h2 className="text-2xl mb-2">Resumen de compra</h2>

      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? "Un Articulo" : "Articulos"}
        </span>
        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>
        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>
        <span className="text-2xl mt-5 ">Total: </span>
        <span className=" text-2xl mt-5 text-right">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Al hacer clic en {<span className="font-bold">Colocar Orden</span>},
            aceptas nuestros{" "}
            {
              <a href="/" className="underline">
                términos y condiciones
              </a>
            }{" "}
            y{" "}
            {
              <a href="/" className="underline">
                política de privacidad
              </a>
            }
            ,
          </span>
        </p>
        {/* href="/orders/123" */}
        <p className="text-red-500">{errorMessage}</p>
        <button
          onClick={onPlaceOrder}
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
        >
          Colocar Orden
        </button>
      </div>
    </div>
  );
};
