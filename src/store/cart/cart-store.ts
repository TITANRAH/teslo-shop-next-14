import { CartProduct } from "@/components/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  // addProductToCart

  addProductToCart: (product: CartProduct) => void;
  // updateProductQuantit
  // addProductToCart
  // removeproduct
}

export const useCartStore = create<State>()(
  // con persist mando a mi localstorage 
  // persist necesita resolver la hidratacion
  persist(
    // usando el get puedo obtener el estado actual de zustand
    (set, get) => ({
      cart: [],

      // metodos

      getTotalItems: () => {
        const {cart} = get();
        
        // barre los items del cart, la primera iteracion tiene el valor de 0 
        // si en mi carrito llevo 3 productos de la misma talla y precio como primero es 3 entonces 0 mas 3 = 3 
        // y 3 seria el nuevo valor en vez de 0
        // en la segunda iteracion el carito tiene 1 elemento entonces 1 + 3 = 4
       // en el fondo barre todos los productos toma el dato de items.quantity y los va sumando 
        // elijo una prenda y digo que llevare 3 de esa prenda por lo que la cantidad es 3 
        // pero tambien llevo una prenda 

        // entonces reduce que tiene un valor inicial de 0 que ademas es el total 
        // barre cada producto del carrito y cuenta 3 mas 0 igual 3 
        // ahora el nuevo total es 3 , va al segundo elemento y encuentra 1 en el quantity 
        // y lo suma 3 mas 1 = 4 ahora mi total va en 4 y asi sucesivamente
       
        return cart.reduce((total, items) => total + items.quantity, 0)
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        console.log("cart desde store ->", cart);

        // 1. revisar si el producto existe en el carrito con la talla seleccionada

        // some encuentra un elemento segun la condicion con que ebncuentre 1 ya no sigue evualuando mas elementos
        const productInCart = cart.some(
          // si esta condicion se cumple existe el elemento en carrito
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
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
    }),
    {
      name: "shopping-cart",
    }
  )
);
