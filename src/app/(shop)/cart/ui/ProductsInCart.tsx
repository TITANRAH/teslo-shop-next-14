// solo esta pequeña parte del codigo sera un client componente

"use client";

import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
    // problema de hidratacion 
    // simplemente crear la variable bolean 
    // y cambniar el valor en useEffect
  const [loaded, setLoad] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const removeProduct = useCartStore((state) => state.removeProduct);

  useEffect(() => {
    setLoad(true)
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            className="mr-5 rounded"
            style={{
              width: "100px",
              height: "100px",
            }}
          />

          <div>

            <Link 
            className="hover:underline cursor-pointer"
            href={`/product/${product.slug}`}>
            {product.title}
            </Link>
            <p>{product.title}</p>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChange={(quantity) => updateProductQuantity(product, quantity)}
            />

            <button
             className="underline mb-3"
             onClick={() => removeProduct(product)}
             >Remover</button>
          </div>
        </div>
      ))}
    </>
  );
};
