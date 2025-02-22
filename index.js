
class Item {
    constructor(name, price, inStock, description, imgURL) {
        this.name = name;
        this.price = price;
        this.inStock = inStock;
        this.description = description;
        this.imgURL = imgURL;
        this.userQuantity = 0;
    }
}

//badge elements
const cartQuantityBadge = document.querySelector(".badge");

//offcanvas item added elements
const addedItemName = document.querySelector(".added-item-name");
const addedItemDesc = document.querySelector(".added-item-desc");
const addedItemImgDiv = document.querySelector(".added-item-img-container")
const addedItemPrice = document.querySelector(".added-item-price");
const addedItemExistingQuantity = document.querySelector(".added-item-existing-quantity");

const addedItemQuantity = document.querySelector(".added-item-quantity");

//tracker variables
let prevSetQuantityNumber = 1;
let currentItem = null;

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
        resetAddedItemQuantity();
        currentItem = itemQuery;
        changeAllQuantities(1);
    }
    else 
    {
        displayNoItem();
    }
}

function displayAddedItem()
{
    addedItemName.innerText = currentItem.name;
    addedItemDesc.innerText = currentItem.description === "" ? "No description provided for this item." : currentItem.description;
    addedItemImgDiv.style.backgroundImage = `url(${currentItem.imgURL})`;
    addedItemPrice.innerText = `Item Price: $${currentItem.price}`;
    addedItemExistingQuantity.innerText = `In Cart: ${currentItem.userQuantity}`
}

function displayNoItem() 
{
    addedItemName.innerText = "Item Name";
    addedItemDesc.innerText = "Item Description";
    addedItemImgDiv.style.backgroundImage = `url("")`
    addedItemPrice.innerText = `Item Price: Not Specified`;
    addedItemExistingQuantity.innerText = `In Cart: Unknown`
}

//From user input in the number field
function changeAddedItemQuantity(newQuantityString) 
{
    let newSetQuantityNumber = parseInt(newQuantityString);

    let totalSelectedItemQuantity = newSetQuantityNumber - currentItem.userQuantity;

    changeAllQuantities(totalSelectedItemQuantity);

    currentItem.userQuantity = newSetQuantityNumber;
}

//Reset count
function resetAddedItemQuantity() 
{
    prevSetQuantityNumber = 1;
    addedItemQuantity.value = 1;
}

//From the (+) and (-) buttons
function buttonClickQuantityChange(valueChange) 
{
    let quantityValueChange = currentItem.userQuantity + valueChange
    if(quantityValueChange < 0 || quantityValueChange> 99) 
        return;
    addedItemQuantity.value = quantityValueChange;
    changeAllQuantities(valueChange);
}

function changeAllQuantities(newQuantity) 
{
    //1. update item's quantity
    currentItem.userQuantity += newQuantity;
    displayAddedItem();

    //2. update total cart items quantity
    cartQuantity += newQuantity;
    cartQuantityBadge.innerText = cartQuantity;
}

//Internal Validation Logic
function checkItemExistsAndHasStock(item) 
{
    if(item == null || item == undefined) 
    {
        return false;
    }

    return item.inStock;
}