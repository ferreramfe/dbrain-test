import { Product } from "./product";

export class CartItem {
    refId?: string;
    category?: string;
    description?: string;
    productId?: string;
    image?: string;
    price?: number;
    rating?: string;
    title?: string;
    quantity?: number;

    constructor(product: Product) {
        this.category = product.category;
        this.description = product.description;
        this.productId = product.refId;
        this.image = product.image;
        this.price = product.price;
        this.rating = product.rating;
        this.title = product.title;
        this.quantity = 1;
    }
}
