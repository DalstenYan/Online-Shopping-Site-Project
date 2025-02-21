
class Item {
    constructor(name, price, inStock, description, imgURL) {
        this.name = name;
        this.price = price;
        this.inStock = inStock;
        this.description = description;
        this.imgURL = imgURL;
    }
}

//badge elements
const cartQuantityBadge = document.querySelector(".badge");

//offcanvas item added elements
const addedItemName = document.querySelector(".added-item-name");
const addedItemDesc = document.querySelector(".added-item-desc");
const addedItemImg = document.querySelector(".added-item-img");
const addedItemPrice = document.querySelector(".added-item-price");

const addedItemQuantity = document.querySelector(".added-item-quantity");

//tracker variables
let prevSetQuantityNumber = 1;

let cartQuantity = 0;

const shopItems = [
    new Item(
        "Apple", 
        6.99, 
        true, 
        "",
         "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ),
    new Item(
        "Banana", 
        1.99, 
        true, 
        "",
        "https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ),
    new Item(
        "Blueberry",
        4.99,
        true,
        "",
        "https://images.pexels.com/photos/131054/pexels-photo-131054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ),
    new Item(
        "Cantaloupe",
        8.99,
        false,
        "",
        "https://images.pexels.com/photos/7065188/pexels-photo-7065188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ),
    new Item(
        "Cherry",
        3.99,
        true,
        "",
        "https://images.pexels.com/photos/768009/pexels-photo-768009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ),
    new Item(
        "Pineapple",
        2.49,
        true,
        "",
        "https://images.pexels.com/photos/8093196/pexels-photo-8093196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    )
]

function addItemToCart(itemName)
{
    let itemQuery = shopItems.find(i => i.name === itemName)
    if(checkItemExistsAndHasStock(itemQuery)) 
    {
        resetAddedItemQuantity()
        displayAddedItem(itemQuery);
        changeTotalItemsQuantity();
    }
    else 
    {
        displayNoItem();
    }
}

//deprecated
function increaseItemQuantity(quantity = 1) {
    cartQuantity += quantity;
    cartQuantityBadge.innerText = cartQuantity;
}

function decreaseItemQuantity(quantity = 1) {
    cartQuantity -= quantity;
    cartQuantityBadge.innerText = cartQuantity;
}

//function to update the number on the shopping cart badge
function changeTotalItemsQuantity(quantity = 1) 
{
    cartQuantity += quantity;
    cartQuantityBadge.innerText = cartQuantity;
}

function displayAddedItem(item)
{
    addedItemName.innerText = item.name;
    addedItemDesc.innerText = item.description === "" ? "No description provided for this item." : item.description;
    addedItemImg.src = item.imgURL;
    addedItemPrice.innerText = `Item Price: $${item.price}`;
}

function displayNoItem() 
{
    addedItemName.innerText = "Item Name";
    addedItemDesc.innerText = "Item Description";
    addedItemImg.src = "";
    addedItemPrice.innerText = `Item Price: Not Specified`;
}

function changeAddedItemQuantity(newQuantityString) 
{
    let newSetQuantityNumber = parseInt(newQuantityString);

    changeTotalItemsQuantity(newSetQuantityNumber - prevSetQuantityNumber);

    prevSetQuantityNumber = newSetQuantityNumber;
}

function resetAddedItemQuantity() 
{
    prevSetQuantityNumber = 1;
    addedItemQuantity.value = 1;
}

function checkItemExistsAndHasStock(item) 
{
    if(item == null || item == undefined) 
    {
        return false;
    }

    return item.inStock;
}