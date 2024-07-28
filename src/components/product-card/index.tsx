"use client";
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {addToCart} from "@/redux/carts/cartSlice";
import CircularLoader from "@/components/loaders/circular-loader";
import {toast} from "react-toastify";
import React from "react";

interface ProductCardProps {
    id:number
    name: string;
    imageURL: string;
    price: string;
}

const ProductCard = (props: ProductCardProps) => {
    const { name, imageURL, price,id } = props;

    const {responseAddCart,responseAddCartLoading,responseAddCartErrors} = useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch<any>()
    const [loading, setLoading] = React.useState(false);


    const handleAddToCart = async (id: number) => {
        setLoading(true);

        try {
            const currentTime = new Date().toISOString(); // ISO 8601 format
            const result = await dispatch(addToCart({
                userId: 5,
                date: currentTime,
                products: [{ productId: id, quantity: 1 }]
            }));

            // Check if the action was successful
            if (addToCart.fulfilled.match(result)) {
                toast.success('Product added to cart successfully')
                console.log('Product added to cart successfully', result.payload);
            } else if (addToCart.rejected.match(result)) {
                toast.error( result.error.message)

                // console.error('Failed to add product to cart', result.error.message);
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }finally {
            setLoading(false);

        }
    };


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
                <button disabled={loading} onClick={()=>handleAddToCart(id)} className={'w-full py-2 rounded-xl bg-amber-400 text-black flex justify-center items-center'}>{loading?<CircularLoader/>:'Add to Card'}</button>
            </div>
        </div>
    );
}

export default ProductCard;
