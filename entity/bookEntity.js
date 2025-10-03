import { v4 } from 'uuid'

class BookEntity {
    constructor(title, author, price, categoryID, stock) {
        this.id = v4();
        this.title = title;
        this.author = author;
        this.price = price;
        this.categoryID = categoryID;
        this.stock = stock;
    }
}

export { BookEntity }