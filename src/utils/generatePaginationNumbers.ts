export const generatePagination = (currentPage: number, totalPages: number) => {
  // si el numero total de paginas es de 7 o menos
  // mosraremos las paginas sin punbtos suspensivos

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1); // si tuvieramos 7 paginas [1, 2,3,4,5,6,7]
  }

  // si la pagina actual esta entre las primeras 3 paginas
  // mostrar las primeras 3, puntos suspensivos, y las ultimas 2
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages]; //si fueran 50 paginas [1,2,3, '..., 49, 50]
  }

  // si la pagina actual esta entre las ultimas 3 paginas
  // mostrar las primeras 2, puntos suspesivos, las ultimas 3 paginas

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // si la pagina actual esta en otro lugar medio
  // mostrar la priemra pagina, puntos suspensivos, la pagina actual y vecinos

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
