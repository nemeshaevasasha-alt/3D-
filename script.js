/* =========================================================
   3D MS
========================================================= */


/* APPWRITE */

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


/* WHATSAPP */

const STORE_WHATSAPP =
  "972585621659";


/* DELIVERY */

const DELIVERY_CITIES = {

  "haifa": {
    name: "חיפה",
    price: 9.90
  },

  "tel-aviv": {
    name: "תל אביב",
    price: 19.90
  }

};

const EXPRESS_PRICE = 4.90;


/* STATE */

let products = [];

let cart = [];

let deliveryMethod = null;

let shippingSpeed = "regular";

let currentOrder = null;


/* ELEMENTS */

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

const expressSummaryRow =
  document.getElementById("expressSummaryRow");

const totalElement =
  document.getElementById("total");

const checkoutButton =
  document.getElementById("checkoutButton");


/* CHECKOUT */

const checkoutOverlay =
  document.getElementById("checkoutOverlay");

const closeCheckout =
  document.getElementById("closeCheckout");

const checkoutForm =
  document.getElementById("checkoutForm");

const customerName =
  document.getElementById("customerName");

const customerPhone =
  document.getElementById("customerPhone");

const pickupButton =
  document.getElementById("pickupButton");

const deliveryButton =
  document.getElementById("deliveryButton");

const deliveryStatus =
  document.getElementById("deliveryStatus");

const deliveryFields =
  document.getElementById("deliveryFields");

const customerCity =
  document.getElementById("customerCity");

const customerAddress =
  document.getElementById("customerAddress");

const customerNotes =
  document.getElementById("customerNotes");


/* SHIPPING SPEED */

const regularShippingButton =
  document.getElementById(
    "regularShippingButton"
  );

const expressShippingButton =
  document.getElementById(
    "expressShippingButton"
  );

const shippingSpeedStatus =
  document.getElementById(
    "shippingSpeedStatus"
  );


/* CHECKOUT SUMMARY */

const checkoutItems =
  document.getElementById("checkoutItems");

const checkoutSubtotal =
  document.getElementById("checkoutSubtotal");

const checkoutShipping =
  document.getElementById("checkoutShipping");

const checkoutExpressRow =
  document.getElementById(
    "checkoutExpressRow"
  );

const checkoutTotal =
  document.getElementById("checkoutTotal");


/* WHATSAPP */

const whatsappOverlay =
  document.getElementById("whatsappOverlay");

const finalOrderPreview =
  document.getElementById("finalOrderPreview");

const openWhatsappButton =
  document.getElementById("openWhatsappButton");

const sentWhatsappButton =
  document.getElementById("sentWhatsappButton");

const backToCheckoutButton =
  document.getElementById("backToCheckoutButton");


/* SUCCESS */

const successOverlay =
  document.getElementById("successOverlay");

const successOrderSummary =
  document.getElementById("successOrderSummary");

const finalDeliveryTime =
  document.getElementById("finalDeliveryTime");

const backToStoreButton =
  document.getElementById("backToStoreButton");


/* CUSTOM */

const customBuildButton =
  document.getElementById("customBuildButton");

const customBuildOverlay =
  document.getElementById("customBuildOverlay");

const closeCustomBuild =
  document.getElementById("closeCustomBuild");

const customBuildForm =
  document.getElementById("customBuildForm");


/* MONEY */

function money(value) {

  return (
    "₪" +
    Number(value || 0).toFixed(2)
  );

}


/* SAFE HTML */

