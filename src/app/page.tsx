"use client"
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {useEffect} from "react";
import {getProducts} from "@/redux/app/appSlice";
import {AppDispatch} from "@/redux/store";
import {useDispatch} from "react-redux";
export default function Home() {
    const {products} = useAppSelector((state) => state.app)
    const dispatch = useAppDispatch<any>()

    useEffect(() => {
        (async ()=>{
            dispatch(getProducts()) ;
        })()
    }, []);


    console.log('check products ',products)

    useEffect(() => {
        if(products){
            console.log('check products ',products)
        }

    }, [products]);
  return (
      <>
      <h1>hello</h1>
      </>
  );
}
