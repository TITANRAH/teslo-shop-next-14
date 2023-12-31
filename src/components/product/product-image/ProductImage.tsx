import React from "react";
import Image from "next/image";
import placeholder from '../../../../public/imgs/placeholder.jpg'

interface Props {
  src?: string;
  alt: string;
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  width: number;
  height: number;
}

export const ProductImage = ({ src, alt, className, width, height, style }: Props) => {
 
    const localSrc = (src) 
        ? src.startsWith('http') 
            ? src 
            : `/products/${ src }` 
        : '/imgs/placeholder.jpg'
 
    return (
    <Image
      src={localSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  );
};
