const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const clearCartBtn = document.getElementById('clear-cart');
const cartDOM = document.getElementById('cart');
const cartOverlay = document.getElementById('cart-overlay');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartContent = document.getElementById('cart-content');
const productsDOM = document.getElementById('products-center');

let cart = [];
let buttonsDOM = [];

class Products {
  async getProducts() {
    try {
      const result = await fetch('products.json');
      const data = await result.json();
      const products = data.items;
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

class UI {
  displayProducts(products) {
    products.forEach(product => {
      productsDOM.insertAdjacentHTML(
        'beforeend',
        `
        <article class="product">
          <div class="img-container">
            <img
              src="images/product-${product.id}.jpeg"
              alt="Image for ${product.title}"
              class="product-img"
            />
            <button class="add-to-cart-btn" data-id="${product.id}">
              <i class="fas fa-cart-plus"></i> add to cart
            </button>
          </div>
          <h3>${product.title}</h3>
          <h4>$${product.price}</h4>
        </article>
      `
      );
    });
  }
  getCartButtons() {
    const buttons = [...document.querySelectorAll('.add-to-cart-btn')];
    buttonsDOM = buttons;
    buttons.forEach(button => {
      const id = button.dataset.id;
      const inCart = cart.find(item => item.id === id);
      const changeButtonUI = () => {
        button.innerText = 'In Cart';
        button.disabled = true;
        button.style.cursor = 'not-allowed';
      };
      if (inCart) changeButtonUI();
      button.addEventListener('click', event => {
        changeButtonUI();
        const cartItem = { ...Storage.getProduct(id), amount: 1 };
        cart = [...cart, cartItem];
        Storage.saveCart(cart);
        this.setCartValues(cart);
        this.addCartItem(cartItem);
        this.showCart();
      });
    });
  }
  setCartValues(cart) {
    let total = 0;
    let itemsTotal = 0;
    cart.map(item => {
      total += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(total.toFixed(2));
    cartItems.innerText = itemsTotal;
  }
  addCartItem(item) {
    cartContent.insertAdjacentHTML(
      'beforeend',
      `
      <div class="cart-item">
        <img src="images/product-${item.id}.jpeg" alt="Image for ${item.title}">
        <div>
          <h4>${item.title}</h4>
          <h5>$${item.price}</h5>
          <span class="remove-item" id="remove-item" data-id="${item.id}">remove</span>
        </div>
        <div>
          <i class="fas fa-chevron-up" id="increment" data-id="${item.id}"></i>
          <p class="item-amount">${item.amount}</p>
          <i class="fas fa-chevron-down" id="decrement" data-id="${item.id}"></i>
        </div>
      </div>
    `
    );
  }
  showCart() {
    cartOverlay.classList.add('setVisible');
    cartDOM.classList.add('showCart');
  }
  hideCart() {
    cartOverlay.classList.remove('setVisible');
    cartDOM.classList.remove('showCart');
  }
  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartBtn.addEventListener('click', this.showCart);
    closeCartBtn.addEventListener('click', this.hideCart);
  }
  populateCart(cart) {
    cart.forEach(item => this.addCartItem(item));
  }
  cartLogic() {
    clearCartBtn.addEventListener('click', () => this.clearCart());
    cartContent.addEventListener('click', event => {
      let id = event.target.dataset.id;
      let item = cart.find(item => item.id === id);
      switch (event.target.id) {
        case 'remove-item':
          cartContent.removeChild(event.target.parentElement.parentElement);
          this.removeItem(id);
          break;
        case 'increment':
          item.amount++;
          Storage.saveCart(cart);
          this.setCartValues(cart);
          event.target.nextElementSibling.innerText = item.amount;
          break;
        case 'decrement':
          item.amount--;
          if (item.amount > 0) {
            Storage.saveCart(cart);
            this.setCartValues(cart);
            event.target.previousElementSibling.innerText = item.amount;
          } else {
            cartContent.removeChild(event.target.parentElement.parentElement);
            this.removeItem(id);
          }
          break;
        default:
          break;
      }
    });
  }
  clearCart() {
    const cartItems = cart.map(item => item.id);
    if (cartItems.length > 0) {
      if (window.confirm('Are you sure you wish to remove all items?')) {
        cartItems.forEach(id => this.removeItem(id));
        // Remove from DOM
        // option 1: with while loop
        // while (cartContent.firstChild)
        //   cartContent.removeChild(cartContent.firstChild);
        // option 2: set innerHTML to an empty string
        cartContent.innerHTML = '';
      }
    } else {
      alert('There are no items to remove');
    }
  }
  removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    const button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = "<i class='fas fa-cart-plus'></i> add to cart";
    button.style.cursor = 'pointer';
  }
  getSingleButton(id) {
    return buttonsDOM.find(button => button.dataset.id === id);
  }
}

class Storage {
  static saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }
  static getProduct(id) {
    const products = JSON.parse(localStorage.getItem('products'));
    return products.find(product => product.id === id);
  }
  static saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  static getCart() {
    return localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();
  ui.setupAPP();
  products
    .getProducts()
    .then(products => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getCartButtons();
      ui.cartLogic();
    });
});
