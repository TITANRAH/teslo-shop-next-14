"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) ?? 1;

  // console.log({pathname, searchParams, currentPage});

  // puedo recibir numero o string
//   construccion de URL
  const createPageUrl = (pageNumber: number | string) => {
    // le paso a URLSearchParams los searchParams
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") {
        console.log('primer if');
        
      return `${pathname}?${params.toString()}`;
    }

    if(+pageNumber <= 0){
        console.log('segundo if');

        return `${pathname}`; // href='/' lo que sea que venga en el pathname
    }

    if(+pageNumber > totalPages){ // next => si le damos y el numero es mayor al total de pag quedate en donde estas
        console.log('tercer if');
        
        return `${pathname}?${params.toString()}`; //
    }
    console.log('no entro a ningun if');

    // si no se cumplen los if setea la url en su parametro page con el numero de pagina
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  return (
    <div className="flex  text-center justify-center mt-10 mb-20">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>

          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
            >
              1
            </Link>
          </li>

          <li className="page-item active">
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
              href="#"
            >
              2 <span className="visually-hidden"></span>
            </Link>
          </li>

          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
            >
              3
            </Link>
          </li>

          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
