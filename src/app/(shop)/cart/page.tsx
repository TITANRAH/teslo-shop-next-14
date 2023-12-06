import { Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSumary } from './ui/OrderSumary';
// const productsInCart = [
//   initialData.products[0],
//   initialData.products[1],
//   initialData.products[2],
// ];

export default function CartPage() {

  // despues de redirect regresa never no sigue nunca despues 
  // redirect('/empty');

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      {/* esto me permite definir cuanto quiero que tenga de ancho el contenedor w-[1000px] */}
      <div className="flex flex-col w-[1000px] ">
        <Title title="Carrito" />
        {/* quiero que sea de una sola columna y de pantallas chicas de 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}

          <div className="flex flex-col mt-5">
            <span>Agregar más items</span>
            <Link href="/" className="underline mb-5">
              Continúa comprando
            </Link>

            {/* items */}

              <ProductsInCart/>
          </div>

          {/* checkout - resumen de compra*/}
          {/* caja lateral en cart */}
          {/* h-fit ajusta la caja al contenido */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen de compra</h2>

            <OrderSumary/>

            <div className="mt-5 mb-2 w-full">
              <Link
              className="flex btn-primary justify-center"
              href="/checkout/address"
              >
              Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
