import { Size } from "@/components/interfaces";
import clsx from "clsx";

// defino la prop con su tipado esto recibira el componente
interface Props {
  selectedSize?: Size;
  availableSize: Size[]; //['SX', 'M', 'XL']
  // defino que esta propiedad sera una funcion void
  // que trabajara con un size
  onSizeChanged: (size: Size) => void;
}

import React from "react";

// defino los parametros definidos en la intgerface
// y esto recibira el componente en donde esten generados estos datos
export const SizeSelector = ({ selectedSize, availableSize, onSizeChanged }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>
      <div className="flex">
        {/* recorro las tallas disponibles */}
        {availableSize.map((size) => (
          <button
            key={size}
            // envio el size que necesita la funcion 
            // y genero una accion con el boton 
            // en este caso esta mostrando un console log del size clickeado
            // entonces loq ue reciba podre trabajr con el pero lo que tiene
            // que recibir es algo de tipo size por ejem:
            // onClick={()=> onSizeChanged('hola' as Size)}
            onClick={()=> onSizeChanged(size)}
            // recibo la primera talla como selectedSize
            // esta es mi clase normal dentro de clsx y el underline solo estara si el size que recibo es igual a selectedSize
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
