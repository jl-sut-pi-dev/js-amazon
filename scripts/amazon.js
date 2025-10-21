let productsHtml = "";

// get data from products.js and show the data
// set the data to js-products-grid dom element
products.forEach((product) => {
  productsHtml += `
        <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src= "${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${(product.priceCents / 100).toFixed(
            2
          )}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${
            product.id
          }" >Add to Cart</button>
        </div>
  `;

  document.querySelector(".js-products-grid").innerHTML = productsHtml;
  //interact add to cart button
  document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
    button.addEventListener("click", () => {
      // get product-id from buttton with data set value
      // get cart quantity with product id
      const { productId } = button.dataset;
      const quantity = Number(
        document.querySelector(`.js-quantity-selector-${productId}`).value
      );

      let exitingObj;
      //check alreday exist in the cart or not
      carts.forEach((cart) => {
        if (productId === cart.productId) {
          exitingObj = cart;
        }
      });

      // add quantity if already in the cart and if not push to the carts
      // cart quantity with cartQuantity
      if (exitingObj) {
        exitingObj.quantity += quantity;
      } else {
        carts.push({ productId, quantity });
      }
      // calcualte and  update cart quatity to the dom
      let cartQuantity = 0;

      carts.forEach((cart) => {
        cartQuantity += cart.quantity;
      });
      document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    });
  });
});