function escapeHTML(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


/* LOAD PRODUCTS */

async function loadProducts() {

  productsGrid.innerHTML = `
    <div class="loading">
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


    products =
      (result.documents || [])
        .map(function(row) {

          return {

            id: row.$id,

            name:
              row.name || "מוצר",

            price:
              Number(row.price || 0),

            image:
              row.image || "",

            colors:
              String(row.colors || "")
                .split(",")
                .map(function(color) {

                  return color.trim();

                })
                .filter(Boolean)

          };

        });


    renderProducts();

  }

  catch (error) {

    console.error(error);


    productsGrid.innerHTML = `
      <div
        class="loading"
        style="color:#dc2626;"
      >
        לא הצלחנו לטעון את המוצרים
      </div>
    `;

  }

}


/* RENDER PRODUCTS */

function renderProducts() {

  productsGrid.innerHTML = "";


  if (products.length === 0) {

    productsGrid.innerHTML = `
      <div class="loading">
        אין מוצרים כרגע
      </div>
    `;

    return;

  }


  products.forEach(function(product) {

    const card =
      document.createElement("article");

    card.className =
      "product-card";


    const colors =
      (
        product.colors.length
          ? product.colors
          : ["ללא צבע"]
      )
        .map(function(color) {

          return `
            <option value="${escapeHTML(color)}">
              ${escapeHTML(color)}
            </option>
          `;

        })
        .join("");


    card.innerHTML = `

      <img
        class="product-image"
        src="${escapeHTML(product.image)}"
        alt="${escapeHTML(product.name)}"
      >


      <div class="product-content">

        <div class="product-name">
          ${escapeHTML(product.name)}
        </div>

        <div class="product-price">
          ${money(product.price)}
        </div>

        <label class="color-label">
          בחרו צבע
        </label>

        <select
          id="color-${product.id}"
          class="product-color"
        >
          ${colors}
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


    productsGrid.appendChild(card);

  });

}


/* ADD CART */

function addToCart(productId) {

  const product =
    products.find(function(item) {

      return item.id === productId;

    });


  if (!product) {
    return;
  }


  const select =
    document.getElementById(
      "color-" + productId
    );


  const color =
    select
      ? select.value
      : "ללא צבע";


  const existing =
    cart.find(function(item) {

      return (
        item.id === productId &&
        item.color === color
      );

    });


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

      color:
        color,

      quantity:
        1

    });

  }


  renderCart();

  cartOverlay.classList.remove(
    "hidden"
  );

}


/* QUANTITY */

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


function removeItem(index) {

  cart.splice(index, 1);

  renderCart();

}


/* DELIVERY */

function getDelivery() {

  if (
    deliveryMethod === "pickup"
  ) {

    return {

      type: "pickup",

      name: "איסוף עצמי",

      price: 0

    };

  }


  if (
    deliveryMethod === "delivery"
  ) {

    const city =
      DELIVERY_CITIES[
        customerCity.value
      ];


    if (city) {

      return {

        type: "delivery",

        name: city.name,

        price: city.price

      };

    }

  }


  return {

    type: null,

    name: "טרם נבחר",

    price: 0

  };

}


/* EXPRESS */

function getExpressPrice() {

  if (
    deliveryMethod === "delivery" &&
    shippingSpeed === "express"
  ) {

    return EXPRESS_PRICE;

  }


  return 0;

}


/* TOTALS */

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


  const delivery =
    getDelivery();


  const express =
    getExpressPrice();


  return {

    subtotal:
      subtotal,

    shipping:
      delivery.price,

    express:
      express,

    total:
      subtotal +
      delivery.price +
      express

  };

}


/* CART */

