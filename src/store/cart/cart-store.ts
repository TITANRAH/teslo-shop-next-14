import { CartProduct } from "@/components/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  // comento la funcion me posiciono en la funcion de abajo copio y pego aca 
  // para decir que es lo que devuelve la funcion
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
};

  // addProductToCart

  addProductToCart: (product: CartProduct) => void;

  // updateProductQuantit
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  
  // removeproduct
  removeProduct: (product: CartProduct) => void;
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

      getSummaryInformation: ()=> {
        const {cart } = get();

        const subTotal = cart.reduce((subTotal, product) => (product.quantity * product.price)  + subTotal, 0)
      
        const tax = subTotal * 0.15;

        const total = subTotal + tax;

        const itemsInCart = cart.reduce((total, items) => total + items.quantity, 0)


        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        }


      
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

      // obtengo el producto y la cantidad
      updateProductQuantity: (product: CartProduct, quantity: number) => {
      //  llamo al sate de cart 
        const { cart } = get();

        // funcion para actualizar

        // si iteem.id es igual aproduct .id y lo mismo pero size actualiza ese producto y retorna 
        const updatedCartProducts = cart.map(item => {
          if(item.id === product.id && item.size === product.size){
            return {...item, quantity: quantity}
          }
          return item;
        });

        set({cart: updatedCartProducts});


      },

      removeProduct: (product: CartProduct) => {
        const { cart } = get();

        const removedCart = cart.filter((p)=> p.id !== product.id || p.size !== product.size);

        set({cart: removedCart})
      },
    }),


    {
      name: "shopping-cart",
    }
  )
);
