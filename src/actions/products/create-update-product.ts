"use server";

import { Gender, Product, Size } from "@prisma/client";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(", ")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  //   console.log(formData);
  // como esto ahora viene asi {name: id, value: 1231} lo saco on Object.formentries
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  console.log(productParsed.success);

  if (!productParsed.success) {
    console.log("cayo en el if linea 35 createUpdateProduct");

    console.log(productParsed.error);
    return { ok: false };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  const { id, ...rest } = product;

  try {
    //   TRASANCCION PRISMA
    const prismaTx = await prisma.$transaction(async (tx) => {
      // si no viene un id entonces es crear si viene actualizar
      let product: Product;

      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());
      if (id) {
        console.log("editar");
        //actualizar
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: rest.tags.split(","),
            },
          },
        });
      } else {
        console.log("crear");

        //crear
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      console.log({ product });

      // proceso de carga y guardado de Imagenes
      // recorrer las imagenes y guardarlas

      if (formData.getAll("images")) {
        const images = await uploadImages(formData.getAll("images") as File[]);
        console.log(images);
        if (!images) {
          throw new Error("No se pudo cargar imagenes");
        }

        await prisma.productImage.createMany({
          data: images.map((image) => ({ 
            url: image!, 
            productId: product.id 
          })),
        });
      }

      return {
        product,
      };
    });

    //todo revalidar path
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      product: prismaTx.product,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Revisar los logs, no se pudo actualizar",
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);

        return null;
      }
    });

    const uploadedImage = await Promise.all(uploadPromises);
    return uploadedImage;
  } catch (error) {
    console.log(error);

    return null;
  }
};