function renderCart() {

  const quantity =
    cart.reduce(
      function(total, item) {

        return total + item.quantity;

      },
      0
    );


  cartCount.textContent =
    quantity;


  cartItems.innerHTML = "";


  emptyCart.classList.toggle(
    "hidden",
    cart.length > 0
  );


  cart.forEach(function(item, index) {

    const row =
      document.createElement("div");


    row.className =
      "cart-item";


    row.innerHTML = `

      <img
        src="${escapeHTML(item.image)}"
        alt="${escapeHTML(item.name)}"
      >

      <div>

        <div class="cart-item-name">
          ${escapeHTML(item.name)}
        </div>

        <div class="cart-item-info">
          צבע:
          ${escapeHTML(item.color)}
        </div>

        <div class="cart-item-info">
          ${money(
            item.price *
            item.quantity
          )}
        </div>


        <div class="quantity-controls">

          <button
            type="button"
            data-action="minus"
            data-index="${index}"
          >
            −
          </button>

          <strong>
            ${item.quantity}
          </strong>

          <button
            type="button"
            data-action="plus"
            data-index="${index}"
          >
            +
          </button>

        </div>

      </div>


      <button
        class="remove-button"
        type="button"
        data-action="remove"
        data-index="${index}"
      >
        🗑
      </button>
    `;


    cartItems.appendChild(row);

  });


  const totals =
    calculateTotals();


  subtotalElement.textContent =
    money(totals.subtotal);


  const delivery =
    getDelivery();


  if (
    deliveryMethod === "pickup"
  ) {

    shippingElement.textContent =
      "חינם";

  }

  else if (
    delivery.type === "delivery"
  ) {

    shippingElement.textContent =
      money(delivery.price);

  }

  else {

    shippingElement.textContent =
      "טרם נבחר";

  }


  expressSummaryRow.classList.toggle(
    "hidden",
    totals.express === 0
  );


  totalElement.textContent =
    money(totals.total);


  renderCheckoutSummary();

}


/* CHECKOUT SUMMARY */

function renderCheckoutSummary() {

  if (!checkoutItems) {
    return;
  }


  checkoutItems.innerHTML = "";


  cart.forEach(function(item) {

    const row =
      document.createElement("div");


    row.className =
      "checkout-item";


    row.innerHTML = `

      <div>

        <strong>
          ${escapeHTML(item.name)}
        </strong>

        <br>

        ${escapeHTML(item.color)}
        •
        ${item.quantity} יח׳

      </div>


      <strong>
        ${money(
          item.price *
          item.quantity
        )}
      </strong>
    `;


    checkoutItems.appendChild(row);

  });


  const totals =
    calculateTotals();


  const delivery =
    getDelivery();


  checkoutSubtotal.textContent =
    money(totals.subtotal);


  if (
    deliveryMethod === "pickup"
  ) {

    checkoutShipping.textContent =
      "איסוף עצמי • חינם";

  }

  else if (
    delivery.type === "delivery"
  ) {

    checkoutShipping.textContent =
      delivery.name +
      " • " +
      money(delivery.price);

  }

  else {

    checkoutShipping.textContent =
      "טרם נבחר";

  }


  checkoutExpressRow.classList.toggle(
    "hidden",
    totals.express === 0
  );


  checkoutTotal.textContent =
    money(totals.total);

}


/* PICKUP */

function selectPickup() {

  deliveryMethod =
    "pickup";


  shippingSpeed =
    "regular";


  pickupButton.classList.add(
    "active"
  );


  deliveryButton.classList.remove(
    "active"
  );


  deliveryFields.classList.add(
    "hidden"
  );


  customerCity.required =
    false;


  customerAddress.required =
    false;


  regularShippingButton.classList.add(
    "active"
  );


  expressShippingButton.classList.remove(
    "active"
  );


  deliveryStatus.textContent =
    "📦 איסוף עצמי — חינם";


  renderCart();

}


/* DELIVERY */

function selectDelivery() {

  deliveryMethod =
    "delivery";


  pickupButton.classList.remove(
    "active"
  );


  deliveryButton.classList.add(
    "active"
  );


  deliveryFields.classList.remove(
    "hidden"
  );


  customerCity.required =
    true;


  customerAddress.required =
    true;


  deliveryStatus.textContent =
    "🚚 בחרו עיר למשלוח";


  renderCart();

}


/* SHIPPING SPEED */

