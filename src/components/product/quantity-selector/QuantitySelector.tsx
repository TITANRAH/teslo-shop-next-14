"use client";

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {
  // si es solo para este componente mejor usar usestate a zustand
  // al stado del componente le paso la cantidad que recibo en el componente
  const [count, setCount] = useState(quantity);

  const onQuantityChanged = (value: number) => {
    // si el count actual mas el valor que recibo es menor a 1 no hagas nada por que ya es 1
    if (count + value < 1) return;

    setCount(count + value);
  };

  return (
    <div className="flex">
      <button onClick={() => onQuantityChanged(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
        {count}
      </span>

      <button onClick={() => onQuantityChanged(+1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
