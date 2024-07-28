"use client";
import Image from "next/image";

interface ProductCardProps {
    name: string;
    imageURL: string;
    price: string;
}

const ProductCard = (props: ProductCardProps) => {
    const { name, imageURL, price } = props;

    return (
        <div className=" overflow-hidden rounded-lg shadow-md bg-white w-[300px] aspect-w-9 aspect-h-16]  ">
            <div className="relative w-full h-48 sm:h-64 md:h-72 lg:h-80">
                <Image
                    src={imageURL}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                />
            </div>
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
                <p className="mt-2 text-gray-600">${price}</p>
            </div>
        </div>
    );
}

export default ProductCard;
