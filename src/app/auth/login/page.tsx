
'use client'
import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { LoginForm } from "./ui/LoginForm";

// este componente es del lado del servidor pero loginform es del lado del cliente

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>

      <LoginForm />
    </div>
  );
}
