import { v4 } from 'uuid'

class OrderEntity {
    constructor(userID, bookID, quantity) {
        this.id = v4();
        this.userID = userID;
        this.bookID = bookID;
        this.quantity = quantity;
    }
}

export { OrderEntity }