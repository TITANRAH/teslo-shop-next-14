"use server";

import prisma from "@/lib/prisma";
import { sleep } from "@/utils";

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    // await sleep(3);
    const stock = await prisma.product.findFirst({
      // busca donde este el slug y traeme el campo inStock
      where: { slug: slug },
      select: { inStock: true },
    });

    //  regresa el stock.inStock o 0
    return stock?.inStock ?? 0;
  } catch (error) {
    return 0;
  }
};
