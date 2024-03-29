import {ProductStore} from "./ProductStore.js";
import * as dh from "./dom-helpers.js";

const productListElem = document.querySelector('.product-list')
const statsListElem = document.querySelector('.stats-list')
const orderListElem = document.querySelector('.order-list')
const searchBtn = document.querySelector('.search-product-btn')
const createBtn = document.querySelector('.create-product-btn')
const searchBarElem = document.querySelector('#product-search__text')

const productMap = new WeakMap();
const statsMap = new Map();

function promptNumber(message, validateCallback = () => true) {
    let num = parseInt(prompt(message))
    while (isNaN(num) || !validateCallback(num)) {
        num = parseInt(prompt('Invalid input. Try again\n' + message))
    }
    return num
}

const store = new ProductStore((productName) => {
    if (!statsMap.has(productName)) {
        alert(`It's your first time searching for ${productName}!`)

        let statElem = dh.createStatElem()
        statElem.innerText = productName

        statsListElem.appendChild(statElem)
        statsMap.set(productName, statElem)
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
    let price = promptNumber('Enter product price')

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