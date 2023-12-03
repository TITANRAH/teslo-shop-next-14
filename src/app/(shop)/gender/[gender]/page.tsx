
export const revalidate = 60;
// esto hace una revalidacion de ruta por ejem 
// si cambio un precio e base de datos y pasa 1 min y navego a cualquier lado 
// y vuelvo a la pagina aparecera el nuevo precio
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";




// obtengo el gender de parametros
interface Props {
  params: {
    gender: string;
  };
  searchParams : {
    page? : string;
  }
}

export default async function GenderPage({ params, searchParams }: Props)  {
  const { gender } = params;

   // page es igual a los searchParams.page que ees el parseo a entero y si no es 1
   const page = searchParams.page ? parseInt(searchParams.page) : 1;

   // mando el page
   const { products, totalPages, currentPage } = await getPaginatedProductsWithImages({ 
    page,
    gender: gender as Gender
   });
 
   console.log({  totalPages, currentPage });
   
   // si pongo una pagina que no tenga productos lo regreso a home donde mostrara los productos iniciales
   if (products.length === 0) {
     redirect(`/gender/${gender}`);
   }


  // hago este objeto y lo cruzo con id 
  // asi es como tipo con typescript que este objeto es de tipo ValidCategoryes
  const label: Record<string, string> = {
    'men': 'para Hombres',
    'women': 'para Mujeres',
    'kid': 'para Niños',
    'unisex':'para Todos'
  }

  const subtitle: Record<string, string> = {
    'men': 'el',
    'women': 'ellas',
    'kid': 'ellos',
    'unisex':'todos'
  } 

  // if(id === 'kids'){
  //   notFound()
  // }

  return (
    <>
      <Title 
        title={`Articulos ${label[gender]}`}
        subtitle={`Productos para ${subtitle[gender]}`}
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />

      <Pagination totalPages={totalPages}/>
    </>
  );
}
