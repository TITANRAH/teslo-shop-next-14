import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
  params: {
    slug: string;
  };
}

// prc para crear este componente
export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const [product, categories] = await Promise.all([

    getProductBySlug(slug),
    getCategories()
  ]);

  
  //   //todo: new
  // if( !product) {
  //   redirect('admin/products')
  // }

  const title = slug === 'new' ? 'Nuevo Producto' : 'Editar Producto'

  return (
    <>
      <Title title={title} />

      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}
