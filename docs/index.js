const previous_btn = document.getElementById("previous");
const next_btn = document.getElementById("next");
const menu_btn = document.querySelector("#hamburger");
const menu = document.querySelector(".drop-menu");
const cart_icon = document.querySelector(".cart-icon");
const cart_count = document.querySelector(".cart_count");
const cart_div = document.querySelector(".cart-block");
const cart = document.querySelector(".ul");
const profile = document.querySelector(".avatar");
const close_btn = document.getElementById("close_btn");
const no_of_pair = document.getElementById("number_of_item");
const add_to_cart = document.querySelector(".add-to-cart");
const msg_empty = document.querySelector(".msg-empty");
const checkout_btn = document.querySelector(".checkout");
const minus_icon =  document.getElementById("minus");
const plus_icon =  document.getElementById("plus");
const gallery = document.querySelectorAll(".pic");
const hero_img = document.querySelector(".product-img");
const successMessage = document.querySelector('.item-add-success');
const overlay = document.querySelector('.overlay');
const lightbox = document.querySelector('.lightbox');

// let product_name = document.querySelector(".product-name")

// DYNAMIC VARIABLES
let number_of_order =  document.getElementById("number_of_item");
let amt_of_order = 1;
let productsInCart = 0;
let shoe_price = 125;
let lightbox_gallery;
let lightbox_hero;
// let items_ordered = [];
// let trash = false;

cart_count.addEventListener('click', () => {
    console.log(cart_div);
    cart_div.classList.toggle('hidden');
});


// -------------------------------------------------------
// EVENT LISTENERS

menu_btn.addEventListener('click', onHamburgerClick, false);
close_btn.addEventListener('click', onCloseBtnClick, false);
minus_icon.addEventListener('click', onMinusBtnClick, false);
plus_icon.addEventListener('click', onPlusBtnClick, false);
add_to_cart.addEventListener('click', addToCart, false);
cart_icon.addEventListener('click', showCart, false);

gallery.forEach(img => {
    img.addEventListener('click', onThumbClick);
});

previous_btn.addEventListener('click', onButtonPreviousClick, false);
next_btn.addEventListener('click', onButtonNextClick, false);
hero_img.addEventListener('click', onHeroImgClick);
checkout_btn.addEventListener('click', onCheckoutClick);


// -------------------------------------------
// FUNCTIONS
function onHamburgerClick() {
    menu.classList.toggle('hidden')
}

function onCloseBtnClick() {
    menu.classList.toggle('hidden')
}

function showCart() {
    cart_div.classList.toggle('hidden');
}


function onThumbClick(e) {
    // clear active state
    gallery.forEach(img => {
        img.classList.remove("product-active");
    })
    // set active thumbnails
    e.target.classList.add('product-active')
    hero_img.src = e.target.src.replace('-thumbnail', '');
}

function onButtonPreviousClick(){
    let imageIndex = getCurrentindex();
    imageIndex--;
    if(imageIndex < 1){
        imageIndex = 4;
    }
    setHeroImage(imageIndex);
}

function onButtonNextClick(){
    let imageIndex = getCurrentindex();
    imageIndex++;
    if(imageIndex > 4){
        imageIndex = 1;
    }
    setHeroImage(imageIndex);
}

