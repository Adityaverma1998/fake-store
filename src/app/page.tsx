"use client"
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import React, {useEffect} from "react";
import {getProducts} from "@/redux/app/appSlice";
import {AppDispatch} from "@/redux/store";
import {useDispatch} from "react-redux";
import {IProduct} from "@/interface/products";
import ProductCard from "@/components/product-card";
import CardShimmerLoader from "@/components/loaders/card-loader";
import Header from "@/components/header";
import TabBars from "@/components/tab-bars";
import {getProductByCategory} from "@/redux/product-categories/productsCategoriesSlice";
export default function Home() {
    const {products,productLoading} = useAppSelector((state) => state.app)
    const {categoryProduct,categoryProductLoading} = useAppSelector((state) => state.categories)
    const dispatch = useAppDispatch<any>()
    const [currentCategories,setCurrentCategories] = React.useState<string>('All')

    useEffect(() => {
        (async ()=>{
            dispatch(getProducts()) ;
        })()
    }, []);


    console.log('check categoryProduct ',categoryProduct)

    useEffect(() => {
        if(currentCategories !='All'){
            (async ()=>{
                await dispatch(getProductByCategory(currentCategories))
            })()
        }

    }, [currentCategories]);



  return (
      <>
          <div className={'px-16'}>
              <Header/>


         <div className={'py-8'}>
             <TabBars  currentCategory={currentCategories} setCurrentCategory={setCurrentCategories}/>
         </div>

          {productLoading || categoryProductLoading  ?
              (
                  <div className={'flex flex-wrap gap-12 justify-between'}>
                      {Array.from({ length: 10 }).map((_, index) => (
                          <CardShimmerLoader key={index} />
                      ))}
                  </div>
              )


              :<div className={'flex flex-wrap gap-20'}>
               {currentCategories==='All' && products && products?.map((item: IProduct, index: number) => {
                  return <ProductCard key={item.id} name={item.title} imageURL={item.image} price={item.price}/>
              })}

                  {categoryProduct && categoryProduct?.map((item: IProduct, index: number) => {
                      return <ProductCard key={item.id} name={item.title} imageURL={item.image} price={item.price}/>
                  })}
          </div>

          }
          </div>

      </>
  );
}
