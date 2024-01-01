"use client";

import { Category, Product, ProductImage as ProductWithImage } from "@/interfaces";
import { useForm } from "react-hook-form";
import Image from "next/image";
import clsx from "clsx";
import { createUpdateProduct, deleteProductoImage } from "@/actions";
import { useRouter } from "next/navigation";
import { ProductImage } from "@/components";

// siempre crearme interfaces con los datos que recibo de props
// no confiarse en los modelos
interface Props {
  // puedo agregar campos a los campos de la interface
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
  categories?: Category[] | null;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string; //camisa, t-shirt, ...
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;
  images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    // con getValues puedo obtener los valores
    // obviamente deben venir pintados como el default los pinta
    // puedo hacer cosas con los valores
    getValues,
    //y set values es para meter nuevo valor
    setValue,
    //para recargar ui
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      // como son los mismos campos se hace match con el form y se llena automaticamente
      ...product,
      // como los tags son un arreglo los uno con join y les asigno una coma
      tags: product.tags?.join(", "),
      sizes: product.sizes ?? [],

      // todo images
      images: undefined,
    },
  });

  // si los sizes o tallas cambian , redibuja el componente
  watch("sizes");

  const onSizeChanged = (size: string) => {
    // para mostrar o quitar tallas
    // convierto el sizes en un set por lo que no tendra duplicados
    const sizes = new Set(getValues("sizes"));

    sizes.has(size) ? sizes.delete(size) : sizes.add(size);

    // y como size viene set lo convierto asi a array
    setValue("sizes", Array.from(sizes));

    // esta fue mi forma la de arriba fue de fernando
    // const sizes = getValues('sizes')

    // if(sizes.includes(size)){
    //   setValue('sizes', sizes.filter(s => s !==size))
    // } else {
    //   setValue('sizes', [size, ...sizes])

    // }
  };

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    // tomo la data del formulario y destructuro y separo algunas partes
    // para crear la data del form
    const { images, ...productToSave } = data;

    if (product.id) {
      formData.append("id", product.id ?? "");
    }

    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("gender", productToSave.gender);
    // console.log(images);

    // si tenemos imagenes esas imagenes seran parte de nuestro formdata
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    // generalmente destructuro funciones para rescatar el ok o el message
    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (!ok) {
      alert("Producto no se puede atualizar");
      return;
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`);

    console.log({ ok });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("price", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("tags", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("gender", { required: true })}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("categoryId", { required: true })}
          >
            <option value="">[Seleccione]</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full">Guardar</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Inventario</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("inStock", { required: true, min: 0 })}
          />
        </div>
        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                onClick={() => onSizeChanged(size)}
                className={clsx(
                  "p-2 border cursor-pointer rounded-md mr-2 mb-2 w-14 transition-all text-center",
                  {
                    "bg-blue-500 text-white": getValues("sizes").includes(size),
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              {...register("images")}
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/webp"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {product.ProductImage?.map((image) => (
              <div key={image.id}>
                <ProductImage
                  alt={product.title ?? ""}
                  src={image.url}
                  width={300}
                  height={300}
                  className="rounded-t shadow-md"
                />
                {/* como hay un form al apretar este boton intentara postear hayq ue definr que es de tipo button */}
                <button
                  type="button"
                  onClick={() => deleteProductoImage(image.id, image.url)}
                  className="btn-danger rounded-b-xl w-full"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
