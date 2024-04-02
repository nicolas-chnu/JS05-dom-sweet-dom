export class ProductStore {
    products = new Map();
    orders = [];
    productStatistics = new WeakMap();
    stats = new Set();
    #onFirstProductSearch;

    constructor(onFirstProductSearch) {
        this.#onFirstProductSearch = onFirstProductSearch;
    }

    searchForProduct(searchInput) {
        if (!searchInput || searchInput.match(/^ *$/)) {
            throw new Error('Invalid search')
        }

        if (!this.stats.has(searchInput)) {
            this.stats.add(searchInput);
            this.#onFirstProductSearch(searchInput)
        }
        let product = this.#getProduct(searchInput)

        this.#onProductSearch(product)
        return product
    }

    createProduct(name, price) {
        this.#validateNewProductName(name)
        this.#validateProductPrice(price)

        let product = {name: name, price: price, quantity: 0};
        this.products.set(name, product)

        return product
    }

    updateProductPrice(name, newPrice) {
        this.#validateProductPrice(newPrice)

        let product = this.#getProduct(name);
        product.price = newPrice
    }

    addProduct(name, quantity) {
        this.#validateProductQuantity(quantity)

        let product = this.#getProduct(name);
        product.quantity += quantity;

        let order = {date: new Date(), isSell: false, productName: name, quantity: quantity}
        this.orders.push(order)

        return order;
    }

    removeProduct(name, quantity) {
        this.#validateProductQuantity(quantity)

        let product = this.#getProduct(name);

        if (quantity > product.quantity) {
            throw new Error('Not enough product in stock')
        }
        product.quantity -= quantity;

        let order = {date: new Date(), isSell: true, productName: name, quantity: quantity};
        this.orders.push(order)

        return order
    }

    #getProduct(name) {
        let product = this.products.get(name)

        if(!product) {
            throw new Error('Product not found!')
        }
        return product
    }

    #onProductSearch(product) {
        if (this.productStatistics.has(product)) {
            let oldValue = this.productStatistics.get(product)
            this.productStatistics.set(product, oldValue + 1)
            return
        }
        this.productStatistics.set(product, 1)
    }

    #validateNewProductName(value) {
        if (value === null || value.match(/^ *$/) !== null) {
            throw new Error('Name should not be empty or a whitespace')
        }

        if (this.products.has(value)) {
            throw new Error('Name is already in use!')
        }
    };

    #validateProductPrice(value) {
        if (value <= 0) {
            throw new Error('Invalid price!')
        }
    };

    #validateProductQuantity(value) {
        if (value <= 0) {
            throw new Error('Invalid quantity!')
        }
    };
}