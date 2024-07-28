import {createAsyncThunk, createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import {AsyncThunkConfig} from "@reduxjs/toolkit/src/createAsyncThunk";
import {http, thunkHandler} from "@/redux/api.serivces";
import {AppDispatch,RootState} from "@/redux/store";
import axios from "axios";
import {IProduct} from "@/interface/products";


interface AsyncThunkConfig {
    rejectValue: string;
}
export const getCategories = createAsyncThunk('categories', async (_,thunkAPI) => {
    const response = await http("").get(`/products/categories`);
    /*${chatEndPoint}hr/initCreateJobPost*/
    console.log('API Response:', response.data);
    return thunkHandler(response, thunkAPI);
});

export const getProductByCategory = createAsyncThunk('category-product', async (name:string,thunkAPI) => {
    const response = await http("").get(`/products/category/${name}`);
    /*${chatEndPoint}hr/initCreateJobPost*/
    console.log('API Response:', response.data);
    return thunkHandler(response, thunkAPI);
});




interface IAppInitialState {
    categories: String[] | undefined;
    categoriesLoading: boolean;
    categoriesErrors: {} | undefined;
    categoryProduct: IProduct[] | undefined;
    categoryProductLoading: boolean;
    categoryProductErrors: {} | undefined;
   

}

const initialState: IAppInitialState = {
    categories: undefined,
    categoriesErrors: undefined,
    categoriesLoading: false,
    categoryProduct: undefined,
    categoryProductLoading: false,
    categoryProductErrors: undefined,



}


const productCategoriesSlice : Slice<IAppInitialState> = createSlice({
    name: 'productCategories',
    initialState,
    reducers: {} as any,
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.categoriesLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action: PayloadAction<any>) => {
                state.categoriesLoading = false;
                state.categories = action.payload;


            })
            .addCase(getCategories.rejected, (state, action:PayloadAction<any>) => {
                state.categoriesLoading = false;
                state.categoriesErrors = action.payload ;
            })

            .addCase(getProductByCategory.pending, (state) => {
                state.categoryProductLoading = true;
            })
            .addCase(getProductByCategory.fulfilled, (state, action: PayloadAction<any>) => {
                state.categoryProductLoading = false;
                state.categoryProduct = action.payload;


            })
            .addCase(getProductByCategory.rejected, (state, action:PayloadAction<any>) => {
                state.categoryProductLoading = false;
                state.categoryProductErrors = action.payload ;
            })
    },
});
export default productCategoriesSlice.reducer;

