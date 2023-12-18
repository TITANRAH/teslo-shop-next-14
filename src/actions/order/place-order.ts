"use server";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  // es preferible tomar el id del lado del servidor
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: "No hay sesión de usuario",
    };
  }

  // Obtener la informacion de productos
  // Nota: se pueden llevar 2 o mas productos del mismo id
  // console.log(productIds, address, userId);

  // busca todos los roductos en la tabla que cuyo id sea igual a productId
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // console.log(products);

  // calcular los montos

  //   primero cuantos oproductos son en total
  // esto es 0 + 1 = 1 primera vuelta el cero es 1
  // 1 + 1 = 2 segunda vuelta el 1 es 2
  // 2 + 1 = 3 tercerta vuelta el 2 es 3
  // 3 + 1 = 4 cuarta vuelta el 3 es 4
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  // console.log(itemsInOrder);

  // los totales de tax subtotal total

  const { subTotal, tax, total } = productIds.reduce(
    // al declarar estas variables puedo decir totals.tax .total . subtotal ya que reduce barre cada producto en cuestion en este caso
    // los productos productIds que vienen por parametro
    (totals, item) => {
      // cuantos productos estoy llevando
      const productQuantity = item.quantity; // = 4

      // imformacion del productgo como tal
      // esto regresa un produycto y su info
      const product = products.find((product) => product.id === item.productId);
      if (!product) throw new Error(`${item.productId} no existe - 500`);

      //  sub total
      const subTotal = product.price * productQuantity; // ekl precio de un producto por la cantidad de ese mismo producto si lleva 2 de 35 un producto dara 70 y asi con el resto

      console.log({ subTotal });

      // esto me entrega el subtotal de cada producto
      totals.subTotal += subTotal; // totals.subTotal = totals.subTotal + subTotal;

      console.log("subtotal", totals.subTotal);
      // esto me entrega el tax de cada producto
      totals.tax += subTotal * 0.15;
      // esto me entrega el total de cada producto
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  // console.log({subTotal, tax, total});

  // crear transaccion de base de datos insertar entablas

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos

      // arreglo de transacciones
      const updateProductPromises = products.map(async (product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            // inStock: product.inStock - productQuantity no hacer
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      // encierro las promesas de actualizacion en esta constante
      const updateProducts = await Promise.all(updateProductPromises);

      // verificar valores negativos en la existencia = no hay stock
      updateProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`);
        }
      });

      // 2. Crear la orden - Encabezado - Detalles

      // creamos la data en la bd
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,
          isPaid: false,

          // esto crea la dataen la tabla relacionada que es OrderItem
          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // validar si el price es 0 lanzar un error
      // address

      // 3. Crear la direccion de la orden

      // destrcturo la direccion
      const { country, ...restAddress } = address;

      // creo en bd la direccion de orden
      const orderAddress = await tx.orderAddress.create({
        data: {
          // la data sera el resto de direccion , cuntry y el orderId que viene de order de arriba
          ...restAddress,
          // como no viene countryId en el resto de direccion le pasamos al campo countryId el country de la direccion
          countryId: country,
          // el schemadiorden tiene id por lo tanto el const de arriba contiene el order.id
          orderId: order.id,
        },
      });

      return {
        updateProducts: updateProducts,
        order: order,
        orderAddress: orderAddress,
      };
    });

    return {
        ok: true,
        order: prismaTx.order.id,
        prismaTx: prismaTx
    }
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