function selectRegularShipping() {

  shippingSpeed =
    "regular";


  regularShippingButton.classList.add(
    "active"
  );


  expressShippingButton.classList.remove(
    "active"
  );


  shippingSpeedStatus.textContent =
    "🚚 נבחר משלוח רגיל — 1–14 ימי עסקים";


  renderCart();

}


function selectExpressShipping() {

  shippingSpeed =
    "express";


  expressShippingButton.classList.add(
    "active"
  );


  regularShippingButton.classList.remove(
    "active"
  );


  shippingSpeedStatus.textContent =
    "⚡ EXPRESS — יום עסקים 1 — תוספת ₪4.90";


  renderCart();

}


/* BUILD ORDER */

function buildOrder() {

  const totals =
    calculateTotals();


  const delivery =
    getDelivery();


  return {

    name:
      customerName.value.trim(),

    phone:
      customerPhone.value.trim(),

    deliveryMethod:
      deliveryMethod,

    delivery:
      delivery,

    shippingSpeed:
      deliveryMethod === "delivery"
        ? shippingSpeed
        : null,

    address:
      customerAddress.value.trim(),

    notes:
      customerNotes.value.trim(),

    items:
      cart.map(function(item) {

        return {...item};

      }),

    subtotal:
      totals.subtotal,

    shipping:
      totals.shipping,

    express:
      totals.express,

    total:
      totals.total

  };

}


/* PREVIEW */

function buildOrderPreview(order) {

  let html = "";


  html +=
    "👤 <strong>" +
    escapeHTML(order.name) +
    "</strong><br>";


  html +=
    "📱 " +
    escapeHTML(order.phone) +
    "<hr>";


  order.items.forEach(function(item) {

    html +=
      "🛒 <strong>" +
      escapeHTML(item.name) +
      "</strong><br>";


    html +=
      "🎨 " +
      escapeHTML(item.color) +
      " • " +
      item.quantity +
      " יח׳<br>";


    html +=
      "💰 " +
      money(
        item.price *
        item.quantity
      ) +
      "<br><br>";

  });


  if (
    order.deliveryMethod === "pickup"
  ) {

    html +=
      "📦 <strong>איסוף עצמי — חינם</strong>";

  }

  else {

    html +=
      "🚚 משלוח ל" +
      escapeHTML(
        order.delivery.name
      ) +
      " — " +
      money(order.shipping);


    html +=
      "<br>📍 " +
      escapeHTML(order.address);


    if (
      order.shippingSpeed === "express"
    ) {

      html +=
        "<br>⚡ <strong>EXPRESS — יום עסקים 1</strong>";


      html +=
        "<br>➕ תוספת " +
        money(order.express);

    }

    else {

      html +=
        "<br>🚚 משלוח רגיל — 1–14 ימי עסקים";

    }

  }


  if (order.notes) {

    html +=
      "<br>📝 " +
      escapeHTML(order.notes);

  }


  html +=
    "<hr>💰 <strong>סה״כ: " +
    money(order.total) +
    "</strong>";


  return html;

}


/* WHATSAPP */

