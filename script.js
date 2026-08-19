/* =========================================================
   3D MS STORE - APPWRITE DATABASES VERSION
========================================================= */


/* =========================================================
   APPWRITE CONFIG
========================================================= */

const client = new Appwrite.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6a8441170004dad1c58c");


const databases =
  new Appwrite.Databases(client);


const DATABASE_ID =
  "6a855f8f000abdab1a22";

const PRODUCTS_COLLECTION_ID =
  "products";


/* =========================================================
   STATE
========================================================= */

let products = [];
let cart = [];
let selectedPayment = null;


/* =========================================================
   ELEMENTS
========================================================= */

const productsGrid =
  document.getElementById("productsGrid");

const cartButton =
  document.getElementById("cartButton");

const cartCount =
  document.getElementById("cartCount");

const cartOverlay =
  document.getElementById("cartOverlay");

const closeCart =
  document.getElementById("closeCart");

const cartItems =
  document.getElementById("cartItems");

const emptyCart =
  document.getElementById("emptyCart");

const subtotalElement =
  document.getElementById("subtotal");

const shippingElement =
  document.getElementById("shipping");

const totalElement =
  document.getElementById("total");

const freeShippingMessage =
  document.getElementById(
    "freeShippingMessage"
  );

const checkoutButton =
  document.getElementById(
    "checkoutButton"
  );

const checkoutOverlay =
  document.getElementById(
    "checkoutOverlay"
  );

const closeCheckout =
  document.getElementById(
    "closeCheckout"
  );

const checkoutTotal =
  document.getElementById(
    "checkoutTotal"
  );

const checkoutForm =
  document.getElementById(
    "checkoutForm"
  );

const successOverlay =
  document.getElementById(
    "successOverlay"
  );

const successText =
  document.getElementById(
    "successText"
  );

const finishOrderButton =
  document.getElementById(
    "finishOrderButton"
  );


/* =========================================================
   LOAD PRODUCTS FROM APPWRITE
========================================================= */

