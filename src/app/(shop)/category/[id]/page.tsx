import { ProductGrid, Title } from "@/components";
import { Category } from "@/components/interfaces";
import { initialData } from "@/seed/seed";

const seedProducts = initialData.products;

interface Props {
  params: {
    id: Category;
  };
}

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function ({ params }: Props) {
  const { id } = params;
  const products = seedProducts.filter(p => p.gender === id);

  // hago este objeto y lo cruzo con id 
  // asi es como tipo con typescript que este objeto es de tipo ValidCategoryes
  const label: Record<Category, string> = {
    'men': 'para Hombres',
    'women': 'para Mujeres',
    'kid': 'para Niños',
    'unisex':'para Todos'
  }

  const subtitle: Record<Category, string> = {
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
        title={`Articulos ${label[id]}`}
        subtitle={`Productos para ${subtitle[id]}`}
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />
    </>
  );
}