function buildWhatsappMessage(order) {

  let text =
    "🛍️ *הזמנה חדשה - 3D MS*\n\n";


  text +=
    "👤 *שם:* " +
    order.name +
    "\n";


  text +=
    "📱 *טלפון:* " +
    order.phone +
    "\n\n";


  text +=
    "📦 *מוצרים:*\n";


  order.items.forEach(function(item) {

    text +=
      "• " +
      item.name +
      "\n";


    text +=
      "🎨 צבע: " +
      item.color +
      "\n";


    text +=
      "🔢 כמות: " +
      item.quantity +
      "\n";


    text +=
      "💰 " +
      money(
        item.price *
        item.quantity
      ) +
      "\n\n";

  });


  if (
    order.deliveryMethod === "pickup"
  ) {

    text +=
      "📦 *איסוף עצמי — חינם*\n";

  }

  else {

    text +=
      "🚚 *עיר:* " +
      order.delivery.name +
      "\n";


    text +=
      "📍 *כתובת:* " +
      order.address +
      "\n";


    text +=
      "💵 *מחיר משלוח:* " +
      money(order.shipping) +
      "\n";


    if (
      order.shippingSpeed ===
      "express"
    ) {

      text +=
        "⚡ *EXPRESS — יום עסקים 1*\n";


      text +=
        "➕ *תוספת EXPRESS:* " +
        money(order.express) +
        "\n";

    }

    else {

      text +=
        "🚚 *מהירות:* משלוח רגיל — 1–14 ימי עסקים\n";

    }

  }


  if (order.notes) {

    text +=
      "📝 *הערות:* " +
      order.notes +
      "\n";

  }


  text +=
    "\n🛍️ מוצרים: " +
    money(order.subtotal) +
    "\n";


  text +=
    "🚚 משלוח: " +
    money(order.shipping) +
    "\n";


  if (order.express > 0) {

    text +=
      "⚡ EXPRESS: " +
      money(order.express) +
      "\n";

  }


  text +=
    "💰 *סה״כ: " +
    money(order.total) +
    "*";


  return text;

}


/* PRODUCT EVENTS */

productsGrid.addEventListener(
  "click",
  function(event) {

    const button =
      event.target.closest(
        "[data-product-id]"
      );


    if (!button) {
      return;
    }


    addToCart(
      button.dataset.productId
    );

  }
);


/* CART EVENTS */

cartItems.addEventListener(
  "click",
  function(event) {

    const button =
      event.target.closest(
        "[data-action]"
      );


    if (!button) {
      return;
    }


    const index =
      Number(
        button.dataset.index
      );


    if (
      button.dataset.action === "plus"
    ) {

      changeQuantity(index, 1);

    }


    if (
      button.dataset.action === "minus"
    ) {

      changeQuantity(index, -1);

    }


    if (
      button.dataset.action === "remove"
    ) {

      removeItem(index);

    }

  }
);


/* CART */

cartButton.onclick =
  function() {

    cartOverlay.classList.remove(
      "hidden"
    );

  };


closeCart.onclick =
  function() {

    cartOverlay.classList.add(
      "hidden"
    );

  };


/* CHECKOUT */

checkoutButton.onclick =
  function() {

    if (cart.length === 0) {

      alert("הסל ריק");

      return;

    }


    cartOverlay.classList.add(
      "hidden"
    );


    checkoutOverlay.classList.remove(
      "hidden"
    );


    renderCheckoutSummary();

  };


closeCheckout.onclick =
  function() {

    checkoutOverlay.classList.add(
      "hidden"
    );

  };


/* DELIVERY EVENTS */

pickupButton.onclick =
  selectPickup;


deliveryButton.onclick =
  selectDelivery;


regularShippingButton.onclick =
  selectRegularShipping;


expressShippingButton.onclick =
  selectExpressShipping;


customerCity.onchange =
  function() {

    const city =
      DELIVERY_CITIES[
        customerCity.value
      ];


    if (city) {

      deliveryStatus.textContent =
        "🚚 " +
        city.name +
        " — " +
        money(city.price);

    }

    else {

      deliveryStatus.textContent =
        "🚚 בחרו עיר למשלוח";

    }


    renderCart();

  };


/* CHECKOUT SUBMIT */

checkoutForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();


    if (!deliveryMethod) {

      alert(
        "בחרו משלוח או איסוף עצמי"
      );

      return;

    }


    if (
      deliveryMethod === "delivery"
    ) {

      if (!customerCity.value) {

        alert(
          "בחרו עיר למשלוח"
        );

        return;

      }


      if (
        !customerAddress.value.trim()
      ) {

        alert(
          "הכניסו כתובת"
        );

        return;

      }

    }


    currentOrder =
      buildOrder();


    finalOrderPreview.innerHTML =
      buildOrderPreview(
        currentOrder
      );


    checkoutOverlay.classList.add(
      "hidden"
    );


    whatsappOverlay.classList.remove(
      "hidden"
    );

  }
);


