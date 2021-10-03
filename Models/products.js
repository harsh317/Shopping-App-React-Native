class Product {
    constructor(id, OwnerId, name, ImageUrl, description, price) {
        this.id = id;
        this.name = name;
        this.OwnerId = OwnerId;
        this.ImageUrl = ImageUrl;
        this.description = description;
        this.price = price;
    }
}

export default Product;