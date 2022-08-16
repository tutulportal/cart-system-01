// set the remove cart button function
let removeButtons = document.getElementsByClassName('remove');
for(var i = 0; i < removeButtons.length; i++){
    let button = removeButtons[i];
    button.addEventListener('click', removeBtnClick);
}

// seperating the remove function
function removeBtnClick(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateCartTotal();
}

// updating the quty of the items
let qtyInputs = document.getElementsByClassName('qty-cart');
for(var i=0; i<qtyInputs.length; i++){
    let input = qtyInputs[i];
    input.addEventListener('change', updatedQtyFunc);
}

// separate the quantity update function
function updatedQtyFunc(event){
    let inputExtact = event.target;
    if(isNaN(inputExtact.value) || inputExtact.value <= 0){
        inputExtact.value = 1;
        updateCartTotal();
        updateIndividualTotal();
    }else{
        updateCartTotal();
        updateIndividualTotal();
    }
}

// update cart individual total price function
function updateIndividualTotal(){
    let cartItems = document.getElementsByClassName('cart-item');
    let cartIndividualTotal = document.getElementsByClassName('cart-individual-total');
    let individualTotal = 0;
    for(var i=0; i<cartItems.length; i++){
        let cartItem = cartItems[i];
        let priceElement = parseFloat(cartItem.getElementsByClassName('price-element')[0].innerText);
        let qtyElement = parseInt(cartItem.getElementsByClassName('qty-cart')[0].value);
        individualTotal = priceElement * qtyElement;
        cartIndividualTotal[i].innerText = individualTotal;
    }
}updateIndividualTotal();


// update cart Grand Total Price function
function updateCartTotal(){
    let cartLists = document.getElementsByClassName('cart-lists')[0];
    let cartItems = document.getElementsByClassName('cart-item');
    let total = 0;
    for(var i=0; i<cartItems.length; i++){
        let cartItem = cartItems[i];
        let priceElement = parseFloat(cartItem.getElementsByClassName('price-element')[0].innerText);
        let qtyElement = parseInt(cartItem.getElementsByClassName('qty-cart')[0].value);
        total = total + (priceElement * qtyElement);
    }
    let totalText = document.getElementsByClassName('total-cart-price')[0];
    totalText.innerText = total;
}updateCartTotal();



// product adding to cart function
let addToCartButtons = document.getElementsByClassName('add-cart-product');
for(var i=0;i<addToCartButtons.length; i++){
    let addToCartButton = addToCartButtons[i];
    addToCartButton.addEventListener('click', function(event){
        let productExtract = event.target.parentElement;
        let productName = productExtract.getElementsByClassName('product-name')[0].innerText;
        let productPrice = parseFloat(productExtract.getElementsByClassName('product-price')[0].innerText);
        let productQty = parseInt(productExtract.getElementsByClassName('product-main-qty')[0].value);
        addNewRowCart(productName, productPrice, productQty);
        updateCartTotal();
    });
}


// add new row to cart list function
function addNewRowCart(productName, productPrice, productQty){
    let addRow = document.createElement('li');
    addRow.classList.add('cart-item');
    let mainUl = document.getElementsByClassName('cart-lists')[0];
    let cartItemNames = document.getElementsByClassName('cart-item-name');
    for(var i=0; i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText == productName){
            alert('This product already added to the cart!');
            return;
        }
    }
    let addRowContent = `
        <span class="cart-item-name">${productName}</span> - <span class="price-element">${productPrice}</span>$ - Total: <span class="cart-individual-total">${productPrice * productQty}</span>$ | Qty: <input class="qty-cart" type="number" value="${productQty}"> <button class="remove">Remove</button>  
    `;
    addRow.innerHTML = addRowContent;
    mainUl.append(addRow);
    addRow.getElementsByClassName('remove')[0].addEventListener('click', removeBtnClick);
    addRow.getElementsByClassName('qty-cart')[0].addEventListener('change', updatedQtyFunc);
}



// set the defalut value of product qty input function
let productQtyInputs = document.getElementsByClassName('product-main-qty');
for(var i=0; i<productQtyInputs.length; i++){
    let productQtyInput = productQtyInputs[i];
    productQtyInput.addEventListener('change', function(){
        if(isNaN(productQtyInput.value) || productQtyInput.value <= 0){
            productQtyInput.value = 1;
        }
    });
}