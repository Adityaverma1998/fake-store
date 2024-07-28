import axios from "axios";


//
// headers: {
//     Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${loginTokenStorage()}`,
//
// },
// headers2: any = {}


export const loginTokenStorage = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
};

export const http = (
    origin: string,
    headers: any = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginTokenStorage()}`,
    },
    headers1: any = {},
) => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL
    console.log('cjheck base url ',baseURL,process.env.NEXT_PUBLIC_BASE_URL)

    return axios.create({
        baseURL: baseURL,
        timeout: 4000,
        ...headers,
        ...headers1


    });
};

export const thunkHandler = async (asyncFn: any, thunkAPI: any) => {
    try {
        const response = await asyncFn;
        return response.data.meta
            ? {
                meta: response.data.meta,
                data: response.data.data,
            }
            : response.data.data ?? response.data;
    } catch (error: any) {
        if (
            error.response?.status === 400 ||
            error.response?.status === 401 ||
            error.response?.status === 403 ||
            error.response?.status === 404 ||
            error.response?.status === 409 ||
            error.response?.status === 500
        ) {
            return thunkAPI.rejectWithValue({
                type: 'error',
                status: error.response?.status,
                statusText: error.response.statusText,
                ...error.response.data,
            });
        } else {
            return thunkAPI.rejectWithValue({
                type: 'error',
                status: error?.status,
                statusText: error.statusText,
                ...error.data,
            });
        }
    }
};

