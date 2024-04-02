import {ProductStore} from "./ProductStore.js";

const productListElem = document.querySelector('.js-product-list')
const statsListElem = document.querySelector('.js-stats-list')
const orderListElem = document.querySelector('.js-order-list')
const searchBtn = document.querySelector('.js-search-product__btn')
const createBtn = document.querySelector('.js-create-product-btn')
const searchBarElem = document.querySelector('#js-search-product__text')

// HTML element, Product
const productMap = new WeakMap();

class ProductMenu {
    #container
    constructor(elem) {
        this.#container = elem

        elem.addEventListener('click', (event) => {
            const button = event.target
            const action = button.dataset.action

            if (action === undefined) return

            const productElem = button.parentElement.parentElement
            this[action](productElem)
        })
    }
    edit(productElem) {
        let price = promptNumber('Enter new product price')
        let product = productMap.get(productElem)

        try {
            store.updateProductPrice(product.name, price)
            renderProduct(productElem, product)

            alert('Product updated successfully!')
        } catch (err) {
            alert(err.message)
        }
    }

    add(productElem) {
        let quantity = promptNumber('How many to add?')
        if (isNaN(quantity)) return

        let product = productMap.get(productElem)

        try {
            let order = store.addProduct(product.name, quantity)
            let orderElem = appendNewOrderElem()

            renderOrder(orderElem, order)
            renderProduct(productElem, product)     // update product quantity

            alert('Buy order created successfully!')
        } catch (err) {
            alert(err.message)
        }
    }

    remove(productElem) {
        let quantity = promptNumber('How many to add?')
        if (isNaN(quantity)) return
        let product = productMap.get(productElem)

        try {
            let order = store.removeProduct(product.name, quantity)
            let orderElem = appendNewOrderElem()

            renderOrder(orderElem, order)
            renderProduct(productElem, product)     // update product quantity

            alert('Buy order created successfully!')
        } catch (err) {
            alert(err.message)
        }
    }
}

export function appendNewStatElem() {
    let elem = document.createElement('li')

    elem.classList.add('js-stats-list__item')
    statsListElem.appendChild(elem)

    return elem
}

export function appendNewProductElem() {
    let elem = document.createElement('li')

    elem.classList.add('js-product')
    productListElem.appendChild(elem)

    return elem
}

export function appendNewOrderElem() {
    let elem = document.createElement('li')

    elem.classList.add('js-order')
    orderListElem.appendChild(elem)

    return elem
}

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

function renderProduct(productElem, product) {
    productElem.innerHTML = `<div class="js-product-info">
            <span class="js-product-info__name">${product.name}</span>
            <span class="js-product-info__price">$${product.price}</span>
            <span class="js-product-info__quantity">${product.quantity} left</span>
        </div>
        <div class="js-product-actions">
            <button data-action="edit" class="js-edit-product-btn edit-icon"></button>
            <button data-action="add" class="js-add-product-btn inbox-icon"></button>
            <button data-action="remove" class="js-remove-product-btn outbox-icon"></button>
        </div>`
}

function renderOrder(orderElem, order) {
    const orderDate = `${order.date.getHours()}:${order.date.getMinutes().toString().padStart(2, '0')}`

    orderElem.innerHTML = `<span class="js-order__time">${orderDate}</span>
        <span class="js-order__name">${order.productName}</span>
        <span class="js-order__direction" direction="${order.isSell ? 'out' : 'in'}"></span>
        <span class="js-order__quantity">${order.quantity}</span>`
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
        let productElem = appendNewProductElem()

        renderProduct(productElem, product)
        productMap.set(productElem, product)

        alert('Product created successfully!')
    } catch (err) {
        alert(err.message)
    }
}

const store = new ProductStore((productName) => {
    alert(`It's your first time searching for ${productName}!`)

    let statElem = appendNewStatElem()
    statElem.innerText = productName
});

const menu = new ProductMenu(productListElem)

createBtn.addEventListener('click', createProduct)
searchBtn.addEventListener('click', searchForProduct)