/* OPEN WHATSAPP */

openWhatsappButton.onclick =
  function() {

    if (!currentOrder) {
      return;
    }


    const text =
      buildWhatsappMessage(
        currentOrder
      );


    const url =
      "https://wa.me/" +
      STORE_WHATSAPP +
      "?text=" +
      encodeURIComponent(text);


    window.open(
      url,
      "_blank"
    );

  };


backToCheckoutButton.onclick =
  function() {

    whatsappOverlay.classList.add(
      "hidden"
    );


    checkoutOverlay.classList.remove(
      "hidden"
    );

  };


/* SUCCESS */

sentWhatsappButton.onclick =
  function() {

    if (!currentOrder) {
      return;
    }


    whatsappOverlay.classList.add(
      "hidden"
    );


    successOrderSummary.innerHTML =
      buildOrderPreview(
        currentOrder
      );


    if (
      currentOrder.deliveryMethod ===
      "pickup"
    ) {

      finalDeliveryTime.textContent =
        "📦 איסוף עצמי — ניצור איתכם קשר לתיאום האיסוף.";

    }

    else if (
      currentOrder.shippingSpeed ===
      "express"
    ) {

      finalDeliveryTime.textContent =
        "⚡ EXPRESS — זמן משלוח משוער: יום עסקים 1.";

    }

    else {

      finalDeliveryTime.textContent =
        "🚚 זמן משלוח משוער: 1–14 ימי עסקים.";

    }


    successOverlay.classList.remove(
      "hidden"
    );

  };


/* CUSTOM BUILD */

customBuildButton.onclick =
  function() {

    customBuildOverlay.classList.remove(
      "hidden"
    );

  };


closeCustomBuild.onclick =
  function() {

    customBuildOverlay.classList.add(
      "hidden"
    );

  };


customBuildForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();


    const name =
      document
        .getElementById("customName")
        .value
        .trim();


    const phone =
      document
        .getElementById("customPhone")
        .value
        .trim();


    const color =
      document
        .getElementById("customColor")
        .value;


    const description =
      document
        .getElementById(
          "customDescription"
        )
        .value
        .trim();


    let text =
      "🛠️ *בקשת בנייה עצמית - 3D MS*\n\n";


    text +=
      "👤 *שם:* " +
      name +
      "\n";


    text +=
      "📱 *טלפון:* " +
      phone +
      "\n";


    text +=
      "🎨 *צבע:* " +
      color +
      "\n\n";


    text +=
      "✏️ *מה אני רוצה:*\n" +
      description +
      "\n\n";


    text +=
      "💰 ידוע לי שבנייה עצמית כרוכה בתשלום נוסף החל מ־5 ₪.";


    const url =
      "https://wa.me/" +
      STORE_WHATSAPP +
      "?text=" +
      encodeURIComponent(text);


    window.open(
      url,
      "_blank"
    );

  }
);


/* RESET */

backToStoreButton.onclick =
  function() {

    cart = [];

    deliveryMethod = null;

    shippingSpeed = "regular";

    currentOrder = null;


    checkoutForm.reset();


    pickupButton.classList.remove(
      "active"
    );


    deliveryButton.classList.remove(
      "active"
    );


    deliveryFields.classList.add(
      "hidden"
    );


    regularShippingButton.classList.add(
      "active"
    );


    expressShippingButton.classList.remove(
      "active"
    );


    deliveryStatus.textContent =
      "עדיין לא נבחרה אפשרות";


    shippingSpeedStatus.textContent =
      "🚚 נבחר משלוח רגיל — 1–14 ימי עסקים";


    successOverlay.classList.add(
      "hidden"
    );


    renderCart();

  };


/* START */

renderCart();

loadProducts();

console.log(
  "🛍️ 3D MS READY"
);
