import {createAsyncThunk, createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import {AsyncThunkConfig} from "@reduxjs/toolkit/src/createAsyncThunk";
import {http, thunkHandler} from "@/redux/api.serivces";
import {AppDispatch,RootState} from "@/redux/store";
import axios from "axios";
import {IProduct} from "@/interface/products";
import {ICartItems, IResponseAddToCart} from "@/interface/cart";


interface AsyncThunkConfig {
    rejectValue: string;
}
export const addToCart = createAsyncThunk('carts', async (params:any,thunkAPI) => {
    const response = await http("").post(`/carts`,params);
    /*${chatEndPoint}hr/initCreateJobPost*/
    console.log('API Response:', response.data);
    return thunkHandler(response, thunkAPI);
});

export const getCart = createAsyncThunk('get-carts', async (_,thunkAPI) => {
    const response = await http("").get(`/carts/user/1`);
    /*${chatEndPoint}hr/initCreateJobPost*/
    console.log('API Response:', response.data);
    return thunkHandler(response, thunkAPI);
});




interface IAppInitialState {
    responseAddCart: IResponseAddToCart | undefined;
    responseAddCartLoading: boolean;
    responseAddCartErrors: {} | undefined;
    carts: ICartItems[] | undefined;
    cartsLoading: boolean;
    cartsErrors: {} | undefined;
    totalCartItems:number;


}

const initialState: IAppInitialState = {
    responseAddCart: undefined,
    responseAddCartErrors: undefined,
    responseAddCartLoading: false,
    carts: undefined,
    cartsLoading: false,
    cartsErrors: undefined,
    totalCartItems:0



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
                // state.totalCartItems += action.payload.products.reduce((total, product) => total + product.quantity, 0);



            })
            .addCase(addToCart.rejected, (state, action:PayloadAction<any>) => {
                state.responseAddCartLoading = false;
                state.responseAddCartErrors = action.payload ;
            })

            .addCase(getCart.pending, (state) => {
                state.cartsLoading = true;
            })
            .addCase(getCart.fulfilled, (state, action: PayloadAction<any>) => {
                state.cartsLoading = false;
                state.carts = action.payload;
                state.totalCartItems = action.payload.reduce((total, order) => {
                    return total + order.products.reduce((orderTotal, product) => orderTotal + product.quantity, 0);
                }, 0);

            })
            .addCase(getCart.rejected, (state, action:PayloadAction<any>) => {
                state.cartsLoading = false;
                state.cartsErrors = action.payload ;
            })
    },
});
export default cartSlice.reducer;

