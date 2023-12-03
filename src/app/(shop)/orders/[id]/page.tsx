import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

export default function OrdersIdPage({ params }: Props) {
  const { id } = params;

  //todo verificar id si corresponde al usuario logueado
  //todo redireccionar en caso de que no

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      {/* esto me permite definir cuanto quiero que tenga de ancho el contenedor w-[1000px] */}
      <div className="flex flex-col w-[1000px] ">
        <Title title={`Orden #${id}`} />
        {/* quiero que sea de una sola columna y de pantallas chicas de 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}

          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": false,
                  "bg-green-700": true,
                }
              )}
            >
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Pendiente de Pago</span> */}
              <span className="mx-2">Pagado</span>
            </div>

            {/* items */}

            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="mr-5 rounded"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />

                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price}</p>

                  <button className="underline mb-3">Remover</button>
                </div>
              </div>
            ))}
          </div>

          {/* checkout - resumen de compra*/}
          {/* caja lateral en cart */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 ">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl ">Sergio Miranda</p>
              <p className="font-bold">Av Vicuña Mackenna</p>
              <p>Col. Centro</p>
              <p>Puente Alto</p>
              <p>Santiago</p>
              <p>CP 123123</p>
              <p>+56954743944</p>
            </div>

            {/* { DIVIDER} */}

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>
            <h2 className="text-2xl mb-2">Resumen de compra</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 articulos</span>
              <span>Subtotal</span>
              <span className="text-right">$ 100</span>
              <span>Impuestos (15%)</span>
              <span className="text-right">$ 100</span>
              <span className="text-2xl mt-5 ">Total: </span>
              <span className=" text-2xl mt-5 text-right">$ 100</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": false,
                    "bg-green-700": true,
                  }
                )}
              >
                <IoCardOutline size={30} />
                {/* <span className="mx-2">Pendiente de Pago</span> */}
                <span className="mx-2">Pagado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
