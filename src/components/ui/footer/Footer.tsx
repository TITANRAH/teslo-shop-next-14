import { titleFont } from "@/config/fonts";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      {/* alt + 0158 = © */}
      <Link href="/">
        <span className={`${titleFont.className} antialiased font-bold`}>
          Teslo{" "}
        </span>
        <span>| Shop </span>
        {/* siempre tengo el año actual dinamizando el dato */}
        <span>© {new Date().getFullYear()}</span>
      </Link>

      <Link href="/" className="mx-3 ">
        Privacidad & Legal
      </Link>
      <Link href="/" className="mx-3 ">
        Ubicaciones
      </Link>
    </div>
  );
};
