// Infer the `RootState` and `AppDispatch` types from the store itself
import {AppDispatch, store} from "@/redux/store";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@reduxjs/toolkit/query";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState<any, any, any>>()


