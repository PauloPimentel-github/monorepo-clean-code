import Item from "./Item";
import Product from "./Product";

export default class Order {

    items: Item[];
    total = 0;

    constructor(readonly cpf: string) {
        this.items = [];
    }

    addItem(product: Product) {
        const existsItem = this.items.find((item: Item) => item.idProduct === product.idProduct);
        if (existsItem) {
            existsItem.incrementQuantity();
        } else {
            this.items.push(new Item(product.idProduct));
        }
        this.total += product.price;
    }
}
