"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import { Product, Size } from "@/components/interfaces";

import { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [sizeState, setSize] = useState<Size | undefined>();
  const [quantityState, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if (!sizeState) return;
    console.log({ sizeState, quantityState, product });

    // todo add to cart
  };

  return (
    <>
      {posted && !sizeState && (
        <span className="mt-2 fade-in text-red-500">Debe seleccionar una talla*</span>
      )}

      {/* selector de tallas  */}
      <SizeSelector
        selectedSize={sizeState}
        availableSize={product.sizes}
        // este parametro es el que esta recibiendo el componente
        // entonces lo que reciba en este caso le puse size pero lo que reciba lo mostrara
        // onSizeChanged={size => console.log(size)}
        // le paso al setsize el parametro por loq ue el size sleeccionado sera el sizeState
        onSizeChanged={(size) => setSize(size)}
      />

      {/* selector de cantidad  */}
      <QuantitySelector
        quantity={quantityState}
        onQuantityChange={(q) => setQuantity(q)}
      />

      {/* buton */}

      <button className="btn-primary my-5" onClick={() => addToCart()}>
        Agregar al Carrito
      </button>
    </>
  );
};
