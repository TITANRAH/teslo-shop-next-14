import { CartProduct } from "@/components/interfaces";
import { create } from "zustand";

interface State {
  cart: CartProduct[];

  // addProductToCart

  addProductToCart: (product: CartProduct) => void;
  // updateProductQuantit
  // addProductToCart
  // removeproduct
}

export const useCartStore = create<State>()(
  // usando el get puedo obtener el estado actual de zustand
  (set, get) => ({
    cart: [],

    // metodos

    addProductToCart: (product: CartProduct) => {
      const { cart } = get();

      // 1. revisar si el producto existe en el carrito con la talla seleccionada

      // some encuentra un elemento segun la condicion con que ebncuentre 1 ya no sigue evualuando mas elementos
      const productInCart = cart.some(
        // si esta condicion se cumple existe el elemento en carrito
        (item) => item.id === product.id && item.size === product.size
      );

      if (!productInCart) {
        set({ cart: [...cart, product] });
      }

      // 2. se que el producto existe por talla... tengo que incrementar

      const updateCartProducts = cart.map((item) => {
        if (item.id === product.id && item.size === product.size) {
          // si llama a esta funcion tomara la cntidad y la sumara a la nueva cantidad
          return { ...item, quantity: item.quantity + product.quantity };
        }

        return item;
      });

      set({ cart: updateCartProducts });
    },
  })
);
