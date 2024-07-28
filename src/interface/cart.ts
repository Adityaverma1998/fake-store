interface Product {
    productId: number;
    quantity: number;
}

export interface IResponseAddToCart {
    id: number;
    userId: number;
    date: string;
    products: Product[];
}

export interface ICartItems {
    id: number;
    userId: number;
    date: string;
    products: Product[];
}

