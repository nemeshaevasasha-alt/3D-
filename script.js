/* =========================================================
   3D MS STORE
   APPWRITE + CART + DELIVERY + WHATSAPP
========================================================= */


/* =========================
   APPWRITE
========================= */

const client = new Appwrite.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6a8441170004dad1c58c");

const databases = new Appwrite.Databases(client);

const DATABASE_ID = "6a855f8f000abdab1a22";
const PRODUCTS_COLLECTION_ID = "products";


/* =========================
   STORE WHATSAPP
========================= */

// בלי + ובלי רווחים
const STORE_WHATSAPP = "972585621659";


/* =========================
   DELIVERY PRICES
========================= */

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


/* =========================
   STATE
========================= */

let products = [];
let cart = [];
let deliveryMethod = null;
let currentOrder = null;


/* =========================
   ELEMENTS
========================= */

const productsGrid = document.getElementById("productsGrid");

const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");

const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");

const subtotalElement = document.getElementById("subtotal");
const shippingElement = document.getElementById("shipping");
const totalElement = document.getElementById("total");

const checkoutButton = document.getElementById("checkoutButton");


/* CHECKOUT */

const checkoutOverlay = document.getElementById("checkoutOverlay");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutForm = document.getElementById("checkoutForm");

const customerName = document.getElementById("customerName");
const customerPhone = document.getElementById("customerPhone");

const pickupButton = document.getElementById("pickupButton");
const deliveryButton = document.getElementById("deliveryButton");

const deliveryStatus = document.getElementById("deliveryStatus");
const deliveryFields = document.getElementById("deliveryFields");

const customerCity = document.getElementById("customerCity");
const customerAddress = document.getElementById("customerAddress");
const customerNotes = document.getElementById("customerNotes");

const checkoutItems = document.getElementById("checkoutItems");
const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutShipping = document.getElementById("checkoutShipping");
const checkoutTotal = document.getElementById("checkoutTotal");


/* WHATSAPP */

const whatsappOverlay = document.getElementById("whatsappOverlay");

const finalOrderPreview = document.getElementById("finalOrderPreview");

const openWhatsappButton = document.getElementById("openWhatsappButton");

const sentWhatsappButton = document.getElementById("sentWhatsappButton");

const backToCheckoutButton = document.getElementById("backToCheckoutButton");


/* SUCCESS */

const successOverlay = document.getElementById("successOverlay");

const successOrderSummary = document.getElementById("successOrderSummary");

const backToStoreButton = document.getElementById("backToStoreButton");


/* =========================
   MONEY
========================= */

function money(value) {

  return "₪" + Number(value || 0).toFixed(2);

}


/* =========================
   SAFE TEXT
========================= */

