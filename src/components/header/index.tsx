import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {useEffect} from "react";
import {getProducts} from "@/redux/app/appSlice";
import {getCart} from "@/redux/carts/cartSlice";

const Header = ()=>{
    const { totalCartItems}= useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch<any>()

    useEffect(() => {
        (async ()=>{
           await dispatch(getCart()) ;
        })()
    }, []);

    return(
        <>
            <div className={'flex justify-between items-center py-8'}>
                <h1 className={'text-4xl'}>Fake Store</h1>
                <p>Cart :{totalCartItems} </p>
            </div>
        </>
    )
}

export default Header;