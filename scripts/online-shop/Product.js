export class Product {
    #id;
    name;
    imageSource;

    constructor(name, price, imageSource) {
        this.#id = crypto.randomUUID();
        this.name = name;
        this.imageId = imageSource
    }

    getId() {
        return this.#id;
    }
}