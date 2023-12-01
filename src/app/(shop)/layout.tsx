import { TopMenu, Sidebar, Footer } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // como es min h screen el footer se vera al final 
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar/>
      <div className="px-0 sm:px-10">{children}</div>

      <Footer/>
    </main>
  );
}


