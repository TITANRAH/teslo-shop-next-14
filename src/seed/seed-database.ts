import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  // 1. Borrar registros previos
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
