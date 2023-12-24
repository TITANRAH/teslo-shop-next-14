import { getOrderById } from "@/actions/order/get-order-by-id";
import { PayPalButton, Title } from "@/components";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";



interface Props {
  params: {
    id: string;
  };
}


export default async function OrdersIdPage({ params }: Props) {
  const { id } = params;

  // todo llamar server action

  const {ok, order} = await getOrderById(id);

  //todo verificar id si corresponde al usuario logueado
  //todo redireccionar en caso de que no

  if(!ok) {
    redirect('/')
  }

  // console.log({order});

  const address = order?.OrderAddress
  

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
                  "bg-red-500": !order!.isPaid,
                  "bg-green-700": order!.isPaid,
                }
              )}
            >
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Pendiente de Pago</span> */}
              <span className="mx-2">{order!.isPaid ? 'Pagada' : 'No pagada'}</span>
            </div>

            {/* items */}

            {order!.OrderItem.map((item) => (
              <div key={item.product.slug + '-' + item.size} className="flex mb-5">
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  alt={item.product.title}
                  width={100}
                  height={100}
                  className="mr-5 rounded"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />

                <div>
                  <p>{item.product.title}</p>
                  <p>${item.price} x {item.quantity}</p>
                  <p className="font-bold">Subtotal: ${currencyFormat(item.price * item.quantity) }</p>

                </div>
              </div>
            ))}
          </div>

          {/* checkout - resumen de compra*/}
          {/* caja lateral en cart */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 ">Dirección de entrega</h2>
            <div className="mb-10">
            <p className="text-xl ">
          {address!.firstName} {address!.lastName}
        </p>
        <p className="font-bold">{address!.address}</p>
        <p>{address!.address2}</p>
        <p>{address!.postalCode}</p>
        <p>
          {address!.city}, {address!.countryId}
        </p>
        <p>{address!.phone}</p>
            </div>

            {/* { DIVIDER} */}

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>
            <h2 className="text-2xl mb-2">Resumen de compra</h2>

            <div className="grid grid-cols-2">
            <span>No. Productos</span>
        <span className="text-right">
          {order!.itemsInOrder === 1 ? "Un Articulo" : `${order!.itemsInOrder}`}
        </span>
        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(order!.subTotal)}</span>
        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(order!.tax)}</span>
        <span className="text-2xl mt-5 ">Total: </span>
        <span className=" text-2xl mt-5 text-right">
          {currencyFormat(order!.total)}
        </span>
            </div>

            <div className="mt-5 mb-2 w-full">
           <PayPalButton/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
