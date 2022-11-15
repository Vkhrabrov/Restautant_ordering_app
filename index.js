import { menuArray } from './data.js'
const myOrderList = document.getElementById('order')
const myOrderItemList = document.getElementById('orderItemsList')
const finalPrice = document.getElementById('final-price')
const modal = document.getElementById('modal')
const completeOrderButton = document.getElementById("create-order-button")
const submitButton = document.getElementById('submit-button')
const orderForm = document.getElementById('order-form')
let totalQuantity = menuArray[0].quantity + menuArray[1].quantity + menuArray[2].quantity
let orderArray = []

// A function that renders the items from menuArray //
function getMenuHtml(){
    let menuHtml = ''
    
    for (let item of menuArray){
        
        menuHtml += `
        <div class="menu-list">
                <div class="item-logo">
                    <h class="item-emoji">${item.emoji}</h>
                </div>
        
                <div class="item-details">
                    <h class="item-name">${item.name}</h>
                    <p class="ingredients">${item.ingredients}</p>
                    <p class="price">$${item.price}</p>
                </div>
        
            <div class="addItemButton" id="add-item-button">
            <button data-addItem="${item.id}">+</button>
            </div>
        </div>
        `
    } 
    
    return menuHtml
}

function render(){
    document.getElementById("menu").innerHTML = getMenuHtml()
}

render()


// "Complete Order" button event listener that opens up a modal
completeOrderButton.addEventListener("click", function(){
    modal.style.display = 'inline'
})

// "Submit" button that resets the whole order, takes the name out of the form data, prints out the final message and returns "your basket is empty" after 3 seconds.
orderForm.addEventListener('submit', function(e){
    e.preventDefault()
    modal.style.display = 'none'
    myOrderList.style.display = 'none'
    menuArray[0].quantity = 0
    menuArray[1].quantity = 0
    menuArray[2].quantity = 0
    
    const customerFormData = new FormData(orderForm)
    const customerName = customerFormData.get('customerName')
    
    document.getElementById('final-message').style.display = 'flex'
    document.getElementById('final-message').innerHTML =
    `<p>Thanks ${customerName}, your order is on its way!</p>`
    
    setTimeout(function(){
    document.getElementById('final-message').style.display = 'none'
    document.getElementById('basket-empty-message').classList.remove('hidden')
}, 8000)

setTimeout(function(){
    orderForm.reset()
}, 9000)

})
// the function that listens to the "addItem" button

document.addEventListener('click', function(e){
    if (e.target.dataset.additem){
        addItemToOrderList(e.target.dataset.additem)
    } else if (e.target.dataset.remove){
        removeItemFromOrderList(e.target.dataset.remove)
    }
    
})

// the function that adds a chosen menu-item to orderArray and calls for checkingOrderArray function

function addItemToOrderList(itemId){
    let targetMenuItem = menuArray.filter(function(item){
        return item.id == itemId
    
    })[0]
    menuArray[itemId].quantity += 1
    checkingOrderArray()
  
}

// function that removes items one by one
function removeItemFromOrderList(itemId){
    let targetMenuItem = menuArray.filter(function(item){
        return item.id == itemId
    
    })[0]
    
    menuArray[itemId].quantity -= 1
    console.log(menuArray[itemId].quantity)
    
    
    if (totalQuantity === 0) {
        
        myOrderList.style.display = 'none'
        document.getElementById('basket-empty-message').classList.remove('hidden')
        
        }
    
    checkingOrderArray()
}



// Checking if any item has been added to the order list, and if yes, shows the item in the order list //

        
function checkingOrderArray(){
    
    let orderList = ''
    let totalPrice = 0
    let totalQuantity = menuArray[0].quantity + menuArray[1].quantity + menuArray[2].quantity
            
        menuArray.forEach(function(item){
            
            if (item.quantity > 0){
                
            myOrderList.style.display = 'inline'
            document.getElementById('basket-empty-message').classList.add('hidden')
                
            totalPrice += item.price * item.quantity
            
            orderList += `
            <div class="order-list">
            <p>${item.name}<button class="remove-item-button" 
            data-remove="${item.id}">Remove item</button></p>
            <p>$${item.price * item.quantity}</p>
            </div>`
            }
        })
        
        finalPrice.innerHTML = "$" + totalPrice
        orderItemsList.innerHTML = orderList
        render()
        
    }
