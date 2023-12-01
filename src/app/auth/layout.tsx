export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center">
      {/* MOBILE FIRST PARTE DE PANTALLAS PEQUEÑÑAS EN ESTE CASO W-FULL MOBILE */}
      <div className="w-full sm:w-[350px] px-10">{children}</div>
    </main>
  );
}
