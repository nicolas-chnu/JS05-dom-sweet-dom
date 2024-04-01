export class ProductCreateDto {
    name;
    price;
    imageSource;

    constructor(name, price, imageSource) {
        this.name = name;
        this.price = price;
        this.imageSource = imageSource;
    }
}