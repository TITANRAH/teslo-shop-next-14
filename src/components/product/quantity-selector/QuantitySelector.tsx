"use client";


import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantityChange: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChange }: Props) => {
  // si es solo para este componente mejor usar usestate a zustand
  // al stado del componente le paso la cantidad que recibo en el componente
  // const [count, setCount] = useState(quantity);

  const onValueChanged = (value: number) => {
    // si el count actual mas el valor que recibo es menor a 1 no hagas nada por que ya es 1
    if (quantity + value < 1) return;

    // esto funciona al igual que el size selector 
    // de hijo informando al padre 
    // el valor que le paso aca a esta funcion es el nuevo valor de quantity 
    // y quantity esta en el padre como un useState 
    // y la funcion onQuantityChange es setQuantity 
    // solo que aca se llama onQuantityChange 
    // si aqui le paso un 10 por ejem en duro tomara el 10 y lo mostrara en el componente 
    // pero en vez de eso le estoy pasando quantity que parte commo un 1 mas 1 o menos 1
    // y eso actualiza la variable quantity y aqui la vuelvo a cambiar 
    // en caso de sumar o restar 
    // por eso en el componente padre lo represente como q => setQuantity(q) asi 
    // actualizo quantity en el padre que es addtocart
    onQuantityChange(quantity + value);
  };

  return (
    <div className="flex">
      <button onClick={() => onValueChanged(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
        {quantity}
      </span>

      <button onClick={() => onValueChanged(+1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
