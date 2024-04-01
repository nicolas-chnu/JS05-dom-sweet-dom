import {Product} from "./Product.js";

export class ProductsService {
    products = [];

    get(id) {
        return this.products.find(p => p.getId() === id)
            ?? throw new Error('Not found')
    }

    getAll(productNameFilter) {
        let products = this.products
            .filter(p => p.name.toLowerCase().includes(productNameFilter.toLowerCase()))

        let totalPrice = this.products.map(p => p.price).reduce((a, b) => a + b)

        return {
            products: products,
            totalPrice: totalPrice
        }
    }

    add(dto) {
        if (dto.name === null || dto.name.match(/^ *$/)) {
            throw new Error('Invalid product name')
        }

        if (typeof dto.price !== 'number' || dto.price < 0) {
            throw new Error('Invalid product price')
        }

        if (dto.imageSource === null || dto.imageSource.match(/^ *$/)) {
            throw new Error('Invalid product name')
        }

        let image = new Product(dto.name, dto.price, dto.imageSource)
        this.products.push(image)

        return image.getId()
    }

    update(dto) {
        if (dto.name === null || dto.name.match(/^ *$/)) {
            throw new Error('Invalid product name')
        }

        if (typeof dto.price !== 'number' || dto.price < 0) {
            throw new Error('Invalid product price')
        }

        if (dto.imageSource === null || dto.imageSource.match(/^ *$/)) {
            throw new Error('Invalid product name')
        }

        let image = this.get(dto.id)

        image.name = dto.name
        image.price = dto.price
        image.imageSource = dto.imageSource
    }

    delete(id) {
        let index = this.products.findIndex(p => p.getId() === id);
        this.products.splice(index, 1)
    }
}