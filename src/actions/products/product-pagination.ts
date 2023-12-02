"use server";

import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

// esta funcion recibe uun numero de pagina que se captura en la url
// lo toma y realiza la paginacion en skip
export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  // si no es un numero page igual 1
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // traeme los productos de la bd e incluye las iamgenes
    // obtener productos
    const products = await prisma.product.findMany({
      take: take,
      // aqui realizo la paginacion,
      // ejemplo pagina 1:
      // pagina 1 - 1 = 0 , 0 * 12 = 0
      // pagina 1 - 1 igual pagina 0 por 12 productos que es take es igual a mostrar las primeras 12
      // pero tengo validado que pagina 0 es igual a 1
      // ejemplo pagina 2
      // 2 - 1 = 1, 1 * 12 = 12 muestro los siguientes 12
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });

    // obtener el total de paginas

    // console.log("products desde actions => ", products);
    const totalCount = await prisma.product.count({});
    const totalPages = Math.ceil(totalCount / take);
    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("No se pudo cargar los productos");
  }
};
