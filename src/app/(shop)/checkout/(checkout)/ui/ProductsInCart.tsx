// solo esta pequeña parte del codigo sera un client componente

"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  // problema de hidratacion
  // simplemente crear la variable bolean
  // y cambniar el valor en useEffect
  const [loaded, setLoad] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoad(true);
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
            <span>
              {product.size} - {product.title} ({product.quantity})
            </span>

            <p className="font-bold">
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
