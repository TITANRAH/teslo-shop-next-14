'use client'

import {ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

// me envian el slug al punchar un producto lo recibo y busco en la data el producto
interface Props {
  params: {
    slug: string;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function({params}: Props) {

  const {slug} = params;
  const product = initialData.products.find(product => product.slug === slug);

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

        <h1 className={`${titleFont.className   }`}>{product.title}</h1>
        <p className="tex-lg mb-5">${product.price}</p>

        {/* selector de tallas  */}
        <SizeSelector
        selectedSize={product.sizes[0]}
        availableSize={product.sizes}
        />
      
        {/* selector de cantidad  */}
        <QuantitySelector
        quantity={2}
        />

        {/* buton */}

        <button className="btn-primary my-5">
            Agregar al Carrito
        </button>

        {/* descripcion */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>

    </div>
  );
}