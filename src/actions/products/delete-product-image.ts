"use server";

import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteProductoImage = async (
  imageId: number,
  imageUrl: string
) => {
  console.log("entro a delete", imageId, imageUrl);

  if (!imageUrl.startsWith("https")) {
    console.log("quedoe ne l if", imageUrl);

    return {
      ok: false,
      error: "No se pueden eliminar las imagenes",
    };
  }

  // traigo el ultimo trozo de url para tener el identificador de la foto en clouddinary
  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";

  console.log({ imageName });

  try {
    await cloudinary.uploader.destroy(imageName);
    const deletedImagePrisma = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });
    revalidatePath(`/admin/product`)
    revalidatePath(`/admin/product/${deletedImagePrisma.product.slug}`)
    revalidatePath(`/product/${deletedImagePrisma.product.slug}`)
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "No se pudo eliminar la imagen",
    };
  }
};
