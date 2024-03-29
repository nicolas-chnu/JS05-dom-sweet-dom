export function createStatElem() {
    let elem = document.createElement('li')
    elem.classList.add('stats-list__item')

    return elem
}

export function createProductElem() {
    let elem = document.createElement('li')
    elem.classList.add('item', 'product')

    return elem
}

export function createOrderElem() {
    let elem = document.createElement('li')
    elem.classList.add('item', 'order')

    return elem
}

export function fillUpProductElem(
    productElem,
    product,
    editHandler,
    addHandler,
    removeHandler)
{
    productElem.innerHTML = ''

    let info = document.createElement('div')
    info.classList.add('product-info')

    let infoName = document.createElement('span')
    infoName.classList.add('product-info__name')
    infoName.innerText = product.name;

    let infoPrice = document.createElement('span')
    infoPrice.classList.add('product-info__price')
    infoPrice.innerText = '$' + product.price;

    let infoQuantity = document.createElement('span')
    infoQuantity.classList.add('product-info__quantity')
    infoQuantity.innerText = product.quantity + ' left'

    info.appendChild(infoName)
    info.appendChild(infoPrice)
    info.appendChild(infoQuantity)

    let actions = document.createElement('div')
    actions.classList.add('product-actions')

    let editBtn = document.createElement('button')
    editBtn.classList.add('edit-product-btn', 'edit-icon')
    editBtn.onclick = () => editHandler(productElem)

    let addBtn = document.createElement('button')
    addBtn.classList.add('add-product-btn', 'inbox-icon')
    addBtn.onclick = () => addHandler(productElem)

    let removeBtn = document.createElement('button')
    removeBtn.classList.add('remove-product-btn', 'outbox-icon')
    removeBtn.onclick = () => removeHandler(productElem)

    actions.appendChild(editBtn)
    actions.appendChild(addBtn)
    actions.appendChild(removeBtn)

    productElem.appendChild(info)
    productElem.appendChild(actions)
}

export function fillUpOrderElement(orderElem, order) {
    orderElem.innerHTML = ''

    let orderTime = document.createElement('span')
    orderTime.classList.add('order__time')
    let date = order.date
    orderTime.innerText = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`

    let orderName = document.createElement('span')
    orderName.classList.add('order__name')
    orderName.innerText = order.productName

    let orderDirection = document.createElement('span')
    orderDirection.classList.add('order__direction')
    orderDirection.setAttribute('direction', order.isSell ? 'out' : 'in')

    let orderQuantity = document.createElement('span')
    orderQuantity.classList.add('order__quantity')
    orderQuantity.innerText = order.quantity

    orderElem.appendChild(orderTime)
    orderElem.appendChild(orderName)
    orderElem.appendChild(orderDirection)
    orderElem.appendChild(orderQuantity)
}