function getCurrentindex(){
    const imageIndex = parseInt(hero_img.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    return imageIndex ;
}

function setHeroImage(imageIndex){
    hero_img.src = `./images/image-product-${imageIndex}.jpg`;
    // sync the  images
    gallery.forEach(img => {
        img.classList.remove("product-active");
    });
    // set active thumbnail
    gallery[imageIndex - 1].classList.add("product-active");
}


// subtract amount of order
function onMinusBtnClick() {
    if(amt_of_order <= 1) return ;
    amt_of_order--;
    number_of_order.textContent = amt_of_order;
    
    // updateCart();
    // updateCartCount();
        // console.log(number_of_order_value)
}

// increase amount of order
function onPlusBtnClick() {
    amt_of_order++;
    number_of_order.textContent = amt_of_order;
    console.log(number_of_order)

    // updateCart();
    // updateCartCount();
}

// -------------------------------------------
// add item to cart

function addToCart() {

    const products = document.createElement('div');
    const item = document.createElement('div');
    item.className = 'item flex justify-between align-center';
    item.innerHTML = `<img class="item-img" src="./images/image-product-1-thumbnail.jpg" alt="image-product-1">`
    const details = document.createElement('div');
    details.className = 'details text-Dark-grayish-blue';
    const product_name = document.createElement('div');
    product_name.innerText = 'Autumn Limited Edition...';
    product_name.className = 'product_name';
    const price_group = document.createElement('div');
    price_group.className = 'price-group flex align-center';
    const item_price = document.createElement('div');
    item_price.className = 'item-price';
    item_price.textContent = `$${shoe_price}.00 x ` ;
    const count = document.createElement('div');
    count.className = 'count';
    count.innerHTML = number_of_order.textContent + ' ';
    const total_cost = document.createElement('div');
    total_cost.className = 'total_cost text-vark-blue';
    total_cost.textContent = ` $${shoe_price * number_of_order.textContent}.00`;

    price_group.appendChild(item_price);
    price_group.appendChild(count);
    price_group.appendChild(total_cost);
    details.appendChild(product_name);
    details.appendChild(price_group);
    item.appendChild(details);
    item.innerHTML += `<img class="delete-icon cursor-pointer" src="./images/icon-delete.svg" alt="icon-delete">`;
    products.appendChild(item);
    cart.appendChild(products);
    
    // cart_count.textContent = ;
    // const delete_btn = document.querySelector(".delete-icon");
    // storeItem(product_name.textContent);
    // items_ordered.push(product_name.innerText);
    productsInCart += amt_of_order;
    // console.log([...items_ordered].length);
    updateCart();
    animateSuccessMessage();
    successMessage.classList.remove('added');
    // const deleteIcon = document.querySelector(".delete-icon");
    // deleteIcon.addEventListener("click", removeItem);
    // console.log(delete_btn)
    // delete_btn.addEventListener('click', removeItem, false);
    // removeItem(product_name.textContent);
    // console.log(product_name.textContent)
    
}

function updateCart(){
    updateCartCount();
    showEmptyMsg();
    showCheckoutBtn();
}

function updateCartCount(){
    if(productsInCart > 0 && cart_count.classList.contains('hidden')){
        cart_count.classList.remove('hidden');
    }else if(productsInCart == 0 && !cart_count.classList.contains('hidden')){
        cart_count.classList.add('hidden');
    }
    cart_count.textContent = productsInCart;
    
}

function showEmptyMsg(){
    // hide the 'your cart is empty' message
    if(productsInCart == 0){
        msg_empty.classList.remove('hidden');
    }
    else{
        msg_empty.classList.add('hidden');
    }
}

function showCheckoutBtn(){
    if(productsInCart == 0){
        checkout_btn.classList.add('hidden');
    }
    else{
        checkout_btn.classList.remove('hidden');
    }
}

function animateSuccessMessage(){
    if(successMessage.classList.contains('hidden')){
        successMessage.classList.remove('hidden');
        successMessage.classList.add('animate');
    } else if(!successMessage.classList.contains('hidden')){
        successMessage.classList.add('hidden');
    }
    console.log(successMessage)
    
}

cart_div.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete-icon')){
        removeItem(e.target);
    }
})

function removeItem(item){
    productsInCart--;
    updateCart();

    let el = item.parentElement.querySelector(".count");
    let totalAmount = item.parentElement.querySelector(".total_cost");
    el.textContent = el.textContent - 1;
    totalAmount.textContent = ` $${shoe_price * el.textContent}.00`;

    if(el.textContent == 0){
        item.parentElement.remove();
    }

    else if(productsInCart == 0){
      cart.innerHTML = '';
    }

    // if(productsInCart == 0){
    //     cart.innerHTML = "";
    // }
    // if(confirm('You are about to remove this item from your cart')){
        // item.parentElement.classList.add('clear')
        // productsInCart = document.querySelector('.clear');
        // console.log(productsInCart);
        // item.parentElement.remove();
        // items_ordered[item.trash] = true;
        // console.log(items_ordered)
    // }
    // updateCart();
    

    // let value = item.parentElement.querySelector('.product_name');
    // items_ordered = items_ordered.filter( (shoe) => {
    //     return shoe !== value;
    // });  
    // const index = items_ordered.indexOf(item.parentElement.querySelector('.product_name'))
    // console.log(value);
    // console.log(items_ordered)
    // items_ordered.splice()
    // else if(items_ordered.length = 0){
    //     console.log(items_ordered)
    // }
    // console.log(e.target.parentElement)
}

function onHeroImgClick(){
    if(window.innerWidth >= 1300){
        if(overlay.childElementCount == 1){
            const newNode = lightbox.cloneNode(true);
            overlay.appendChild(newNode);

            const overlayCloseBtn = document.querySelector(".btnClose");
            overlayCloseBtn.addEventListener("click", onBtnCloseClick);

            lightbox_gallery = overlay.querySelectorAll(".pic");
            lightbox_hero = overlay.querySelector(".product-img");
            lightbox_gallery.forEach( img => {
                img.addEventListener("click", onThumbClickLightbox);
            })
            console.log(lightbox_gallery);
        }
        overlay.classList.remove("hidden");     
    }
}

function onBtnCloseClick(){
    overlay.classList.add("hidden");
}

function onThumbClickLightbox(e) {
    // clear active state
    lightbox_gallery.forEach(img => {
        img.classList.remove("product-active");
    })
    // set active thumbnails
    e.target.classList.add('product-active')
    lightbox_hero.src = e.target.src.replace('-thumbnail', '');
}

function onCheckoutClick(e){
    cart.innerHTML = '';
    productsInCart = 0;
    updateCart();
}


// function updateCartCount(item){

    // if(item > 0){
        // cart_count.classList.remove('hidden');
    // }
    // cart_count.textContent = item;
// }
