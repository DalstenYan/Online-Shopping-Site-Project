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
let allFruits, allVegetables, allMiscellaneous, shopItems;

//Asynchronous JSON data retrieval function 
async function getJsonData(fileName)
{
    let response = await fetch(`jsons/${fileName}.json`);
    let data = await response.json();
    return data;
}

//Asynchronous variable setter function
async function setItemContainers()
{
    allFruits = await getJsonData("fruits");
    allVegetables = await getJsonData("vegetables");
    shopItems = [...allFruits, ...allVegetables];
    updateItemCards();
}

//Document Loaded
document.addEventListener("readystatechange", (event) => {
    if(event.target.readyState === "complete")
    {
        //1. Welcome Toast
        document.querySelectorAll(".site-load-toast").forEach(toast => {
            new bootstrap.Toast(toast).show();
        })
        //2. Parse json
        setItemContainers();
    }
})

//badge elements
const cartQuantityBadge = document.querySelector(".badge");

//offcanvas item added elements
const addedItemOffcanvas = new bootstrap.Offcanvas(document.querySelector("#offcanvasItemDisplay"));
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

//Add click functionality to the buttons
const allAddCartBtns = document.querySelectorAll(".add-to-cart-btn");

function updateItemCards()
{
    allAddCartBtns.forEach(addToCartBtn => {
        let btnAssociatedItemName = addToCartBtn.getAttribute("data-js-shop-item");
        //For every "Add to cart" button
        //get their data-js-shop-item attribute string
        //and pass that to the addItemToCart as the item name
        if(checkItemExistsAndHasStock(findItemByName(btnAssociatedItemName)))
        {
            // addToCartBtn.setAttribute("data-bs-target", "#offcanvasItemDisplay");
            // addToCartBtn.setAttribute("data-bs-toggle", "offcanvas");
            // addToCartBtn.setAttribute("aria-controls", "offcanvasItemDisplay");
            addToCartBtn.addEventListener("click", () => { addItemToCart(btnAssociatedItemName); })
        }
        else 
        {
            let stockText = addToCartBtn.previousElementSibling.firstElementChild;
            addToCartBtn.classList.remove("btn-outline-success");
            addToCartBtn.classList.add("btn-outline-danger", "disabled");
            addToCartBtn.textContent = "Cannot Add";
            stockText.classList.remove("in-stock");
            stockText.classList.add("no-stock");
            stockText.textContent = "No Stock";
            //console.log(`${addToCartBtn} has the item: ${btnAssociatedItemName}, and is out of stock`);
        }
    });
}

function findItemByName(itemName) 
{
    return shopItems.find(i => i.name === itemName);
}


function addItemToCart(itemName)
{
    let itemQuery = findItemByName(itemName);
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
    addedItemOffcanvas.show();
}

function displayNoItem() 
{
    addedItemName.innerText = "Item Name";
    addedItemDesc.innerText = "Item Description";
    addedItemImgDiv.style.backgroundImage = `url("")`
    addedItemPrice.innerText = `Item Price: Not Specified`;
    addedItemExistingQuantity.innerText = `In Cart: Unknown`
    addedItemOffcanvas.show();
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
    if(quantityValueChange < 0 || quantityValueChange > 99) 
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

//search logic
const itemSearchBar = document.querySelector("#item-searchbar");
const searchItemNameBtn = document.querySelector("#search-item-name-btn");

function searchForItem() 
{
    let query = itemSearchBar.value.trim();
    searchItemNameBtn.disabled = true;
    alert("Still a work in progress! You will soon be able to search for: " + query);
}