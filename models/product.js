class Product {
    constructor(id, ownerId, title, imageUrl, description, price, address) {
        this.id = id;
        this.ownerId = ownerId;
        this.imageUrl = imageUrl;
        this.title = title;
        this.description = description;
        this.price = price;
        this.address = address;

    }
}

export default Product;