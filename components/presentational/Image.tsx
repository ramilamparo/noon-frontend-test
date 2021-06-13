import NextImage from "next/image";

export interface ImageProps {
	src: string;
	alt: string;
	className?: string;
}

export const Image = ({ src, alt, className }: ImageProps) => {
	return <NextImage className={className} layout="fill" src={src} alt={alt} />;
};