function escapeHTML(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


/* =========================
   LOAD PRODUCTS
========================= */

async function loadProducts() {

  productsGrid.innerHTML = `
    <div class="loading">
      טוען מוצרים...
    </div>
  `;

  try {

    const response = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      [
        Appwrite.Query.equal("active", true)
      ]
    );


    products = (response.documents || []).map(function(row) {

      return {

        id: row.$id,

        name: row.name || "מוצר",

        price: Number(row.price || 0),

        image: row.image || "",

        colors: String(row.colors || "")
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

    console.error("APPWRITE ERROR:", error);

    productsGrid.innerHTML = `
      <div
        class="loading"
        style="color:#dc2626;"
      >
        לא הצלחנו לטעון את המוצרים 😕
      </div>
    `;

  }

}


/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts() {

  productsGrid.innerHTML = "";


  if (products.length === 0) {

    productsGrid.innerHTML = `
      <div class="loading">
        עדיין אין מוצרים בחנות
      </div>
    `;

    return;

  }


  products.forEach(function(product) {

    const card = document.createElement("article");

    card.className = "product-card";


    let colorsHTML = "";


    if (product.colors.length > 0) {

      colorsHTML = product.colors.map(function(color) {

        return `
          <option value="${escapeHTML(color)}">
            ${escapeHTML(color)}
          </option>
        `;

      }).join("");

    }

    else {

      colorsHTML = `
        <option value="ללא צבע">
          ללא צבע
        </option>
      `;

    }


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
          ${colorsHTML}
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


/* =========================
   ADD TO CART
========================= */

function addToCart(productId) {

  const product = products.find(function(item) {

    return item.id === productId;

  });


  if (!product) {
    return;
  }


  const colorInput = document.getElementById(
    "color-" + productId
  );


  const color = colorInput
    ? colorInput.value
    : "ללא צבע";


  const existing = cart.find(function(item) {

    return (
      item.id === productId &&
      item.color === color
    );

  });


  if (existing) {

    existing.quantity += 1;

  }

  else {

    cart.push({

      id: product.id,

      name: product.name,

      price: product.price,

      image: product.image,

      color: color,

      quantity: 1

    });

  }


  renderCart();

  cartOverlay.classList.remove("hidden");

}


/* =========================
   QUANTITY
========================= */

function changeQuantity(index, amount) {

  if (!cart[index]) {
    return;
  }


  cart[index].quantity += amount;


  if (cart[index].quantity <= 0) {

    cart.splice(index, 1);

  }


  renderCart();

}


function removeItem(index) {

  cart.splice(index, 1);

  renderCart();

}


/* =========================
   DELIVERY
========================= */

function getDelivery() {

  if (deliveryMethod === "pickup") {

    return {

      type: "pickup",

      name: "איסוף עצמי",

      price: 0

    };

  }


  if (deliveryMethod === "delivery") {

    const city = DELIVERY_CITIES[
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


/* =========================
   TOTALS
========================= */

function calculateTotals() {

  const subtotal = cart.reduce(function(sum, item) {

    return sum + (item.price * item.quantity);

  }, 0);


  const delivery = getDelivery();


  return {

    subtotal: subtotal,

    shipping: delivery.price,

    total: subtotal + delivery.price

  };

}


/* =========================
   RENDER CART
========================= */

function renderCart() {

  const itemCount = cart.reduce(function(sum, item) {

    return sum + item.quantity;

  }, 0);


  cartCount.textContent = itemCount;

  cartItems.innerHTML = "";


  if (cart.length === 0) {

    emptyCart.classList.remove("hidden");

  }

  else {

    emptyCart.classList.add("hidden");

  }


  cart.forEach(function(item, index) {

    const itemTotal = item.price * item.quantity;

    const row = document.createElement("div");

    row.className = "cart-item";


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
          🎨 ${escapeHTML(item.color)}
        </div>


        <div class="cart-item-info">
          ${money(itemTotal)}
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


  const totals = calculateTotals();

  const delivery = getDelivery();


  subtotalElement.textContent =
    money(totals.subtotal);


  if (deliveryMethod === "pickup") {

    shippingElement.textContent =
      "חינם 📦";

  }

  else if (
    deliveryMethod === "delivery" &&
    delivery.type === "delivery"
  ) {

    shippingElement.textContent =
      money(delivery.price);

  }

  else {

    shippingElement.textContent =
      "טרם נבחר";

  }


  totalElement.textContent =
    money(totals.total);


  renderCheckoutSummary();

}


/* =========================
   CHECKOUT SUMMARY
========================= */

function renderCheckoutSummary() {

  if (!checkoutItems) {
    return;
  }


  checkoutItems.innerHTML = "";


  cart.forEach(function(item) {

    const row = document.createElement("div");

    row.className = "checkout-item";


    row.innerHTML = `

      <div>

        <strong>
          ${escapeHTML(item.name)}
        </strong>

        <small>
          ${escapeHTML(item.color)}
          •
          ${item.quantity} יח׳
        </small>

      </div>


      <strong>
        ${money(item.price * item.quantity)}
      </strong>
    `;


    checkoutItems.appendChild(row);

  });


  const totals = calculateTotals();

  const delivery = getDelivery();


  checkoutSubtotal.textContent =
    money(totals.subtotal);


  if (deliveryMethod === "pickup") {

    checkoutShipping.textContent =
      "איסוף עצמי • חינם";

  }

  else if (delivery.type === "delivery") {

    checkoutShipping.textContent =
      delivery.name +
      " • " +
      money(delivery.price);

  }

  else {

    checkoutShipping.textContent =
      "טרם נבחר";

  }


  checkoutTotal.textContent =
    money(totals.total);

}


/* =========================
   PICKUP
========================= */

function selectPickup() {

  deliveryMethod = "pickup";


  pickupButton.classList.add("active");

  deliveryButton.classList.remove("active");


  deliveryFields.classList.add("hidden");


  customerCity.required = false;

  customerAddress.required = false;


  deliveryStatus.textContent =
    "📦 איסוף עצמי — חינם";


  renderCart();

}


/* =========================
   DELIVERY
========================= */

function selectDelivery() {

  deliveryMethod = "delivery";


  deliveryButton.classList.add("active");

  pickupButton.classList.remove("active");


  deliveryFields.classList.remove("hidden");


  customerCity.required = true;

  customerAddress.required = true;


  deliveryStatus.textContent =
    "🚚 בחרו עיר למשלוח";


  renderCart();

}


/* =========================
   BUILD ORDER
========================= */

function buildOrder() {

  const totals = calculateTotals();

  const delivery = getDelivery();


  return {

    name:
      customerName.value.trim(),

    phone:
      customerPhone.value.trim(),

    deliveryMethod:
      deliveryMethod,

    delivery:
      delivery,

    address:
      customerAddress.value.trim(),

    notes:
      customerNotes.value.trim(),

    items:
      cart.map(function(item) {

        return {
          ...item
        };

      }),

    subtotal:
      totals.subtotal,

    shipping:
      totals.shipping,

    total:
      totals.total

  };

}


/* =========================
   ORDER PREVIEW
========================= */

function buildOrderPreview(order) {

  let itemsHTML = "";


  order.items.forEach(function(item) {

    itemsHTML += `

      <div>

        🛒 <strong>${escapeHTML(item.name)}</strong>

        <br>

        🎨 ${escapeHTML(item.color)}
        • ${item.quantity} יח׳

        <br>

        💰 ${money(item.price * item.quantity)}

      </div>

      <br>
    `;

  });


  let deliveryHTML = "";


  if (order.deliveryMethod === "pickup") {

    deliveryHTML = `
      📦 <strong>איסוף עצמי — חינם</strong>
    `;

  }

  else {

    deliveryHTML = `

      🚚 משלוח ל:
      <strong>
        ${escapeHTML(order.delivery.name)}
      </strong>

      — ${money(order.shipping)}

      <br>

      📍 כתובת:
      ${escapeHTML(order.address)}
    `;

  }


  let notesHTML = "";


  if (order.notes) {

    notesHTML = `

      <br>

      📝 הערות:
      ${escapeHTML(order.notes)}
    `;

  }


  return `

    👤 שם:
    <strong>
      ${escapeHTML(order.name)}
    </strong>

    <br>

    📱 טלפון:
    ${escapeHTML(order.phone)}

    <hr>

    ${itemsHTML}

    ${deliveryHTML}

    ${notesHTML}

    <hr>

    🛍️ מוצרים:
    <strong>
      ${money(order.subtotal)}
    </strong>

    <br>

    🚚 משלוח:
    <strong>
      ${
        order.shipping === 0
          ? "חינם"
          : money(order.shipping)
      }
    </strong>

    <br><br>

    💰 סה״כ:
    <strong>
      ${money(order.total)}
    </strong>
  `;

}


/* =========================
   WHATSAPP MESSAGE
========================= */

function buildWhatsappMessage(order) {

  let message = "";

  message +=
    "🛍️ *הזמנה חדשה - 3D MS*\n\n";


  message +=
    "👤 *שם:* " +
    order.name +
    "\n";


  message +=
    "📱 *טלפון:* " +
    order.phone +
    "\n\n";


  message +=
    "📦 *פרטי ההזמנה:*\n";


  order.items.forEach(function(item) {

    message +=
      "• " +
      item.name +
      "\n";


    message +=
      "  🎨 צבע: " +
      item.color +
      "\n";


    message +=
      "  🔢 כמות: " +
      item.quantity +
      "\n";


    message +=
      "  💰 מחיר: " +
      money(item.price * item.quantity) +
      "\n\n";

  });


  if (order.deliveryMethod === "pickup") {

    message +=
      "📦 *איסוף עצמי — חינם*\n";

  }

  else {

    message +=
      "🚚 *משלוח:* " +
      order.delivery.name +
      "\n";


    message +=
      "💵 *מחיר משלוח:* " +
      money(order.shipping) +
      "\n";


    message +=
      "📍 *כתובת:* " +
      order.address +
      "\n";

  }


  if (order.notes) {

    message +=
      "📝 *הערות:* " +
      order.notes +
      "\n";

  }


  message +=
    "\n────────────\n";


  message +=
    "🛍️ מוצרים: " +
    money(order.subtotal) +
    "\n";


  message +=
    "🚚 משלוח: " +
    (
      order.shipping === 0
        ? "חינם"
        : money(order.shipping)
    ) +
    "\n";


  message +=
    "💰 *סה״כ לתשלום: " +
    money(order.total) +
    "*";


  return message;

}


/* =========================
   PRODUCTS CLICK
========================= */

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


/* =========================
   CART CLICK
========================= */

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
      Number(button.dataset.index);


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


/* =========================
   CART OPEN / CLOSE
========================= */

cartButton.onclick = function() {

  cartOverlay.classList.remove("hidden");

};


closeCart.onclick = function() {

  cartOverlay.classList.add("hidden");

};


/* =========================
   CHECKOUT OPEN
========================= */

checkoutButton.onclick = function() {

  if (cart.length === 0) {

    alert("הסל שלכם ריק");

    return;

  }


  cartOverlay.classList.add("hidden");

  checkoutOverlay.classList.remove("hidden");

  renderCheckoutSummary();

};


closeCheckout.onclick = function() {

  checkoutOverlay.classList.add("hidden");

};


/* =========================
   DELIVERY BUTTONS
========================= */

pickupButton.onclick = selectPickup;

deliveryButton.onclick = selectDelivery;


customerCity.onchange = function() {

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


/* =========================
   CHECKOUT SUBMIT
========================= */

checkoutForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();


    if (cart.length === 0) {

      alert("הסל ריק");

      return;

    }


    if (!customerName.value.trim()) {

      alert("הכניסו שם מלא");

      return;

    }


    if (!customerPhone.value.trim()) {

      alert("הכניסו מספר טלפון");

      return;

    }


    if (!deliveryMethod) {

      alert(
        "בחרו איסוף עצמי או משלוח"
      );

      return;

    }


    if (
      deliveryMethod === "delivery"
    ) {

      if (!customerCity.value) {

        alert("בחרו עיר למשלוח");

        return;

      }


      if (!customerAddress.value.trim()) {

        alert("הכניסו כתובת למשלוח");

        return;

      }

    }


    currentOrder = buildOrder();


    finalOrderPreview.innerHTML =
      buildOrderPreview(currentOrder);


    checkoutOverlay.classList.add("hidden");

    whatsappOverlay.classList.remove("hidden");

  }
);


/* =========================
   OPEN WHATSAPP
========================= */

openWhatsappButton.onclick = function() {

  if (!currentOrder) {
    return;
  }


  const message =
    buildWhatsappMessage(currentOrder);


  const whatsappURL =
    "https://wa.me/" +
    STORE_WHATSAPP +
    "?text=" +
    encodeURIComponent(message);


  window.open(
    whatsappURL,
    "_blank"
  );

};


/* =========================
   BACK TO CHECKOUT
========================= */

backToCheckoutButton.onclick = function() {

  whatsappOverlay.classList.add("hidden");

  checkoutOverlay.classList.remove("hidden");

};


/* =========================
   CUSTOMER SENT WHATSAPP
========================= */

sentWhatsappButton.onclick = function() {

  if (!currentOrder) {
    return;
  }


  whatsappOverlay.classList.add("hidden");


  successOrderSummary.innerHTML =
    buildOrderPreview(currentOrder) +
    `

      <hr>

      💬
      <strong>
        ההזמנה נשלחה דרך WhatsApp
      </strong>

      <br>

      ניצור איתכם קשר לגבי התשלום
      והמשך הטיפול בהזמנה.
    `;


  successOverlay.classList.remove("hidden");

};


/* =========================
   BACK TO STORE
========================= */

backToStoreButton.onclick = function() {

  cart = [];

  deliveryMethod = null;

  currentOrder = null;


  checkoutForm.reset();


  pickupButton.classList.remove("active");

  deliveryButton.classList.remove("active");


  deliveryFields.classList.add("hidden");


  deliveryStatus.textContent =
    "עדיין לא נבחרה אפשרות";


  successOverlay.classList.add("hidden");


  renderCart();

};


/* =========================
   START
========================= */

renderCart();

loadProducts();

console.log(
  "🛍️ 3D MS STORE READY"
);
/* =========================================================
   CUSTOM BUILD
========================================================= */

const customBuildButton =
  document.getElementById(
    "customBuildButton"
  );

const customBuildOverlay =
  document.getElementById(
    "customBuildOverlay"
  );

const closeCustomBuild =
  document.getElementById(
    "closeCustomBuild"
  );

const customBuildForm =
  document.getElementById(
    "customBuildForm"
  );


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
        .getElementById(
          "customName"
        )
        .value
        .trim();


    const phone =
      document
        .getElementById(
          "customPhone"
        )
        .value
        .trim();


    const color =
      document
        .getElementById(
          "customColor"
        )
        .value;


    const description =
      document
        .getElementById(
          "customDescription"
        )
        .value
        .trim();


    if (
      !name ||
      !phone ||
      !color ||
      !description
    ) {

      alert(
        "מלאו את כל הפרטים"
      );

      return;

    }


    let message = "";

    message +=
      "🛠️ *בקשת בנייה עצמית - 3D MS*\n\n";


    message +=
      "👤 *שם:* " +
      name +
      "\n";


    message +=
      "📱 *טלפון:* " +
      phone +
      "\n";


    message +=
      "🎨 *צבע:* " +
      color +
      "\n\n";


    message +=
      "✏️ *מה אני רוצה:*\n" +
      description +
      "\n\n";


    message +=
      "אשמח לקבל מחיר וזמן הכנה.";


    const whatsappURL =
      "https://wa.me/" +
      STORE_WHATSAPP +
      "?text=" +
      encodeURIComponent(
        message
      );


    window.open(
      whatsappURL,
      "_blank"
    );

  }
);
