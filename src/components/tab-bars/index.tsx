"use client"
import {getCategories} from "@/redux/product-categories/productsCategoriesSlice";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import React, {useEffect} from "react";

interface TabBarProps {
    currentCategory: string;
    setCurrentCategory: (category: string) => void;
}

const TabBars = (props: TabBarProps) => {
    const {currentCategory, setCurrentCategory} = props;
    const {categories, categoriesLoading} = useAppSelector((state) => state.categories)
    const dispatch = useAppDispatch<any>()
    const [productCategories, setProductCategories] = React.useState<string[]>(['All'])
    // const [currentCategories,setCurrentCategories] = React.useState<string>('All')


    useEffect(() => {
        (async () => {
            await dispatch(getCategories())
        })()
    }, []);
    useEffect(() => {
        if (categories) {
            const combinedCategories = Array.from(new Set([...productCategories, ...categories]));
            setProductCategories(combinedCategories);
        }

    }, [categories]);


    return (
        <>
            {
                productCategories && productCategories.map((item: string, index) => {
                    return <button onClick={() => setCurrentCategory(item)} key={index}
                                   className={`px-8 py-4 text-black bg-transparent transition duration-300 ease-in-out uppercase ${currentCategory === item ? 'text-gray-700 border-b-4' : ''}`}> {item}</button>
                })

            }

        </>
    )
}

export default TabBars;