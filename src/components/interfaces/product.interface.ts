export interface Product {
  // descomentar cuando ya la bd traiga el id cuando ya este generada la bd
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    // type: Type;
    //todo :type
    gender: Category;
  }
  
 export type Category = "men" | "women" | "kid" | "unisex"
 export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
 export type Type = "shirts" | "pants" | "hoodies" | "hats";