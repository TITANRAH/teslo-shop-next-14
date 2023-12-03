"use client";

import { generatePaginationNumbers } from "@/utils";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import clsx from "clsx";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageString = searchParams.get("page") ?? 1;
  // si no es un numero regresa 1 si no +pageString
  let currentPage = isNaN(+pageString) ? 1 : +pageString;

  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname);
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  // console.log({pathname, searchParams, currentPage});

  // puedo recibir numero o string
  //   construccion de URL
  const createPageUrl = (pageNumber: number | string) => {
    // le paso a URLSearchParams los searchParams
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") {
      console.log("primer if");

      return `${pathname}?${params.toString()}`;
    }

    if (+pageNumber <= 0) {
      console.log("segundo if");

      return `${pathname}`; // href='/' lo que sea que venga en el pathname
    }

    if (+pageNumber > totalPages) {
      // next => si le damos y el numero es mayor al total de pag quedate en donde estas
      console.log("tercer if");

      return `${pathname}?${params.toString()}`; //
    }
    console.log("no entro a ningun if");

    // si no se cumplen los if setea la url en su parametro page con el numero de pagina
    params.set("page", pageNumber.toString());
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

          {allPages.map((page, index) => (
            <li className="page-item" key={page + "-" + index}>
              <Link
                className={clsx(
                  "page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                  {
                    "bg-blue-500 shadow-md text-white hover:bg-blue-700 hover:text-white":
                      page === currentPage,
                  }
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

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
