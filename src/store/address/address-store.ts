import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
  };

  //   metodos
  // address aqui es igual a todas las propiedades definidas arriba en address
  setAddress: (address: State["address"]) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
      },

      //   EL METODO DEFINIDO TIENE COMO ARGUMENTO ADDRESS Y AQUI LO LLAMO
      //   Y LE PASO EL ADDRESS PARA QUE LLENE CON EL SET EL ADDRESS DEL STATE
      setAddress: (address) => {
        set({ address });
      },
    }),
    {
      name: "address-store",
    }
  )
);
