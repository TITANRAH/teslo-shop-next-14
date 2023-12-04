export const revalidate = 604800; //7 dias se mantendra en cache

import { getProductBySlug } from "@/actions";
import {ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
// import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import { AddToCart } from './ui/AddToCart';

// me envian el slug al punchar un producto lo recibo y busco en la data el producto
interface Props {
  params: {
    slug: string;
  }
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())
  const product = await getProductBySlug(slug)

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`],
    },
  }
}
 

export default async function ProductSlugPage({params}: Props) {

  const {slug} = params;
  // const product = initialData.products.find(product => product.slug === slug);
  const product = await getProductBySlug(slug)
  console.log(product);
  
    // si no lo encuentra mandalo a notfound, para llo debo poner una vista notfound
  if(!product){
    notFound()
  }
  return (

    // estas clases me permiten separar en dos la pantalla y darle tamaños a cada 1 
    // para movil grid col de 1 es colum y de 3  es md jhacia arriba
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      {/* slide show */}
      <div className="col-span-1 md:col-span-2">

        {/* mobil slideshow */}
        <ProductMobileSlideShow
        title={product.title}
        images={product.images}
        className="block md:hidden"
      />
        {/* desktop slideshow */}
      <ProductSlideShow
        title={product.title}
        images={product.images}
        className="hidden md:block"
      />
      </div>

      {/* detail */}
      <div className="col-span-1 px-5 ">

        <StockLabel slug={product.slug}/>
        <h1 className={`${titleFont.className   }`}>{product.title}</h1>
        <p className="tex-lg mb-5">${product.price}</p>

        <AddToCart product={product}/>

        {/* descripcion */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>

    </div>
  );
}