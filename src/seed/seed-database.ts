import { initialData } from "./seed";
import { countries } from './seed-countries';
import prisma from "../lib/prisma";

async function main() {
  // 1. Borrar registros previos
  // await Promise.all([
   await prisma.orderAddress.deleteMany()
   await prisma.orderItem.deleteMany()
   await prisma.order.deleteMany()
   
   
   await prisma.userAddress.deleteMany()
  
   await prisma.country.deleteMany();
   await prisma.user.deleteMany();
  //  tener cuidado si hay entidades relacionadas hay que borrar por orden
   await prisma.productImage.deleteMany();
   await prisma.product.deleteMany();
   await prisma.category.deleteMany();
  // ]);

  //Categorias

  // insersciones aveces son faciles otras hay que transformarlas
  const { categories, products, users } = initialData;
  
  // const countriesData = countries.map((country)=>{
  //   id: country.id;
  //   name: country.name;
  // })


  await prisma.user.createMany({
    data: users
  })

  await prisma.country.createMany({
    data: countries
  })

  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  console.log("categoriesData desde seed main", categoriesData);

  await prisma.category.createMany({
    data: categoriesData,
  });

  // NECESITO OBTENER LOS IDS DE LAS CATEGORIAS
  const categoriesDB = await prisma.category.findMany();
  console.log("categoriesDB desde seed main", categoriesDB);

  // este reduce realiza que por cada iteracion la primera vez el mapa
  // es un objeto vacio, llega la primera iteracion tenemos la categoria en la
  // base de datos va a tomar el mapa vacio y lo llenara con
  // creara la llave que sera category.name por ejemplo shirt
  // y esa llave apuntara a category id regreso el mapa y hara lo mismo
  // con  las siguiebntes categorias
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;

    return map;
  }, {} as Record<string, string>); //<string=shirt, string=categoryID>

  console.log("categoriesMap desde seed main", categoriesMap);

  // productos
  // desestructuro y saco images y tomo solo product y le llamo product1
  // const {images, type,...product1} = products[0];

  // necesito asegurar respetar la relacion e insertar el category id
  // al insertar un producto en base de datos
  // await prisma.product.create({
  //   data: {
  //     ...product1,
  //   }
  // })

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    // images 
    // en essta etapa ya tengo el producto en dbProduct
    // asi que facilmente tendre el id
    const imagesData = images.map(image => ({
      url: image,
      productId: dbProduct.id
    }));

    await prisma.productImage.createMany({
      data: imagesData
    });
  });


  
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
