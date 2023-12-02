import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { titleFont } from "@/config/fonts";
import { redirect } from "next/navigation";
// estoera para data en duro
// import { initialData } from "@/seed/seed";
// import Image from "next/image";

// esto era para data en duro
// const products = initialData.products;

// asi tomo los params en estge caso page
interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  console.log({ searchParams });

  // page es igual a los searchParams.page que ees el parseo a entero y si no es 1
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  // mando el page
  const { products, totalPages, currentPage } = await getPaginatedProductsWithImages({ page });

  console.log({  totalPages, currentPage });
  
  // si pongo una pagina que no tenga productos lo regreso a home donde mostrara los productos iniciales
  if (products.length === 0) {
    redirect("/");
  }

  // console.log('products desde page shop =>', products);

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />

      <ProductGrid products={products} />
      <Pagination totalPages={totalPages}/>
    </>
  );
}
