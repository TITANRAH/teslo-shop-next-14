import { Size } from "@/components/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize: Size;
  availableSize: Size[]; //['SX', 'M', 'XL']
}

import React from "react";

export const SizeSelector = ({ selectedSize, availableSize }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>
      <div className="flex">
        {availableSize.map((size) => (
          <button
            key={size}
            // recubo la primera talla como selectedSize
            // esta es mi clase normal dentro de clsx y el underline solo estara si el size es igual a selectedSize
            className={clsx("mx-2 hover:underline text-lg font-bold", {
              'underline': size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
