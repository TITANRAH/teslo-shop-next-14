
'use server'

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma?.product.findFirst({
      include: {
        ProductImage: {
          select: {
            url: true,
          },
        },
      },

      where: {
        slug: slug,
      },
    });

    if (!product) return null;

    // de esta forma retiro el campo productimage y puedo enviar en rel return el rest sin sa propiedad
    // const {ProductImage, ...rest} = product;

    return {
      ...product,
      images: product.ProductImage.map((image) => image.url),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener producto por slug");
  }
};
