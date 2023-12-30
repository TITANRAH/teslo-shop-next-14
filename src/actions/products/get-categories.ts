"use server";

export const getCategories = async () => {
  try {
    const categories = await prisma?.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    // de esta forma retiro el campo productimage y puedo enviar en rel return el rest sin sa propiedad
    // const {ProductImage, ...rest} = product;

    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
};