async function loadProducts() {

  if (!productsGrid) {
    return;
  }

  productsGrid.innerHTML = `
    <div
      style="
        grid-column:1/-1;
        text-align:center;
        padding:40px;
        color:#6b7280;
        font-weight:900;
      "
    >
      טוען מוצרים...
    </div>
  `;


  try {

    const result =
      await databases.listDocuments(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        [
          Appwrite.Query.equal(
            "active",
            true
          )
        ]
      );


    const rows =
      result.documents || [];


    products =
      rows.map(
        function(row) {

          return {

            id:
              row.$id,

            name:
              row.name || "מוצר",

            price:
              Number(
                row.price || 0
              ),

            image:
              row.image || "",

            colors:
              String(
                row.colors || ""
              )
                .split(",")
                .map(
                  function(color) {

                    return color.trim();

                  }
                )
                .filter(Boolean)

          };

        }
      );


    renderProducts();

  }

  catch (error) {

    console.error(
      "APPWRITE PRODUCTS ERROR:",
      error
    );


    productsGrid.innerHTML = `
      <div
        style="
          grid-column:1/-1;
          padding:30px;
          text-align:center;
          color:#dc2626;
          font-weight:900;
        "
      >
        לא הצלחנו לטעון את המוצרים
      </div>
    `;

  }

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

  if (!productsGrid) {
    return;
  }


  productsGrid.innerHTML = "";


  if (
    products.length === 0
  ) {

    productsGrid.innerHTML = `
      <div
        style="
          grid-column:1/-1;
          text-align:center;
          padding:40px;
          color:#6b7280;
          font-weight:900;
        "
      >
        עדיין אין מוצרים בחנות
      </div>
    `;

    return;

  }


  products.forEach(
    function(product) {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "product-card";


      const options =
        product.colors
          .map(
            function(color) {

              return `
                <option value="${color}">
                  ${color}
                </option>
              `;

            }
          )
          .join("");


      card.innerHTML = `

        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
        >

        <div class="product-content">

          <div class="product-name">
            ${product.name}
          </div>

          <div class="product-price">
            ₪${product.price.toFixed(2)}
          </div>

          <label class="color-label">
            בחרו צבע
          </label>

          <select
            id="productColor-${product.id}"
            class="product-color"
          >
            ${
              options ||
              `
                <option value="ללא צבע">
                  ללא צבע
                </option>
              `
            }
          </select>

          <button
            class="add-button"
            type="button"
            data-product-id="${product.id}"
          >
            🛒 הוסף לסל
          </button>

        </div>

      `;


      productsGrid
        .appendChild(card);

    }
  );

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(productId) {

  const product =
    products.find(
      function(item) {

        return (
          item.id === productId
        );

      }
    );


  if (!product) {
    return;
  }


  const colorSelect =
    document.getElementById(
      "productColor-" + productId
    );


  const selectedColor =
    colorSelect
      ? colorSelect.value
      : "ללא צבע";


  const existing =
    cart.find(
      function(item) {

        return (
          item.id === productId &&
          item.selectedColor ===
            selectedColor
        );

      }
    );


  if (existing) {

    existing.quantity++;

  }

  else {

    cart.push({

      id:
        product.id,

      name:
        product.name,

      price:
        product.price,

      image:
        product.image,

      selectedColor:
        selectedColor,

      quantity:
        1

    });

  }


  renderCart();


  if (cartOverlay) {

    cartOverlay
      .classList
      .remove("hidden");

  }

}


/* =========================================================
   REMOVE / QUANTITY
========================================================= */

function removeCartItem(index) {

  cart.splice(index, 1);

  renderCart();

}


function changeQuantity(
  index,
  amount
) {

  if (!cart[index]) {
    return;
  }


  cart[index].quantity +=
    amount;


  if (
    cart[index].quantity <= 0
  ) {

    cart.splice(index, 1);

  }


  renderCart();

}


/* =========================================================
   TOTALS
========================================================= */

function calculateTotals() {

  const subtotal =
    cart.reduce(
      function(total, item) {

        return (
          total +
          item.price *
          item.quantity
        );

      },
      0
    );


  let shipping = 0;


  if (
    subtotal > 0 &&
    subtotal < 199.90
  ) {

    shipping = 19.90;

  }


  return {

    subtotal:
      subtotal,

    shipping:
      shipping,

    total:
      subtotal + shipping

  };

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

  if (
    !cartItems ||
    !cartCount
  ) {
    return;
  }


  cartItems.innerHTML = "";


  const quantity =
    cart.reduce(
      function(total, item) {

        return (
          total +
          item.quantity
        );

      },
      0
    );


  cartCount.textContent =
    quantity;


  if (emptyCart) {

    if (
      cart.length === 0
    ) {

      emptyCart
        .classList
        .remove("hidden");

    }

    else {

      emptyCart
        .classList
        .add("hidden");

    }

  }


  cart.forEach(
    function(item, index) {

      const row =
        document.createElement(
          "div"
        );


      row.className =
        "cart-item";


      row.innerHTML = `

        <img
          src="${item.image}"
          alt="${item.name}"
        >

        <div>

          <div class="cart-item-name">
            ${item.name}
          </div>

          <div class="cart-item-info">
            צבע:
            ${item.selectedColor}
          </div>

          <div class="cart-item-info">
            ₪${item.price.toFixed(2)}
          </div>

          <div
            style="
              display:flex;
              gap:7px;
              align-items:center;
              margin-top:7px;
            "
          >

            <button
              type="button"
              data-cart-action="minus"
              data-index="${index}"
            >
              −
            </button>

            <strong>
              ${item.quantity}
            </strong>

            <button
              type="button"
              data-cart-action="plus"
              data-index="${index}"
            >
              +
            </button>

          </div>

        </div>

        <button
          class="remove-button"
          type="button"
          data-cart-action="remove"
          data-index="${index}"
        >
          🗑
        </button>

      `;


      cartItems
        .appendChild(row);

    }
  );


  const totals =
    calculateTotals();


  if (subtotalElement) {

    subtotalElement.textContent =
      "₪" +
      totals.subtotal.toFixed(2);

  }


  if (shippingElement) {

    shippingElement.textContent =

      totals.shipping === 0 &&
      totals.subtotal > 0

        ? "חינם 🎉"

        : "₪" +
          totals.shipping.toFixed(2);

  }


  if (totalElement) {

    totalElement.textContent =
      "₪" +
      totals.total.toFixed(2);

  }


  if (checkoutTotal) {

    checkoutTotal.textContent =
      "₪" +
      totals.total.toFixed(2);

  }


  if (freeShippingMessage) {

    if (
      totals.subtotal === 0
    ) {

      freeShippingMessage.textContent =
        "";

    }

    else if (
      totals.subtotal >= 199.90
    ) {

      freeShippingMessage.textContent =
        "🎉 קיבלתם משלוח חינם!";

    }

    else {

      const missing =
        199.90 -
        totals.subtotal;


      freeShippingMessage.textContent =

        "הוסיפו עוד ₪" +
        missing.toFixed(2) +
        " למשלוח חינם 🚚";

    }

  }

}


/* =========================================================
   PRODUCT CLICKS
========================================================= */

if (productsGrid) {

  productsGrid.addEventListener(
    "click",
    function(event) {

      const button =
        event.target.closest(
          ".add-button"
        );


      if (!button) {
        return;
      }


      addToCart(
        button.dataset.productId
      );

    }
  );

}


/* =========================================================
   CART CLICKS
========================================================= */

if (cartItems) {

  cartItems.addEventListener(
    "click",
    function(event) {

      const button =
        event.target.closest(
          "[data-cart-action]"
        );


      if (!button) {
        return;
      }


      const index =
        Number(
          button.dataset.index
        );


      const action =
        button.dataset.cartAction;


      if (
        action === "plus"
      ) {

        changeQuantity(
          index,
          1
        );

      }


      if (
        action === "minus"
      ) {

        changeQuantity(
          index,
          -1
        );

      }


      if (
        action === "remove"
      ) {

        removeCartItem(index);

      }

    }
  );

}


/* =========================================================
   OPEN / CLOSE CART
========================================================= */

if (cartButton) {

  cartButton.onclick =
    function() {

      cartOverlay
        .classList
        .remove("hidden");

    };

}


if (closeCart) {

  closeCart.onclick =
    function() {

      cartOverlay
        .classList
        .add("hidden");

    };

}


/* =========================================================
   CHECKOUT
========================================================= */

if (checkoutButton) {

  checkoutButton.onclick =
    function() {

      if (
        cart.length === 0
      ) {

        alert(
          "הסל שלכם ריק"
        );

        return;

      }


      cartOverlay
        .classList
        .add("hidden");


      checkoutOverlay
        .classList
        .remove("hidden");


      const totals =
        calculateTotals();


      checkoutTotal.textContent =
        "₪" +
        totals.total.toFixed(2);

    };

}


if (closeCheckout) {

  closeCheckout.onclick =
    function() {

      checkoutOverlay
        .classList
        .add("hidden");

    };

}


/* =========================================================
   PAYMENT
========================================================= */

document
  .querySelectorAll(
    ".payment-button"
  )
  .forEach(
    function(button) {

      button.onclick =
        function() {

          selectedPayment =
            button.dataset.payment;


          document
            .querySelectorAll(
              ".payment-button"
            )
            .forEach(
              function(item) {

                item.classList.remove(
                  "active"
                );

              }
            );


          button.classList.add(
            "active"
          );


          const selectedPaymentText =
            document.getElementById(
              "selectedPayment"
            );


          if (
            selectedPaymentText
          ) {

            selectedPaymentText.textContent =

              "נבחר תשלום באמצעות " +
              selectedPayment;

          }

        };

    }
  );


/* =========================================================
   PLACE ORDER
========================================================= */

if (checkoutForm) {

  checkoutForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      if (
        !selectedPayment
      ) {

        alert(
          "בחרו Bit או PayBox"
        );

        return;

      }


      const customerName =
        document
          .getElementById(
            "customerName"
          )
          .value
          .trim();


      const totals =
        calculateTotals();


      checkoutOverlay
        .classList
        .add("hidden");


      if (successText) {

        successText.textContent =

          customerName +
          ", ההזמנה התקבלה! " +
          "סה״כ ₪" +
          totals.total.toFixed(2) +
          " • תשלום באמצעות " +
          selectedPayment;

      }


      successOverlay
        .classList
        .remove("hidden");

    }
  );

}


/* =========================================================
   FINISH ORDER
========================================================= */

if (finishOrderButton) {

  finishOrderButton.onclick =
    function() {

      cart = [];

      selectedPayment = null;


      if (checkoutForm) {

        checkoutForm.reset();

      }


      document
        .querySelectorAll(
          ".payment-button"
        )
        .forEach(
          function(button) {

            button.classList.remove(
              "active"
            );

          }
        );


      const selectedPaymentText =
        document.getElementById(
          "selectedPayment"
        );


      if (
        selectedPaymentText
      ) {

        selectedPaymentText.textContent =
          "עדיין לא נבחר אמצעי תשלום";

      }


      successOverlay
        .classList
        .add("hidden");


      renderCart();

    };

}


/* =========================================================
   START
========================================================= */

renderCart();
loadProducts();

console.log(
  "🛍️ 3D MS APPWRITE DATABASE STORE READY"
);
