import {createAsyncThunk, createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import {IProduct} from "@/interface/products";
import {AsyncThunkConfig} from "@reduxjs/toolkit/src/createAsyncThunk";
import {http, thunkHandler} from "@/redux/api.serivces";
import {AppDispatch,RootState} from "@/redux/store";
import axios from "axios";


interface AsyncThunkConfig {
    rejectValue: string;
}
export const getProducts = createAsyncThunk('product', async (_,thunkAPI) => {
    const response = await http("").get(`/products`);
    /*${chatEndPoint}hr/initCreateJobPost*/
    console.log('API Response:', response.data);
    return thunkHandler(response, thunkAPI);
});

export const getProductByID = createAsyncThunk('product', async (id:string,thunkAPI) => {
    const response = await http("").get(`/products/${id}`);
    /*${chatEndPoint}hr/initCreateJobPost*/
    console.log('API Response:', response.data);
    return thunkHandler(response, thunkAPI);
});




interface IAppInitialState {
    products: IProduct[] | undefined;
    productLoading: boolean;
    productErrors: {} | undefined;

}

const initialState: IAppInitialState = {
    products: undefined,
    productErrors: undefined,
    productLoading: false,
}


const appSlice : Slice<IAppInitialState> = createSlice({
    name: 'app',
    initialState,
    reducers: {} as any,
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.productLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action: PayloadAction<any>) => {
                state.productLoading = false;
                state.products = action.payload;


            })
            .addCase(getProducts.rejected, (state, action:PayloadAction<any>) => {
                state.productLoading = false;
                state.productErrors = action.payload ;
            })
    },
});
export default appSlice.reducer;

