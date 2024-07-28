import {configureStore} from "@reduxjs/toolkit";
import app from '@/redux/app/appSlice'
import categories from "@/redux/product-categories/productsCategoriesSlice"
import {useDispatch} from "react-redux";
import {RootState} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer:{
        app,
        categories
    }

});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch