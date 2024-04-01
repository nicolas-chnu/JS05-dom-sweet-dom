export class ProductUpdateDto {
    id;
    name;
    price;
    imageSource;

    constructor(id, name, price, imageSource) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageSource = imageSource;
    }
}