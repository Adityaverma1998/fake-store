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
