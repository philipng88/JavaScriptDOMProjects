// toggle cart
(() => {
  const cartInfo = document.getElementById('cart-info');
  const cart = document.getElementById('cart');
  cartInfo.addEventListener('click', () => {
    cart.classList.toggle('show-cart');
  });
})();

// cart actions
(() => {
  const cartBtn = document.querySelectorAll('.store-item-icon');
  const showTotals = () => {
    const priceArray = [];
    const itemPrices = document.querySelectorAll('.cart-item-price');
    itemPrices.forEach(itemPrice => priceArray.push(+itemPrice.textContent));
    const total = priceArray.reduce((x, y) => x + y);
    document.querySelector('.item-total').innerText = total;
    document.getElementById('cart-total').innerText = total;
    document.getElementById('item-count').innerText = priceArray.length;
  };

  cartBtn.forEach(btn => {
    btn.addEventListener('click', event => {
      if (event.target.parentElement.classList.contains('store-item-icon')) {
        const item = {};
        const fullPath = event.target.parentElement.previousElementSibling.src;
        const pos = fullPath.indexOf('img') + 4;
        const imgName = fullPath.slice(pos);
        const name =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[0].textContent;
        const price =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[1].children[0].textContent;

        item.img = `img-cart/${imgName}`;
        item.name = name;
        item.price = price;

        document.getElementById('cart').insertAdjacentHTML(
          'afterbegin',
          `
          <div class="cart-item d-flex justify-content-between text-capitalize my-3">
            <img
              src="${item.img}"
              class="img-fluid rounded-circle"
              id="item-img"
              alt="Image for ${item.name}"
            />
            <div class="item-text">
              <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
              <span>$</span>
              <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
            </div>
            <a href="#" id="cart-item-remove" class="cart-item-remove">
              <i class="fas fa-trash"></i>
            </a>
          </div>`
        );
        alert('Item added to cart');
        showTotals();
      }
    });
  });
})();

// filter buttons
(() => {
  const filterBtn = document.querySelectorAll('.filter-btn');
  filterBtn.forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault();
      const value = event.target.dataset.filter;
      const items = document.querySelectorAll('.store-item');
      items.forEach(item => {
        if (value === 'all') {
          item.style.display = 'block';
        } else if (item.classList.contains(value)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
})();

// search input
(() => {
  const search = document.getElementById('search-item');
  search.addEventListener('keyup', () => {
    const value = search.value.toLowerCase().trim();
    const items = document.querySelectorAll('.store-item');
    items.forEach(item => {
      const type = item.dataset.item;
      const match = type.slice(0, value.length);
      if (value === match) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
})();

// lightbox carousel
(() => {
  let counter = 0;
  const imageList = [];
  const images = document.querySelectorAll('.store-img');
  const container = document.querySelector('.lightbox-container');
  const item = document.querySelector('.lightbox-item');
  const closeIcon = document.querySelector('.lightbox-close');
  const btnLeft = document.querySelector('.btnLeft');
  const btnRight = document.querySelector('.btnRight');

  images.forEach(image => {
    imageList.push(image.src);
    image.addEventListener('click', event => {
      container.style.display = 'block';
      const imgSource = event.target.src;
      counter = imageList.indexOf(imgSource);
      item.style.backgroundImage = `url(${imgSource})`;
    });
  });

  btnLeft.addEventListener('click', () => {
    counter--;
    if (counter < 0) counter = imageList.length - 1;
    item.style.backgroundImage = `url(${imageList[counter]})`;
  });

  btnRight.addEventListener('click', () => {
    counter++;
    if (counter >= imageList.length) counter = 0;
    item.style.backgroundImage = `url(${imageList[counter]})`;
  });

  closeIcon.addEventListener('click', () => {
    container.style.display = 'none';
  });
})();

// scroll to top button
const scrollTopBtn = document.getElementById('scrollTopBtn');
const scrollFunction = () => {
  if (
    document.body.scrollTop > 250 ||
    document.documentElement.scrollTop > 250
  ) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
};
window.onscroll = () => scrollFunction();
scrollTopBtn.addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
