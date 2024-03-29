import {ProductStore} from "./ProductStore.js";

const onFirstProductSearch = (product) => alert('It\'s your first time searching for ' + product);
const store = new ProductStore(onFirstProductSearch);

const productListElem = document.querySelector('.product-list')
const searchStringListElem = document.querySelector('.search-string-list')
const orderListElem = document.querySelector('.order-list-container')
const searchBtn = document.getElementById('search')
const createBtn = document.getElementById('create')

const productElems = new WeakMap();
const searchStringElems = new WeakMap();
const orderElems = new WeakMap();

function createProduct() {
    let name = prompt('Enter product name')
    let price = promptNumber('Enter product price')

    try {
        let product = store.createProduct(name, price)

        const li = document.createElement('li');
        const liName = document.createElement('span');
        const liPrice = document.createElement('span');
        const liUpdateBtn = document.createElement('button');
        const liAddBtn = document.createElement('button');
        const liRemoveBtn = document.createElement('button');

        liName.innerText = product.name
        liPrice.innerText = product.price
        liUpdateBtn.innerText = 'Update'
        liAddBtn.innerText = 'Add'
        liRemoveBtn.innerText = 'Remove'

        liUpdateBtn.onclick = () => updateProduct(product)
        liAddBtn.onclick = () => addProduct(product)
        liRemoveBtn.onclick = () => removeProduct(product)

        li.appendChild(liName)
        li.appendChild(liPrice)
        li.appendChild(liUpdateBtn)
        li.appendChild(liAddBtn)
        li.appendChild(liRemoveBtn)
        productListElem.appendChild(li)

        productElems.set(product, li)
        alert('Product created successfully!')
    } catch (err) {
        console.log(err)
        alert('Failed to create a product')
    }
}

function updateProduct(product) {
    let price = promptNumber('Enter new product price')

    try {
        store.updateProductPrice(product.name, price)

        let prodElem = productElems.get(product)
        prodElem.children[1].innerText = price;

        alert('Product updated successfully!')
    } catch (err) {
        console.log(err)
        alert('Failed to update a product')
    }
}

function addProduct(product) {
    let quantity = promptNumber('How many to add?')

    try {
        let order = store.addProduct(product.name, quantity)

        const li = document.createElement('li');
        const liName = document.createElement('span');
        const liDir = document.createElement('span');
        const liQuantity = document.createElement('span');

        liName.innerText = order.productName;
        liDir.innerText = order.direction;
        liQuantity.innerText = order.quantity;

        li.appendChild(liName)
        li.appendChild(liDir)
        li.appendChild(liQuantity)
        orderListElem.appendChild(li)

        alert('Order added successfully!')
    } catch (err) {
        console.log(err)
        alert('Failed to create an order')
    }
}

function removeProduct(product) {
    let quantity = promptNumber('How many to remove?')

    try {
        let order = store.removeProduct(product.name, quantity)

        const li = document.createElement('li');
        const liName = document.createElement('span');
        const liDir = document.createElement('span');
        const liQuantity = document.createElement('span');

        liName.innerText = order.productName;
        liDir.innerText = order.direction;
        liQuantity.innerText = order.quantity;

        li.appendChild(liName)
        li.appendChild(liDir)
        li.appendChild(liQuantity)
        orderListElem.appendChild(li)

        alert('Order added successfully!')
    } catch (err) {
        console.log(err)
        alert('Failed to create an order')
    }
}

function searchForProduct() {
    let name = prompt('Enter product name')

    try {
        let product = store.searchForProduct(name)
        alert(product)
    } catch (err) {
        console.log(err)
        alert('Product not found')
    } finally {
        searchStringListElem.innerHTML = ''

        for (let str of store.searchStrings) {
            const li = document.createElement('li');
            li.innerText = str;

            searchStringListElem.appendChild(li)
        }
    }
}

function promptNumber(message, validateCallback = () => true) {
    let num = parseInt(prompt(message))
    while (isNaN(num) || !validateCallback(num)) {
        num = parseInt(prompt('Invalid input. Try again\n' + message))
    }
    return num
}

searchBtn.onclick = searchForProduct;
createBtn.onclick = createProduct;

