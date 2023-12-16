"use client";

export const PlaceOrder = () => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2 ">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl ">Sergio Miranda</p>
        <p className="font-bold">Av Vicuña Mackenna</p>
        <p>Col. Centro</p>
        <p>Puente Alto</p>
        <p>Santiago</p>
        <p>CP 123123</p>
        <p>+56954743944</p>
      </div>

      {/* { DIVIDER} */}

      <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>
      <h2 className="text-2xl mb-2">Resumen de compra</h2>

      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">3 articulos</span>
        <span>Subtotal</span>
        <span className="text-right">$ 100</span>
        <span>Impuestos (15%)</span>
        <span className="text-right">$ 100</span>
        <span className="text-2xl mt-5 ">Total: </span>
        <span className=" text-2xl mt-5 text-right">$ 100</span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Al hacer clic en {<span className="font-bold">Colocar Orden</span>},
            aceptas nuestros{" "}
            {
              <a href="/" className="underline">
                términos y condiciones
              </a>
            }{" "}
            y{" "}
            {
              <a href="/" className="underline">
                política de privacidad
              </a>
            }
            ,
          </span>
        </p>
        {/* href="/orders/123" */}
        <button className="flex btn-primary justify-center" >
          Colocar Orden
        </button>
      </div>
    </div>
  );
};
