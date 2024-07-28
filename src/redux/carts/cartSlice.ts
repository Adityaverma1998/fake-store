import {createAsyncThunk, createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import {AsyncThunkConfig} from "@reduxjs/toolkit/src/createAsyncThunk";
import {http, thunkHandler} from "@/redux/api.serivces";
import {AppDispatch,RootState} from "@/redux/store";
import axios from "axios";
import {IProduct} from "@/interface/products";
import {IResponseAddToCart} from "@/interface/cart";


interface AsyncThunkConfig {
    rejectValue: string;
}
export const addToCart = createAsyncThunk('carts', async (params:any,thunkAPI) => {
    const response = await http("").post(`/cart`,params);
    /*${chatEndPoint}hr/initCreateJobPost*/
    console.log('API Response:', response.data);
    return thunkHandler(response, thunkAPI);
});

export const getCart = createAsyncThunk('category-product', async (name:string,thunkAPI) => {
    const response = await http("").get(`/carts/user/2'`);
    /*${chatEndPoint}hr/initCreateJobPost*/
    console.log('API Response:', response.data);
    return thunkHandler(response, thunkAPI);
});




interface IAppInitialState {
    responseAddCart: IResponseAddToCart | undefined;
    responseAddCartLoading: boolean;
    responseAddCartErrors: {} | undefined;
    categoryProduct: IProduct[] | undefined;
    categoryProductLoading: boolean;
    categoryProductErrors: {} | undefined;


}

const initialState: IAppInitialState = {
    responseAddCart: undefined,
    responseAddCartErrors: undefined,
    responseAddCartLoading: false,
    categoryProduct: undefined,
    categoryProductLoading: false,
    categoryProductErrors: undefined,



}


const cartSlice : Slice<IAppInitialState> = createSlice({
    name: 'cart',
    initialState,
    reducers: {} as any,
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.responseAddCartLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action: PayloadAction<any>) => {
                state.responseAddCartLoading = false;
                state.responseAddCart = action.payload;


            })
            .addCase(addToCart.rejected, (state, action:PayloadAction<any>) => {
                state.responseAddCartLoading = false;
                state.responseAddCartErrors = action.payload ;
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
export default cartSlice.reducer;

