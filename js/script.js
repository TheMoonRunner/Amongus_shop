let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

//BUSQUEDA

var TRange=null;

function findString (str) {
 if (parseInt(navigator.appVersion)<4) return;
 var strFound;
 if (window.find) {

  // CODE FOR BROWSERS THAT SUPPORT window.find

  strFound=self.find(str);
  if (!strFound) {
   strFound=self.find(str,0,1);
   while (self.find(str,0,1)) continue;
  }
 }
 else if (navigator.appName.indexOf("Microsoft")!=-1) {

  // EXPLORER-SPECIFIC CODE

  if (TRange!=null) {
   TRange.collapse(false);
   strFound=TRange.findText(str);
   if (strFound) TRange.select();
  }
  if (TRange==null || strFound==0) {
   TRange=self.document.body.createTextRange();
   strFound=TRange.findText(str);
   if (strFound) TRange.select();
  }
 }
 else if (navigator.appName=="Opera") {
  alert ("Opera browsers not supported, sorry...")
  return;
 }
 if (!strFound) alert ("String '"+str+"' not found!")
 return;
}

document.addEventListener('DOMContentLoaded', function() {
    const cartItems = [];
    let tot = 0;
    const addToCartButtons = document.querySelectorAll('[id="cart-btn"]');
    const cartItemsElement = document.getElementById('cart-items');
    const totalValue = document.getElementById('total');
    
    function total(precio){

        tot = precio + tot;
        totalValue.innerHTML = tot;
    }

    addToCartButtons.forEach(button => {
      button.addEventListener('click', addToCart);
    });
  
    function addToCart(event) {
      const addToCartButton = event.target;
      const itemContainer = addToCartButton.closest('.box')
      const itemId = itemContainer.getAttribute('data-item-id');
      const itemName = itemContainer.querySelector('h3').textContent;
      const itemPrice = itemContainer.getAttribute('data-price');
      cartItem.classList.add('active');
      navbar.classList.remove('active');
      searchForm.classList.remove('active');
  
      const item = {
        id: itemId,
        name: itemName,
        price: itemPrice
      };
  
      cartItems.push(item);
      updateCartSummary();
      total(parseInt(item.price.replace(/[^0-9]/g, '')))
    }
  
    function updateCartSummary() {
      cartItemsElement.innerHTML = '';

      if (cartItems.length === 0) {
        tot = 0;
      }

      
      if (cartItems.length > 0) {
        tot = parseInt(totalValue.innerHTML);
      }
  
      cartItems.forEach(item => {
        const li = document.createElement('li');
        const itemImage = document.createElement('img');
        li.textContent += `${item.name} - $${item.price}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = '⠀X⠀';
        removeButton.classList.add('remove-item');
        removeButton.addEventListener('click', () => {
            removeItem(item.id);
        });
        li.appendChild(removeButton)
        cartItemsElement.appendChild(li);
      });

      function removeItem(itemId) {
        const itemIndex = cartItems.findIndex(item => item.id == itemId);
        if (itemIndex !== -1) {
            const removedItem = cartItems.splice(itemIndex, 1)[0];
            totalValue.innerHTML -= parseInt(removedItem.price.replace(/[^0-9]/g, ''));
            updateCartSummary();
        }
      }
    }


});