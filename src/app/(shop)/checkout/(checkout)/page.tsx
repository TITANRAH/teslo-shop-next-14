import { Title } from "@/components";
import Link from "next/link";
import Image from "next/image";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      {/* esto me permite definir cuanto quiero que tenga de ancho el contenedor w-[1000px] */}
      <div className="flex flex-col w-[1000px] ">
        <Title title="Verificar Orden" />
        {/* quiero que sea de una sola columna y de pantallas chicas de 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}

          <div className="flex flex-col mt-5">
            <span>Ajustar Elementos</span>
            <Link href="/cart" className="underline mb-5">
              Editar Carrito
            </Link>

            <ProductsInCart />
          </div>
    {/* checkout - resumen de compra*/}
          {/* caja lateral en cart */}
          <PlaceOrder/>
         
        </div>
      </div>
    </div>
  );
}
