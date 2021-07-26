import { select, templates, classNames, settings } from '../settings.js';
import CartProduct from './CartProduct.js';
import utils from '../utils.js';
class Cart {
  constructor(element) {
    const thisCart = this;
    thisCart.products = [];
    thisCart.getElements(element);
    thisCart.initActions();
    console.log('new Cart', thisCart);
  }
  getElements(element) {
    const thisCart = this;
    thisCart.dom = {};
    thisCart.dom.wrapper = element;
    thisCart.dom.toggleTrigger = thisCart.dom.wrapper.querySelector(
      select.cart.toggleTrigger
    );
    thisCart.dom.productList = thisCart.dom.wrapper.querySelector(
      select.cart.productList
    );
    thisCart.dom.deliveryFee = thisCart.dom.wrapper.querySelector(
      select.cart.deliveryFee
    );
    thisCart.dom.subTotalPrice = thisCart.dom.wrapper.querySelector(
      select.cart.subtotalPrice
    );
    thisCart.dom.totalPrices = thisCart.dom.wrapper.querySelectorAll(
      select.cart.totalPrice
    );
    thisCart.dom.totalNumber = thisCart.dom.wrapper.querySelector(
      select.cart.totalNumber
    );
    thisCart.dom.form = thisCart.dom.wrapper.querySelector(select.cart.form);
    thisCart.dom.phone = thisCart.dom.wrapper.querySelector(select.cart.phone);
    thisCart.dom.address = thisCart.dom.wrapper.querySelector(
      select.cart.address
    );
  }
  initActions() {
    const thisCart = this;
    thisCart.dom.toggleTrigger.addEventListener('click', function () {
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });
    thisCart.dom.productList.addEventListener('updated', function () {
      thisCart.update();
    });
    thisCart.dom.productList.addEventListener('remove', function (event) {
      thisCart.remove(event.detail.cartProduct);
    });
    thisCart.dom.form.addEventListener('submit', function (event) {
      event.preventDefault();
      thisCart.sendOrder();
    });
  }
  add(menuProduct) {
    //const thisCart = this;
    console.log('adding product', menuProduct);
    const thisCart = this;
    // generate HTML based on template
    const generatedHTML = templates.cartProduct(menuProduct);
    // create element using utils.createElementFromHTML
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    // find product list container
    const productListContainer = thisCart.dom.productList;
    // add element to menu
    productListContainer.appendChild(generatedDOM);
    thisCart.products.push(new CartProduct(menuProduct, generatedDOM));
    console.log('thisCart.products', thisCart.products);
    thisCart.update();
  }
  update() {
    const thisCart = this;
    let deliveryFee = settings.cart.defaultDeliveryFee;
    let totalNumber = 0;
    let subTotalPrice = 0;
    for (let product of thisCart.products) {
      totalNumber += product.amount;
      console.log(product);
      subTotalPrice += product.price;
    }
    if (totalNumber === 0) {
      deliveryFee = 0;
    }
    thisCart.totalPrice = subTotalPrice + deliveryFee;
    thisCart.totalNumber = totalNumber;
    thisCart.subTotalPrice = subTotalPrice;
    thisCart.deliveryFee = deliveryFee;

    thisCart.dom.totalPrices.forEach((totalPrice) => {
      totalPrice.innerHTML = thisCart.totalPrice;
    });
    thisCart.dom.subTotalPrice.innerHTML = subTotalPrice;
    thisCart.dom.totalNumber.innerHTML = totalNumber;
    thisCart.dom.deliveryFee.innerHTML = deliveryFee;
    thisCart.dom.wrapper.classList.add('updated');
    setTimeout(function () {
      thisCart.dom.wrapper.classList.remove('updated');
    }, 100);
  }
  remove(cartProductToRemove) {
    console.log(cartProductToRemove);
    const thisCart = this;
    cartProductToRemove.dom.wrapper.remove();
    thisCart.products.forEach((cartProduct, index) => {
      if (cartProduct === cartProductToRemove) {
        thisCart.products.splice(index, 1);
      }
    });
    thisCart.update();
  }
  sendOrder() {
    const thisCart = this;
    const url = settings.db.url + '/' + settings.db.orders;
    const payload = {
      address: thisCart.dom.address.value,
      phone: thisCart.dom.phone.value,
      totalPrice: thisCart.totalPrice,
      subTotalPrice: thisCart.subTotalPrice,
      totalNumber: thisCart.totalNumber,
      deliveryFee: thisCart.deliveryFee,
      products: [],
    };
    for (let prod of thisCart.products) {
      payload.products.push(prod.getData());
    }
    if (payload.phone == '') {
      thisCart.dom.phone.classList.add('error');
      thisCart.dom.phone.addEventListener('change', function () {
        thisCart.dom.phone.classList.remove('error');
      });
      return;
    }
    if (payload.address == '') {
      thisCart.dom.address.classList.add('error');
      thisCart.dom.address.addEventListener('change', function () {
        thisCart.dom.address.classList.remove('error');
      });
      return;
    }
    if (payload.products.length == 0) {
      return;
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, options);
    for (let prod of thisCart.products) {
      thisCart.remove(prod);
    }
  }
}
export default Cart;
