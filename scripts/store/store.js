import {ProductStore} from "./ProductStore.js";
import * as dh from "./dom-helpers.js";

const productListElem = document.querySelector('.product-list')
const statsListElem = document.querySelector('.stats-list')
const orderListElem = document.querySelector('.order-list')
const searchBtn = document.querySelector('.search-product__btn')
const createBtn = document.querySelector('.create-product-btn')
const searchBarElem = document.querySelector('#search-product__text')

const productMap = new WeakMap();

function promptNumber(message, valueOnCancel = NaN, validateCallback = () => true) {
    let result = NaN;
    let errorMessage = '';

    do {
        const input = prompt(errorMessage + message);

        if (input === null) {
            return valueOnCancel;
        }

        result = parseInt(input);
        errorMessage = 'Invalid input. Please, try again\n';
    } while (Number.isNaN(result) || !validateCallback(result));

    return result;
}

const store = new ProductStore((productName) => {
    if (!store.stats.has(productName)) {
        alert(`It's your first time searching for ${productName}!`)

        let statElem = dh.createStatElem()
        statElem.innerText = productName

        statsListElem.appendChild(statElem)
    }
});

function fillProductElem(productElem, product) {
    dh.fillUpProductElem(
        productElem,
        product,
        editProduct,
        addProduct,
        removeProduct)
}

function searchForProduct() {
    let searchInput = searchBarElem.value

    try {
        let product = store.searchForProduct(searchInput)
        alert(`Name: ${product.name}\nPrice: $${product.price}\nQuantity: ${product.quantity}`)
    } catch (err) {
        alert(err.message)
    }
}

function createProduct() {
    let name = prompt('Enter product name')
    if (name === null) return   // if cancelled

    let price = promptNumber('Enter product price')
    if (isNaN(price)) return    // if cancelled

    try {
        let product = store.createProduct(name, price)
        let productElem = dh.createProductElem()

        fillProductElem(productElem, product)

        productListElem.appendChild(productElem)
        productMap.set(productElem, product)

        alert('Product created successfully!')
    } catch (err) {
        alert(err.message)
    }
}

function editProduct(productElem) {
    let price = promptNumber('Enter new product price')
    let product = productMap.get(productElem)

    try {
        store.updateProductPrice(product.name, price)
        fillProductElem(productElem, product)

        alert('Product updated successfully!')
    } catch (err) {
        alert(err.message)
    }
}

function addProduct(productElem) {
    let quantity = promptNumber('How many to add?')
    if (isNaN(quantity)) return

    let product = productMap.get(productElem)

    try {
        let order = store.addProduct(product.name, quantity)
        let orderElem = dh.createOrderElem()

        dh.fillUpOrderElement(orderElem, order)
        orderListElem.appendChild(orderElem)

        fillProductElem(productElem, product)     // update product quantity

        alert('Buy order created successfully!')
    } catch (err) {
        alert(err.message)
    }
}

function removeProduct(productElem) {
    let quantity = promptNumber('How many to add?')
    if (isNaN(quantity)) return

    let product = productMap.get(productElem)

    try {
        let order = store.removeProduct(product.name, quantity)
        let orderElem = dh.createOrderElem()

        dh.fillUpOrderElement(orderElem, order)
        orderListElem.appendChild(orderElem)

        fillProductElem(productElem, product)     // update product quantity

        alert('Buy order created successfully!')
    } catch (err) {
        alert(err.message)
    }
}

createBtn.onclick = createProduct;
searchBtn.onclick = searchForProduct;