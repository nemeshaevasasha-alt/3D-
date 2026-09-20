/* =========================================================
   3D MS
   HEBREW + ENGLISH
========================================================= */


/* APPWRITE */

const client = new Appwrite.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6a8441170004dad1c58c");

const databases = new Appwrite.Databases(client);

const DATABASE_ID = "6a855f8f000abdab1a22";
const PRODUCTS_COLLECTION_ID = "products";

const STORE_WHATSAPP = "972585621659";

const EXPRESS_PRICE = 4.90;
const FREE_SHIPPING_THRESHOLD = 150;


/* STATE */

let products = [];
let cart = [];

let deliveryMethod = null;
let shippingSpeed = "regular";
let currentOrder = null;

let currentLanguage =
  localStorage.getItem("3dms-language") || "he";

if (!["he", "en"].includes(currentLanguage)) {
  currentLanguage = "he";
}


/* TRANSLATIONS */

const translations = {

  he: {

    languageButton: "🇬🇧 English",

    cart: "🛒 סל",

    heroTitle: "מוצרים בהדפסת תלת־ממד",
    heroText: "מוצרים מיוחדים ושימושיים בהדפסת תלת־ממד בישראל",

    heroPickup: "📦 איסוף עצמי — חינם",
    heroDelivery: "🚚 חיפה ₪9.90 • שאר הארץ ₪24.90 עד הדואר • חינם מעל ₪150",
    heroExpress: "⚡ EXPRESS — תוספת ₪4.90",

    customBuild: "🛠 בנייה עצמית",

    customIntro:
      "יש לכם רעיון משלכם? ספרו לנו מה תרצו שנדפיס.<br><strong>🎁 בנייה עצמית ללא תוספת תשלום!</strong>",

    productsTitle: "המוצרים שלנו",
    productsSubtitle: "בחרו מוצר וצבע והוסיפו לסל",

    loadingProducts: "טוען מוצרים...",
    noProducts: "אין מוצרים כרגע",
    loadingError: "לא הצלחנו לטעון את המוצרים",

    chooseColor: "בחרו צבע",
    noColor: "ללא צבע",
    addToCart: "🛒 הוסף לסל",

    cartTitle: "🛒 הסל שלך",
    emptyCartTitle: "הסל עדיין ריק",
    emptyCartText: "הוסיפו מוצר כדי להתחיל",

    products: "מוצרים",
    shipping: "משלוח",
    total: "סה״כ",
    notSelected: "טרם נבחר",
    free: "חינם",

    continueOrder: "המשך להזמנה",

    checkoutTitle: "📦 השלמת הזמנה",
    checkoutSubtitle: "מלאו את הפרטים שלכם",

    personalDetails: "👤 פרטים אישיים",
    fullName: "שם מלא",
    phone: "מספר טלפון",

    namePlaceholder: "ישראל ישראלי",

    deliveryMethod:
      "🚚 איך תרצו לקבל את ההזמנה?",

    pickup: "איסוף עצמי",
    delivery: "משלוח",

    priceByCity: "חיפה ₪9.90 • שאר הארץ ₪24.90 עד הדואר",

    noDeliverySelected:
      "עדיין לא נבחרה אפשרות",

    pickupSelected:
      "📦 איסוף עצמי — חינם",

    chooseDeliveryCity:
      "🚚 בחרו עיר למשלוח",

    deliveryDetails:
      "📍 פרטי משלוח",

    city: "עיר",
    chooseCity: "בחרו עיר",

    haifa: "חיפה",
    telAviv: "תל אביב",

    shippingSpeed:
      "⚡ מהירות משלוח",

    regularShipping:
      "משלוח רגיל",

    regularTime:
      "1–10 ימי עסקים",

    expressTime:
      "יום עסקים 1<br>+₪4.90",

    regularSelected:
      "🚚 נבחר משלוח רגיל",

    expressSelected:
      "⚡ EXPRESS — יום עסקים 1 — תוספת ₪4.90",

    address:
      "רחוב ומספר בית",

    addressPlaceholder:
      "לדוגמה: הרצל 10",

    notes:
      "הערות (לא חובה)",

    optional:
      "לא חובה",

    orderSummary:
      "🧾 סיכום ההזמנה",

    shippingPickup:
      "משלוח / איסוף",

    checkoutWhatsapp:
      "🟢 המשך לשליחת ההזמנה ב־WhatsApp",

    whatsappTitle:
      "שליחת ההזמנה",

    whatsappText:
      "WhatsApp ייפתח עם כל פרטי ההזמנה מוכנים.",

    openWhatsapp:
      "🟢 פתיחת WhatsApp ושליחת ההזמנה",

    whatsappReminder:
      "אחרי ששלחתם את ההודעה, חזרו לאתר.",

    sentOrder:
      "✓ שלחתי את ההזמנה",

    backCheckout:
      "חזרה לעריכת ההזמנה",

    success:
      "תודה על ההזמנה! 🎉",

    estimatedTime:
      "⏱️ זמן משוער",

    backStore:
      "חזרה לחנות",

    customModalTitle:
      "🛠 בנייה עצמית",

    customModalSubtitle:
      "ספרו לנו מה תרצו שנדפיס",

    customNotice:
      "🎁 בנייה עצמית ללא תוספת תשלום!",

    customPhone:
      "טלפון",

    color:
      "צבע",

    chooseCustomColor:
      "בחרו צבע",

    customDescription:
      "מה תרצו שנבנה?",

    customDescriptionPlaceholder:
      "תארו בקצרה את הרעיון...",

    customSubmit:
      "🟢 שליחת הבקשה ב־WhatsApp",

    quantity: "כמות",
    units: "יח׳",

    cartColor: "צבע",

    cartEmptyAlert:
      "הסל ריק",

    chooseMethodAlert:
      "בחרו משלוח או איסוף עצמי",

    chooseCityAlert:
      "בחרו עיר למשלוח",

    addressAlert:
      "הכניסו כתובת",

    pickupSummary:
      "איסוף עצמי • חינם",

    successPickup:
      "📦 איסוף עצמי — ניצור איתכם קשר לתיאום האיסוף.",

    successExpress:
      "⚡ EXPRESS — זמן משלוח משוער: יום עסקים 1.",

    successRegular:
      "🚚 זמן משלוח משוער: 1–10 ימי עסקים (חיפה: יום עסקים 1).",

    customColors: [
      "שחור",
      "לבן",
      "אדום",
      "כחול",
      "ירוק",
      "צהוב",
      "אפור",
      "חום",
      "סגול"
    ]
  },


  en: {

    languageButton: "🇮🇱 עברית",

    cart: "🛒 Cart",

    heroTitle: "3D Printed Products",
    heroText: "Unique and useful 3D printed products in Israel",

    heroPickup: "📦 Self pickup — Free",
    heroDelivery: "🚚 Haifa ₪9.90 • Rest of Israel ₪24.90 to post office • Free over ₪150",
    heroExpress: "⚡ EXPRESS — +₪4.90",

    customBuild: "🛠 Custom Build",

    customIntro:
      "Have your own idea? Tell us what you would like us to print.<br><strong>🎁 Custom builds — no additional charge!</strong>",

    productsTitle: "Our Products",
    productsSubtitle: "Choose a product and color and add it to your cart",

    loadingProducts: "Loading products...",
    noProducts: "No products available right now",
    loadingError: "We couldn't load the products",

    chooseColor: "Choose a color",
    noColor: "No color",
    addToCart: "🛒 Add to Cart",

    cartTitle: "🛒 Your Cart",
    emptyCartTitle: "Your cart is empty",
    emptyCartText: "Add a product to get started",

    products: "Products",
    shipping: "Delivery",
    total: "Total",
    notSelected: "Not selected",
    free: "Free",

    continueOrder: "Continue to Checkout",

    checkoutTitle: "📦 Complete Your Order",
    checkoutSubtitle: "Enter your details",

    personalDetails: "👤 Personal Details",
    fullName: "Full Name",
    phone: "Phone Number",

    namePlaceholder: "Full name",

    deliveryMethod:
      "🚚 How would you like to receive your order?",

    pickup: "Self Pickup",
    delivery: "Delivery",

    priceByCity: "Haifa ₪9.90 • Rest of Israel ₪24.90 to post office",

    noDeliverySelected:
      "No option selected yet",

    pickupSelected:
      "📦 Self pickup — Free",

    chooseDeliveryCity:
      "🚚 Choose a delivery city",

    deliveryDetails:
      "📍 Delivery Details",

    city: "City",
    chooseCity: "Choose a city",

    haifa: "Haifa",
    telAviv: "Tel Aviv",

    shippingSpeed:
      "⚡ Delivery Speed",

    regularShipping:
      "Standard Delivery",

    regularTime:
      "1–10 business days",

    expressTime:
      "1 business day<br>+₪4.90",

    regularSelected:
      "🚚 Standard delivery selected",

    expressSelected:
      "⚡ EXPRESS — 1 business day — +₪4.90",

    address:
      "Street and House Number",

    addressPlaceholder:
      "Example: Herzl 10",

    notes:
      "Notes (optional)",

    optional:
      "Optional",

    orderSummary:
      "🧾 Order Summary",

    shippingPickup:
      "Delivery / Pickup",

    checkoutWhatsapp:
      "🟢 Continue to WhatsApp",

    whatsappTitle:
      "Send Your Order",

    whatsappText:
      "WhatsApp will open with all your order details ready.",

    openWhatsapp:
      "🟢 Open WhatsApp and Send Order",

    whatsappReminder:
      "After sending the message, return to the website.",

    sentOrder:
      "✓ I Sent the Order",

    backCheckout:
      "Back to Edit Order",

    success:
      "Thank You for Your Order! 🎉",

    estimatedTime:
      "⏱️ Estimated Time",

    backStore:
      "Back to Store",

    customModalTitle:
      "🛠 Custom Build",

    customModalSubtitle:
      "Tell us what you would like us to print",

    customNotice:
      "🎁 Custom builds — no additional charge!",

    customPhone:
      "Phone",

    color:
      "Color",

    chooseCustomColor:
      "Choose a color",

    customDescription:
      "What would you like us to build?",

    customDescriptionPlaceholder:
      "Briefly describe your idea...",

    customSubmit:
      "🟢 Send Request via WhatsApp",

    quantity: "Quantity",
    units: "pcs",

    cartColor: "Color",

    cartEmptyAlert:
      "Your cart is empty",

    chooseMethodAlert:
      "Choose delivery or self pickup",

    chooseCityAlert:
      "Choose a delivery city",

    addressAlert:
      "Enter an address",

    pickupSummary:
      "Self pickup • Free",

    successPickup:
      "📦 Self pickup — we will contact you to arrange pickup.",

    successExpress:
      "⚡ EXPRESS — estimated delivery time: 1 business day.",

    successRegular:
      "🚚 Estimated delivery time: 1–10 business days (Haifa: 1 business day).",

    customColors: [
      "Black",
      "White",
      "Red",
      "Blue",
      "Green",
      "Yellow",
      "Gray",
      "Brown",
      "Purple"
    ]
  }

};


/* DELIVERY */

function normalizeCity(city) {
  return String(city || "")
    .trim()
    .toLowerCase()
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ");
}

function isHaifa(city) {
  const value = normalizeCity(city);
  return value === "חיפה" || value === "haifa";
}

function getCityShippingPrice(city) {
  return isHaifa(city) ? 9.90 : 24.90;
}

function getCityDeliveryTime(city) {
  if (isHaifa(city)) {
    return currentLanguage === "he" ? "יום עסקים 1" : "1 business day";
  }
  return currentLanguage === "he" ? "1–10 ימי עסקים" : "1–10 business days";
}

function postOfficeLabel() {
  return currentLanguage === "he" ? "משלוח עד הדואר" : "Delivery to post office";
}



/* HELPERS */

function t(key) {
  return translations[currentLanguage][key];
}


function money(value) {
  return "₪" + Number(value || 0).toFixed(2);
}

function getCartSubtotal() {
  return cart.reduce(function(total, item) {
    return total + item.price * item.quantity;
  }, 0);
}

function hasFreeShipping(subtotal = getCartSubtotal()) {
  return subtotal >= FREE_SHIPPING_THRESHOLD;
}

function freeShippingLabel() {
  return currentLanguage === "he" ? "חינם בקנייה מעל ₪150" : "Free on orders over ₪150";
}


function escapeHTML(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function setText(id, value) {

  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }

}


function setHTML(id, value) {

  const element = document.getElementById(id);

  if (element) {
    element.innerHTML = value;
  }

}


/* ELEMENTS */

const productsGrid = document.getElementById("productsGrid");

const languageButton = document.getElementById("languageButton");

const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");

const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");

const subtotalElement = document.getElementById("subtotal");
const shippingElement = document.getElementById("shipping");
const expressSummaryRow = document.getElementById("expressSummaryRow");
const totalElement = document.getElementById("total");

const checkoutButton = document.getElementById("checkoutButton");

const checkoutOverlay = document.getElementById("checkoutOverlay");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutForm = document.getElementById("checkoutForm");

const customerName = document.getElementById("customerName");
const customerPhone = document.getElementById("customerPhone");

const pickupButton = document.getElementById("pickupButton");
const deliveryButton = document.getElementById("deliveryButton");

const deliveryStatus = document.getElementById("deliveryStatus");
const deliveryFields = document.getElementById("deliveryFields");

let customerCity = document.getElementById("customerCity");

if (customerCity && customerCity.tagName === "SELECT") {
  const cityInput = document.createElement("input");
  cityInput.id = "customerCity";
  cityInput.type = "text";
  cityInput.autocomplete = "address-level2";
  cityInput.placeholder = currentLanguage === "he"
    ? "לדוגמה: חיפה, תל אביב, ירושלים..."
    : "Example: Haifa, Tel Aviv, Jerusalem...";
  customerCity.replaceWith(cityInput);
  customerCity = cityInput;
}
const customerAddress = document.getElementById("customerAddress");
const customerNotes = document.getElementById("customerNotes");

const regularShippingButton =
  document.getElementById("regularShippingButton");

const expressShippingButton =
  document.getElementById("expressShippingButton");

const shippingSpeedStatus =
  document.getElementById("shippingSpeedStatus");

const checkoutItems =
  document.getElementById("checkoutItems");

const checkoutSubtotal =
  document.getElementById("checkoutSubtotal");

const checkoutShipping =
  document.getElementById("checkoutShipping");

const checkoutExpressRow =
  document.getElementById("checkoutExpressRow");

const checkoutTotal =
  document.getElementById("checkoutTotal");

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

const successOverlay =
  document.getElementById("successOverlay");

const successOrderSummary =
  document.getElementById("successOrderSummary");

const finalDeliveryTime =
  document.getElementById("finalDeliveryTime");

const backToStoreButton =
  document.getElementById("backToStoreButton");

const customBuildButton =
  document.getElementById("customBuildButton");

const customBuildOverlay =
  document.getElementById("customBuildOverlay");

const closeCustomBuild =
  document.getElementById("closeCustomBuild");

const customBuildForm =
  document.getElementById("customBuildForm");

const customColor =
  document.getElementById("customColor");


/* PRODUCT LANGUAGE */

function getProductName(product) {

  if (
    currentLanguage === "en" &&
    product.nameEn
  ) {
    return product.nameEn;
  }

  return product.nameHe;
}


function getProductColors(product) {

  if (
    currentLanguage === "en" &&
    product.colorsEn.length
  ) {
    return product.colorsEn;
  }

  return product.colorsHe;
}


/* LOAD PRODUCTS */

async function loadProducts() {

  productsGrid.innerHTML = `
    <div class="loading">
      ${t("loadingProducts")}
    </div>
  `;

  try {

    const result =
      await databases.listDocuments(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        [
          Appwrite.Query.equal("active", true)
        ]
      );

    products =
      (result.documents || []).map(function(row) {

        return {

          id: row.$id,

          nameHe:
            row.name || "מוצר",

          nameEn:
            String(row.name_en || "").trim(),

          price:
            Number(row.price || 0),

          image:
            row.image || "",

          colorsHe:
            String(row.colors || "")
              .split(",")
              .map(color => color.trim())
              .filter(Boolean),

          colorsEn:
            String(row.colors_en || "")
              .split(",")
              .map(color => color.trim())
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
        ${t("loadingError")}
      </div>
    `;

  }

}


/* PRODUCTS */

function renderProducts() {

  productsGrid.innerHTML = "";

  if (!products.length) {

    productsGrid.innerHTML = `
      <div class="loading">
        ${t("noProducts")}
      </div>
    `;

    return;
  }

  products.forEach(function(product) {

    const card = document.createElement("article");

    card.className = "product-card";

    const productName =
      getProductName(product);

    let colors =
      getProductColors(product);

    if (!colors.length) {
      colors = [t("noColor")];
    }

    const colorOptions =
      colors.map(function(color, index) {

        return `
          <option
            value="${index}"
          >
            ${escapeHTML(color)}
          </option>
        `;

      }).join("");

    card.innerHTML = `

      <img
        class="product-image"
        src="${escapeHTML(product.image)}"
        alt="${escapeHTML(productName)}"
      >

      <div class="product-content">

        <div class="product-name">
          ${escapeHTML(productName)}
        </div>

        <div class="product-price">
          ${money(product.price)}
        </div>

        <label class="color-label">
          ${t("chooseColor")}
        </label>

        <select
          id="color-${product.id}"
          class="product-color"
        >
          ${colorOptions}
        </select>

        <button
          class="add-button"
          type="button"
          data-product-id="${product.id}"
        >
          ${t("addToCart")}
        </button>

      </div>
    `;

    productsGrid.appendChild(card);

  });

}


/* CART */

function addToCart(productId) {

  const product =
    products.find(item => item.id === productId);

  if (!product) {
    return;
  }

  const select =
    document.getElementById("color-" + productId);

  const selectedIndex =
    select ? Number(select.value) : 0;

  const colorsHe =
    product.colorsHe.length
      ? product.colorsHe
      : [translations.he.noColor];

  const colorsEn =
    product.colorsEn.length
      ? product.colorsEn
      : colorsHe;

  const colorHe =
    colorsHe[selectedIndex] ||
    colorsHe[0] ||
    translations.he.noColor;

  const colorEn =
    colorsEn[selectedIndex] ||
    colorHe;

  const existing =
    cart.find(function(item) {

      return (
        item.id === productId &&
        item.colorHe === colorHe
      );

    });

  if (existing) {

    existing.quantity++;

  }

  else {

    cart.push({

      id: product.id,

      nameHe: product.nameHe,
      nameEn: product.nameEn || product.nameHe,

      price: product.price,
      image: product.image,

      colorHe: colorHe,
      colorEn: colorEn,

      quantity: 1

    });

  }

  renderCart();

  cartOverlay.classList.remove("hidden");

}


function cartItemName(item) {

  return currentLanguage === "en"
    ? item.nameEn
    : item.nameHe;
}


function cartItemColor(item) {

  return currentLanguage === "en"
    ? item.colorEn
    : item.colorHe;
}


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


/* DELIVERY */

function getDelivery() {

  if (deliveryMethod === "pickup") {
    return { type: "pickup", name: t("pickup"), price: 0, time: "" };
  }

  if (deliveryMethod === "delivery") {
    const city = customerCity.value.trim();
    if (city) {
      return {
        type: "delivery",
        name: city,
        price: getCityShippingPrice(city),
        time: getCityDeliveryTime(city)
      };
    }
  }

  return { type: null, name: t("notSelected"), price: 0, time: "" };

}


function getExpressPrice() {

  if (
    deliveryMethod === "delivery" &&
    shippingSpeed === "express"
  ) {
    return EXPRESS_PRICE;
  }

  return 0;

}


function calculateTotals() {

  const subtotal = getCartSubtotal();
  const delivery = getDelivery();
  const shipping = delivery.type === "delivery" && hasFreeShipping(subtotal)
    ? 0
    : delivery.price;
  const express = getExpressPrice();

  return { subtotal, shipping, express, total: subtotal + shipping + express };

}


/* RENDER CART */

function renderCart() {

  const quantity =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  cartCount.textContent = quantity;

  cartItems.innerHTML = "";

  emptyCart.classList.toggle(
    "hidden",
    cart.length > 0
  );

  cart.forEach(function(item, index) {

    const row =
      document.createElement("div");

    row.className = "cart-item";

    row.innerHTML = `

      <img
        src="${escapeHTML(item.image)}"
        alt="${escapeHTML(cartItemName(item))}"
      >

      <div>

        <div class="cart-item-name">
          ${escapeHTML(cartItemName(item))}
        </div>

        <div class="cart-item-info">
          ${t("cartColor")}:
          ${escapeHTML(cartItemColor(item))}
        </div>

        <div class="cart-item-info">
          ${money(item.price * item.quantity)}
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
      t("free");

  }

  else if (delivery.type === "delivery") {

    shippingElement.textContent =
      totals.shipping === 0 && hasFreeShipping(totals.subtotal)
        ? freeShippingLabel()
        : money(totals.shipping);

  }

  else {

    shippingElement.textContent =
      t("notSelected");

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

  checkoutItems.innerHTML = "";

  cart.forEach(function(item) {

    const row =
      document.createElement("div");

    row.className = "checkout-item";

    row.innerHTML = `

      <div>

        <strong>
          ${escapeHTML(cartItemName(item))}
        </strong>

        <br>

        ${escapeHTML(cartItemColor(item))}
        •
        ${item.quantity} ${t("units")}

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
      t("pickupSummary");

  }

  else if (delivery.type === "delivery") {

    checkoutShipping.textContent =
      delivery.name +
      " • " +
      (totals.shipping === 0 && hasFreeShipping(totals.subtotal)
        ? freeShippingLabel()
        : money(totals.shipping)) +
      " • " +
      delivery.time +
      (isHaifa(delivery.name) ? "" : " • " + postOfficeLabel());

  }

  else {

    checkoutShipping.textContent =
      t("notSelected");

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

  deliveryMethod = "pickup";
  shippingSpeed = "regular";

  pickupButton.classList.add("active");
  deliveryButton.classList.remove("active");

  deliveryFields.classList.add("hidden");

  customerCity.required = false;
  customerAddress.required = false;

  regularShippingButton.classList.add("active");
  expressShippingButton.classList.remove("active");

  deliveryStatus.textContent =
    t("pickupSelected");

  renderCart();

}


/* DELIVERY */

function selectDelivery() {

  deliveryMethod = "delivery";

  pickupButton.classList.remove("active");
  deliveryButton.classList.add("active");

  deliveryFields.classList.remove("hidden");

  customerCity.required = true;
  customerAddress.required = true;

  updateDeliveryStatus();

  renderCart();

}


/* SPEED */

function selectRegularShipping() {

  shippingSpeed = "regular";

  regularShippingButton.classList.add("active");
  expressShippingButton.classList.remove("active");

  shippingSpeedStatus.textContent =
    t("regularSelected");

  renderCart();

}


function selectExpressShipping() {

  shippingSpeed = "express";

  expressShippingButton.classList.add("active");
  regularShippingButton.classList.remove("active");

  shippingSpeedStatus.textContent =
    t("expressSelected");

  renderCart();

}


function updateDeliveryStatus() {

  const city = customerCity.value.trim();

  if (deliveryMethod === "delivery" && city) {
    const price = hasFreeShipping() ? freeShippingLabel() : money(getCityShippingPrice(city));
    deliveryStatus.textContent =
      "🚚 " + city + " — " + price + " • " + getCityDeliveryTime(city) +
      (isHaifa(city) ? "" : " • " + postOfficeLabel());
  }
  else if (deliveryMethod === "delivery") {
    deliveryStatus.textContent = currentLanguage === "he"
      ? "🚚 הכניסו עיר למשלוח"
      : "🚚 Enter a delivery city";
  }
  else if (deliveryMethod === "pickup") {
    deliveryStatus.textContent = t("pickupSelected");
  }
  else {
    deliveryStatus.textContent = t("noDeliverySelected");
  }

}


/* LANGUAGE */

function updateLanguage() {

  const isHebrew =
    currentLanguage === "he";

  document.documentElement.lang =
    currentLanguage;

  document.documentElement.dir =
    isHebrew ? "rtl" : "ltr";

  document.title =
    isHebrew
      ? "3D MS | מוצרים בהדפסת תלת־ממד בישראל"
      : "3D MS | 3D Printed Products in Israel";


  setText(
    "languageButton",
    t("languageButton")
  );

  setText(
    "cartButtonText",
    t("cart")
  );

  setText("heroTitle", t("heroTitle"));
  setText("heroText", t("heroText"));

  setText("heroPickup", t("heroPickup"));
  setText("heroDelivery", t("heroDelivery"));
  setText("heroExpress", t("heroExpress"));

  setText(
    "customBuildButton",
    t("customBuild")
  );

  setHTML(
    "customBuildIntro",
    t("customIntro")
  );

  setText(
    "productsTitle",
    t("productsTitle")
  );

  setText(
    "productsSubtitle",
    t("productsSubtitle")
  );

  setText(
    "cartTitle",
    t("cartTitle")
  );

  setText(
    "emptyCartTitle",
    t("emptyCartTitle")
  );

  setText(
    "emptyCartText",
    t("emptyCartText")
  );

  setText(
    "cartProductsLabel",
    t("products")
  );

  setText(
    "cartShippingLabel",
    t("shipping")
  );

  setText(
    "cartTotalLabel",
    t("total")
  );

  setText(
    "checkoutButton",
    t("continueOrder")
  );

  setText(
    "checkoutTitle",
    t("checkoutTitle")
  );

  setText(
    "checkoutSubtitle",
    t("checkoutSubtitle")
  );

  setText(
    "personalTitle",
    t("personalDetails")
  );

  setText(
    "nameLabel",
    t("fullName")
  );

  setText(
    "phoneLabel",
    t("phone")
  );

  customerName.placeholder =
    t("namePlaceholder");

  setText(
    "deliveryMethodTitle",
    t("deliveryMethod")
  );

  setText(
    "pickupTitle",
    t("pickup")
  );

  setText(
    "pickupPrice",
    t("free")
  );

  setText(
    "deliveryTitle",
    t("delivery")
  );

  setText(
    "deliveryPriceText",
    t("priceByCity")
  );

  setText(
    "deliveryDetailsTitle",
    t("deliveryDetails")
  );

  setText(
    "cityLabel",
    t("city")
  );

  customerCity.placeholder =
    currentLanguage === "he"
      ? "לדוגמה: חיפה, תל אביב, ירושלים..."
      : "Example: Haifa, Tel Aviv, Jerusalem...";

  setText(
    "shippingSpeedTitle",
    t("shippingSpeed")
  );

  setText(
    "regularShippingTitle",
    t("regularShipping")
  );

  setText(
    "regularShippingTime",
    t("regularTime")
  );

  setHTML(
    "expressShippingTime",
    t("expressTime")
  );

  setText(
    "addressLabel",
    t("address")
  );

  customerAddress.placeholder =
    t("addressPlaceholder");

  setText(
    "notesLabel",
    t("notes")
  );

  customerNotes.placeholder =
    t("optional");

  setText(
    "orderSummaryTitle",
    t("orderSummary")
  );

  setText(
    "checkoutProductsLabel",
    t("products")
  );

  setText(
    "checkoutShippingLabel",
    t("shippingPickup")
  );

  setText(
    "checkoutTotalLabel",
    t("total")
  );

  setText(
    "checkoutSubmitButton",
    t("checkoutWhatsapp")
  );

  setText(
    "whatsappTitle",
    t("whatsappTitle")
  );

  setText(
    "whatsappText",
    t("whatsappText")
  );

  setText(
    "openWhatsappButton",
    t("openWhatsapp")
  );

  setText(
    "whatsappReminder",
    t("whatsappReminder")
  );

  setText(
    "sentWhatsappButton",
    t("sentOrder")
  );

  setText(
    "backToCheckoutButton",
    t("backCheckout")
  );

  setText(
    "successTitle",
    t("success")
  );

  setText(
    "estimatedTimeTitle",
    t("estimatedTime")
  );

  setText(
    "backToStoreButton",
    t("backStore")
  );

  setText(
    "customModalTitle",
    t("customModalTitle")
  );

  setText(
    "customModalSubtitle",
    t("customModalSubtitle")
  );

  setText(
    "customNotice",
    t("customNotice")
  );

  setText(
    "customNameLabel",
    t("fullName")
  );

  setText(
    "customPhoneLabel",
    t("customPhone")
  );

  setText(
    "customColorLabel",
    t("color")
  );

  setText(
    "customDescriptionLabel",
    t("customDescription")
  );

  document
    .getElementById("customDescription")
    .placeholder =
      t("customDescriptionPlaceholder");

  setText(
    "customSubmitButton",
    t("customSubmit")
  );


  /* CUSTOM COLORS */

  customColor.innerHTML =
    `<option value="">
      ${t("chooseCustomColor")}
    </option>`;

  t("customColors").forEach(function(color) {

    const option =
      document.createElement("option");

    option.value = color;
    option.textContent = color;

    customColor.appendChild(option);

  });


  /* DYNAMIC STATUS */

  updateDeliveryStatus();

  shippingSpeedStatus.textContent =
    shippingSpeed === "express"
      ? t("expressSelected")
      : t("regularSelected");


  /* DYNAMIC CONTENT */

  renderProducts();
  renderCart();


  if (currentOrder) {

    finalOrderPreview.innerHTML =
      buildOrderPreview(currentOrder);

    successOrderSummary.innerHTML =
      buildOrderPreview(currentOrder);

  }

}


languageButton.addEventListener(
  "click",
  function() {

    currentLanguage =
      currentLanguage === "he"
        ? "en"
        : "he";

    localStorage.setItem(
      "3dms-language",
      currentLanguage
    );

    updateLanguage();

  }
);


/* BUILD ORDER */

function buildOrder() {

  const totals = calculateTotals();
  const delivery = getDelivery();

  return {

    name:
      customerName.value.trim(),

    phone:
      customerPhone.value.trim(),

    deliveryMethod,

    city:
      customerCity.value.trim(),

    shippingSpeed:
      deliveryMethod === "delivery"
        ? shippingSpeed
        : null,

    address:
      customerAddress.value.trim(),

    notes:
      customerNotes.value.trim(),

    items:
      cart.map(item => ({...item})),

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


/* ORDER PREVIEW */

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
      escapeHTML(cartItemName(item)) +
      "</strong><br>";

    html +=
      "🎨 " +
      escapeHTML(cartItemColor(item)) +
      " • " +
      item.quantity +
      " " +
      t("units") +
      "<br>";

    html +=
      "💰 " +
      money(item.price * item.quantity) +
      "<br><br>";

  });

  if (order.deliveryMethod === "pickup") {

    html +=
      "📦 <strong>" +
      t("pickup") +
      " — " +
      t("free") +
      "</strong>";

  }

  else {

    html +=
      "🚚 " + t("delivery") + ": " + escapeHTML(order.city) + " — " +
      (order.shipping === 0 && order.subtotal >= FREE_SHIPPING_THRESHOLD
        ? freeShippingLabel()
        : money(order.shipping));

    if (!isHaifa(order.city)) {
      html += "<br>📮 " + postOfficeLabel();
    }

    html += "<br>⏱️ " + getCityDeliveryTime(order.city);
    html += "<br>📍 " + escapeHTML(order.address);

    if (order.shippingSpeed === "express") {

      html +=
        "<br>⚡ <strong>EXPRESS — " +
        (
          currentLanguage === "he"
            ? "יום עסקים 1"
            : "1 business day"
        ) +
        "</strong>";

      html +=
        "<br>➕ " +
        money(order.express);

    }

    else {

      html +=
        "<br>🚚 " +
        t("regularTime");

    }

  }

  if (order.notes) {

    html +=
      "<br>📝 " +
      escapeHTML(order.notes);

  }

  html +=
    "<hr>💰 <strong>" +
    t("total") +
    ": " +
    money(order.total) +
    "</strong>";

  return html;

}


/* WHATSAPP ORDER */

function buildWhatsappMessage(order) {

  if (currentLanguage === "en") {

    let text =
      "🛍️ *New Order - 3D MS*\n\n";

    text +=
      "👤 *Name:* " +
      order.name +
      "\n";

    text +=
      "📱 *Phone:* " +
      order.phone +
      "\n\n";

    text +=
      "📦 *Products:*\n";

    order.items.forEach(function(item) {

      text +=
        "• " +
        item.nameEn +
        "\n";

      text +=
        "🎨 Color: " +
        item.colorEn +
        "\n";

      text +=
        "🔢 Quantity: " +
        item.quantity +
        "\n";

      text +=
        "💰 " +
        money(item.price * item.quantity) +
        "\n\n";

    });

    if (order.deliveryMethod === "pickup") {

      text +=
        "📦 *Self Pickup — Free*\n";

    }

    else {

      text += "🚚 *City:* " + order.city + "\n";
      if (!isHaifa(order.city)) {
        text += "📮 *Delivery:* To post office\n";
      }
      text += "⏱️ *Delivery time:* " + getCityDeliveryTime(order.city) + "\n";
      text += "📍 *Address:* " + order.address + "\n";
      text += "💵 *Delivery price:* " +
        (order.shipping === 0 && order.subtotal >= FREE_SHIPPING_THRESHOLD
          ? "Free (order over ₪150)"
          : money(order.shipping)) +
        "\n";

      if (order.shippingSpeed === "express") {

        text +=
          "⚡ *EXPRESS — 1 business day*\n";

        text +=
          "➕ *EXPRESS:* " +
          money(order.express) +
          "\n";

      }

      else {

        text +=
          "🚚 *Speed:* Standard delivery — 1–14 business days\n";

      }

    }

    if (order.notes) {

      text +=
        "📝 *Notes:* " +
        order.notes +
        "\n";

    }

    text +=
      "\n🛍️ Products: " +
      money(order.subtotal) +
      "\n";

    text +=
      "🚚 Delivery: " +
      (order.shipping === 0 && order.subtotal >= FREE_SHIPPING_THRESHOLD
        ? "Free (order over ₪150)"
        : money(order.shipping)) +
      "\n";

    if (order.express > 0) {

      text +=
        "⚡ EXPRESS: " +
        money(order.express) +
        "\n";

    }

    text +=
      "💰 *Total: " +
      money(order.total) +
      "*";

    return text;

  }


  /* HEBREW */

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
      item.nameHe +
      "\n";

    text +=
      "🎨 צבע: " +
      item.colorHe +
      "\n";

    text +=
      "🔢 כמות: " +
      item.quantity +
      "\n";

    text +=
      "💰 " +
      money(item.price * item.quantity) +
      "\n\n";

  });

  if (order.deliveryMethod === "pickup") {

    text +=
      "📦 *איסוף עצמי — חינם*\n";

  }

  else {

    text += "🚚 *עיר:* " + order.city + "\n";
    if (!isHaifa(order.city)) {
      text += "📮 *משלוח:* עד הדואר\n";
    }
    text += "⏱️ *זמן משלוח:* " + getCityDeliveryTime(order.city) + "\n";
    text += "📍 *כתובת:* " + order.address + "\n";
    text += "💵 *מחיר משלוח:* " +
      (order.shipping === 0 && order.subtotal >= FREE_SHIPPING_THRESHOLD
        ? "חינם (קנייה מעל ₪150)"
        : money(order.shipping)) +
      "\n";

    if (order.shippingSpeed === "express") {

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
    (order.shipping === 0 && order.subtotal >= FREE_SHIPPING_THRESHOLD
      ? "חינם (קנייה מעל ₪150)"
      : money(order.shipping)) +
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
      Number(button.dataset.index);

    if (button.dataset.action === "plus") {
      changeQuantity(index, 1);
    }

    if (button.dataset.action === "minus") {
      changeQuantity(index, -1);
    }

    if (button.dataset.action === "remove") {
      removeItem(index);
    }

  }
);


/* OPEN / CLOSE CART */

cartButton.onclick = function() {
  cartOverlay.classList.remove("hidden");
};

closeCart.onclick = function() {
  cartOverlay.classList.add("hidden");
};


/* CHECKOUT */

checkoutButton.onclick = function() {

  if (!cart.length) {

    alert(t("cartEmptyAlert"));
    return;

  }

  cartOverlay.classList.add("hidden");
  checkoutOverlay.classList.remove("hidden");

  renderCheckoutSummary();

};


closeCheckout.onclick = function() {
  checkoutOverlay.classList.add("hidden");
};


/* DELIVERY */

pickupButton.onclick = selectPickup;
deliveryButton.onclick = selectDelivery;

regularShippingButton.onclick =
  selectRegularShipping;

expressShippingButton.onclick =
  selectExpressShipping;

customerCity.oninput = function() {

  updateDeliveryStatus();
  renderCart();

};


/* CHECKOUT SUBMIT */

checkoutForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();

    if (!deliveryMethod) {

      alert(t("chooseMethodAlert"));
      return;

    }

    if (deliveryMethod === "delivery") {

      if (!customerCity.value) {

        alert(t("chooseCityAlert"));
        return;

      }

      if (!customerAddress.value.trim()) {

        alert(t("addressAlert"));
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


/* OPEN WHATSAPP */

openWhatsappButton.onclick = function() {

  if (!currentOrder) {
    return;
  }

  const text =
    buildWhatsappMessage(currentOrder);

  const url =
    "https://wa.me/" +
    STORE_WHATSAPP +
    "?text=" +
    encodeURIComponent(text);

  window.open(url, "_blank");

};


backToCheckoutButton.onclick = function() {

  whatsappOverlay.classList.add("hidden");
  checkoutOverlay.classList.remove("hidden");

};


/* SUCCESS */

sentWhatsappButton.onclick = function() {

  if (!currentOrder) {
    return;
  }

  whatsappOverlay.classList.add("hidden");

  successOrderSummary.innerHTML =
    buildOrderPreview(currentOrder);

  if (currentOrder.deliveryMethod === "pickup") {

    finalDeliveryTime.textContent =
      t("successPickup");

  }

  else if (currentOrder.shippingSpeed === "express") {

    finalDeliveryTime.textContent =
      t("successExpress");

  }

  else {

    finalDeliveryTime.textContent =
      "🚚 " + getCityDeliveryTime(currentOrder.city) +
      (isHaifa(currentOrder.city) ? "" : " • " + postOfficeLabel());

  }

  successOverlay.classList.remove("hidden");

};


/* CUSTOM BUILD */

customBuildButton.onclick = function() {
  customBuildOverlay.classList.remove("hidden");
};

closeCustomBuild.onclick = function() {
  customBuildOverlay.classList.add("hidden");
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
        .getElementById("customDescription")
        .value
        .trim();


    let text = "";


    if (currentLanguage === "en") {

      text =
        "🛠️ *Custom Build Request - 3D MS*\n\n";

      text +=
        "👤 *Name:* " +
        name +
        "\n";

      text +=
        "📱 *Phone:* " +
        phone +
        "\n";

      text +=
        "🎨 *Color:* " +
        color +
        "\n\n";

      text +=
        "✏️ *What I would like:*\n" +
        description +
        "\n\n";

      text +=
        "🎁 Custom build has no additional charge.";

    }

    else {

      text =
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
        "🎁 בנייה עצמית ללא תוספת תשלום.";

    }


    const url =
      "https://wa.me/" +
      STORE_WHATSAPP +
      "?text=" +
      encodeURIComponent(text);

    window.open(url, "_blank");

  }
);


/* RESET */

backToStoreButton.onclick = function() {

  cart = [];

  deliveryMethod = null;
  shippingSpeed = "regular";
  currentOrder = null;

  checkoutForm.reset();

  pickupButton.classList.remove("active");
  deliveryButton.classList.remove("active");

  deliveryFields.classList.add("hidden");

  regularShippingButton.classList.add("active");
  expressShippingButton.classList.remove("active");

  successOverlay.classList.add("hidden");

  updateLanguage();

};


/* START */

updateLanguage();
loadProducts();

console.log("🛍️ 3D MS READY");


/* =========================================================
   3D MS TOKEN CATCH GAME
========================================================= */

const TOKEN_VALUE = 0.05;
const MAX_TOKEN_DISCOUNT = 10;
const TOKEN_GAME_SECONDS = 60;
const TOKEN_BALANCE_KEY = "3dms-token-balance";
const TOKEN_FREE_GAME_KEY = "3dms-free-game-used";
const TOKEN_EXTRA_GAMES_KEY = "3dms-extra-games";
const TOKEN_PERIODIC_GAME_KEY = "3dms-periodic-game-time";
const TOKEN_TIKTOK_GAME_KEY = "3dms-tiktok-game-claimed";
const TOKEN_PERIOD_MS = 48 * 60 * 60 * 1000;
const TIKTOK_PROFILE_URL = "https://www.tiktok.com/@3dmshop0";

let tokenBalanceSaved = Math.max(0, Number(localStorage.getItem(TOKEN_BALANCE_KEY)) || 0);
let tokenFreeGameUsed = localStorage.getItem(TOKEN_FREE_GAME_KEY) === "true";
let tokenExtraGames = Math.max(0, Number(localStorage.getItem(TOKEN_EXTRA_GAMES_KEY)) || 0);
let tokenPeriodicGameTime = Number(localStorage.getItem(TOKEN_PERIODIC_GAME_KEY)) || (Date.now() + TOKEN_PERIOD_MS);
let tokenTikTokClaimed = localStorage.getItem(TOKEN_TIKTOK_GAME_KEY) === "true";
let tokenTikTokVisitStarted = false;
let tokenGameRunning = false;
let tokenGameScoreValue = 0;
let tokenGameSecondsLeft = TOKEN_GAME_SECONDS;
let tokenTimerInterval = null;
let tokenSpawnInterval = null;
let useTokensForOrder = false;

const tokenIcons = ["🐉", "⚽", "🦋", "🗡️", "🧩", "🚀", "⭐", "🎮", "🤖", "🦖"];

if (!localStorage.getItem(TOKEN_PERIODIC_GAME_KEY)) {
  localStorage.setItem(TOKEN_PERIODIC_GAME_KEY, String(tokenPeriodicGameTime));
}

function saveTokenState() {
  localStorage.setItem(TOKEN_BALANCE_KEY, String(tokenBalanceSaved));
  localStorage.setItem(TOKEN_FREE_GAME_KEY, String(tokenFreeGameUsed));
  localStorage.setItem(TOKEN_EXTRA_GAMES_KEY, String(tokenExtraGames));
  localStorage.setItem(TOKEN_PERIODIC_GAME_KEY, String(tokenPeriodicGameTime));
  localStorage.setItem(TOKEN_TIKTOK_GAME_KEY, String(tokenTikTokClaimed));
}

function periodicTokenGameReady() {
  return Date.now() >= tokenPeriodicGameTime;
}

function availableTokenGames() {
  return (tokenFreeGameUsed ? 0 : 1) + tokenExtraGames + (periodicTokenGameReady() ? 1 : 0);
}

function periodicTimeText() {
  const remaining = Math.max(0, tokenPeriodicGameTime - Date.now());
  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.ceil((remaining % 3600000) / 60000);

  return hours + ":" + String(minutes).padStart(2, "0");
}

function tokenDiscountForSubtotal(subtotal) {
  if (!useTokensForOrder) {
    return 0;
  }

  const maximumValue = Math.min(
    Number(subtotal) || 0,
    MAX_TOKEN_DISCOUNT,
    tokenBalanceSaved * TOKEN_VALUE
  );

  const usableTokens = Math.min(
    tokenBalanceSaved,
    Math.floor((maximumValue + 0.0001) / TOKEN_VALUE)
  );

  return usableTokens * TOKEN_VALUE;
}

function tokenUsedForSubtotal(subtotal) {
  return Math.round(tokenDiscountForSubtotal(subtotal) / TOKEN_VALUE);
}

const calculateTotalsWithoutTokens = calculateTotals;
calculateTotals = function() {
  const totals = calculateTotalsWithoutTokens();
  const discount = tokenDiscountForSubtotal(totals.subtotal);
  const tokensUsed = tokenUsedForSubtotal(totals.subtotal);

  return {
    ...totals,
    tokenDiscount: discount,
    tokensUsed,
    total: Math.max(0, totals.total - discount)
  };
};

function updateTokenDiscountRows() {
  ensureTokenUsageControls();

  const totals = calculateTotals();
  const visible = totals.tokenDiscount > 0 && cart.length > 0;

  tokenDiscountSummaryRow.classList.toggle("hidden", !visible);
  checkoutTokenDiscountRow.classList.toggle("hidden", !visible);

  tokenDiscountCart.textContent = "-" + money(totals.tokenDiscount);
  tokenDiscountCheckout.textContent = "-" + money(totals.tokenDiscount);

  tokenDiscountCartLabel.textContent = currentLanguage === "he"
    ? "🪙 הנחת Tokens"
    : "🪙 Token discount";

  tokenDiscountCheckoutLabel.textContent = currentLanguage === "he"
    ? "🪙 הנחת Tokens"
    : "🪙 Token discount";

  updateTokenUsageControls();
}

function createTokenUsageControl(id, compact) {
  const box = document.createElement("label");
  const checkbox = document.createElement("input");
  const text = document.createElement("span");

  box.id = id;
  box.className = "token-usage-control";
  box.style.display = "flex";
  box.style.alignItems = "center";
  box.style.gap = "9px";
  box.style.margin = compact ? "10px 0" : "8px 5px";
  box.style.padding = "11px";
  box.style.border = "1px solid #a7f3d0";
  box.style.borderRadius = "11px";
  box.style.background = "#ecfdf5";
  box.style.color = "#047857";
  box.style.fontSize = "12px";
  box.style.fontWeight = "900";
  box.style.cursor = "pointer";

  checkbox.type = "checkbox";
  checkbox.className = "token-usage-checkbox";
  checkbox.style.width = "18px";
  checkbox.style.height = "18px";
  checkbox.style.margin = "0";

  checkbox.addEventListener("change", function() {
    useTokensForOrder = checkbox.checked;

    document.querySelectorAll(".token-usage-checkbox").forEach(function(other) {
      other.checked = useTokensForOrder;
    });

    renderCart();
  });

  text.className = "token-usage-text";
  box.append(checkbox, text);

  return box;
}

function ensureTokenUsageControls() {
  if (!document.getElementById("cartTokenUsageControl")) {
    tokenDiscountSummaryRow.parentNode.insertBefore(
      createTokenUsageControl("cartTokenUsageControl", true),
      tokenDiscountSummaryRow
    );
  }

  if (!document.getElementById("checkoutTokenUsageControl")) {
    checkoutTokenDiscountRow.parentNode.insertBefore(
      createTokenUsageControl("checkoutTokenUsageControl", false),
      checkoutTokenDiscountRow
    );
  }
}

function updateTokenUsageControls() {
  const availableMoney = Math.min(MAX_TOKEN_DISCOUNT, tokenBalanceSaved * TOKEN_VALUE);
  const he = currentLanguage === "he";
  const hasTokens = tokenBalanceSaved > 0;

  document.querySelectorAll(".token-usage-control").forEach(function(box) {
    box.classList.toggle("hidden", !hasTokens || cart.length === 0);
  });

  document.querySelectorAll(".token-usage-checkbox").forEach(function(checkbox) {
    checkbox.checked = useTokensForOrder;
  });

  document.querySelectorAll(".token-usage-text").forEach(function(text) {
    text.textContent = he
      ? "השתמשו בטוקנים בהזמנה הזאת — עד " + money(availableMoney) + " (מקסימום ₪10)"
      : "Use tokens on this order — up to " + money(availableMoney) + " (maximum ₪10)";
  });
}

const renderCartWithoutTokens = renderCart;
renderCart = function() {
  renderCartWithoutTokens();
  updateTokenDiscountRows();
};

const renderCheckoutSummaryWithoutTokens = renderCheckoutSummary;
renderCheckoutSummary = function() {
  renderCheckoutSummaryWithoutTokens();
  updateTokenDiscountRows();
};

const buildOrderWithoutTokens = buildOrder;
buildOrder = function() {
  const order = buildOrderWithoutTokens();
  const totals = calculateTotals();

  order.tokenDiscount = totals.tokenDiscount;
  order.tokensUsed = totals.tokensUsed;
  order.total = totals.total;

  return order;
};

const buildOrderPreviewWithoutTokens = buildOrderPreview;
buildOrderPreview = function(order) {
  let html = buildOrderPreviewWithoutTokens(order);

  if (order.tokenDiscount > 0) {
    const discountLine = currentLanguage === "he"
      ? "🪙 הנחת Tokens: <strong>-" + money(order.tokenDiscount) + "</strong><br>"
      : "🪙 Token discount: <strong>-" + money(order.tokenDiscount) + "</strong><br>";

    html = html.replace("<hr>💰", "<hr>" + discountLine + "💰");
  }

  return html;
};

const buildWhatsappMessageWithoutTokens = buildWhatsappMessage;
buildWhatsappMessage = function(order) {
  let text = buildWhatsappMessageWithoutTokens(order);

  if (order.tokenDiscount > 0) {
    const discountLine = currentLanguage === "he"
      ? "🪙 הנחת Tokens: -" + money(order.tokenDiscount) + "\n"
      : "🪙 Token discount: -" + money(order.tokenDiscount) + "\n";

    text = text.replace(/💰 \*(סה״כ|Total):/, discountLine + "💰 *$1:");
  }

  return text;
};

function updateTokenLanguage() {
  const he = currentLanguage === "he";

  ensureTikTokGameButton();

  tokenGameButtonText.textContent = he ? "משחק Tokens" : "Token Game";
  tokenGameSubtitle.textContent = he ? "תפסו כמה שיותר מוצרים!" : "Catch as many products as possible!";
  tokenWalletLabel.textContent = he ? "הטוקנים שלכם" : "Your tokens";
  tokenFirstGameTitle.textContent = he ? "🎁 משחק ראשון חינם" : "🎁 First game is free";
  tokenGameLength.textContent = he ? "60 שניות" : "60 seconds";
  tokenCatchTitle.textContent = he ? "🎯 כל תפיסה" : "🎯 Every catch";
  tokenValueTitle.textContent = he ? "💰 שווי Token" : "💰 Token value";
  tokenValueTitle.nextElementSibling.textContent = he ? "₪0.05 הנחה" : "₪0.05 discount";
  tokenGameHelp.textContent = he ? "לחצו על המוצרים לפני שהם נעלמים!" : "Tap the products before they disappear!";
  tokenResultTitle.textContent = he ? "המשחק נגמר!" : "Game over!";
  tokenCaughtLabel.textContent = he ? "תפסתם" : "You caught";
  tokenProductsCaughtLabel.textContent = he ? "מוצרים" : "products";
  tokenReceivedLabel.textContent = he ? "קיבלתם" : "You received";
  tokenBenefitLabel.textContent = he ? "שווי ההטבה:" : "Discount value:";
  tokenResultBalanceLabel.textContent = he ? "יתרת Tokens:" : "Token balance:";
  tokenResultClose.textContent = he ? "חזרה לחנות" : "Back to store";

  updateTikTokGameButton();

  updateTokenDisplay();
  updateTokenAvailability();
  updateTokenDiscountRows();
}

function ensureTikTokGameButton() {
  if (document.getElementById("tokenTikTokGameButton")) {
    return;
  }

  const button = document.createElement("button");
  button.id = "tokenTikTokGameButton";
  button.type = "button";
  button.style.width = "100%";
  button.style.margin = "0 0 12px";
  button.style.padding = "13px";
  button.style.border = "1px solid rgba(255,255,255,.25)";
  button.style.borderRadius = "13px";
  button.style.background = "linear-gradient(135deg,#111,#ec4899)";
  button.style.color = "white";
  button.style.fontWeight = "900";

  button.addEventListener("click", function() {
    if (tokenTikTokClaimed) {
      return;
    }

    if (!tokenTikTokVisitStarted) {
      tokenTikTokVisitStarted = true;
      window.open(TIKTOK_PROFILE_URL, "_blank");
      updateTikTokGameButton();
      return;
    }

    tokenTikTokClaimed = true;
    tokenExtraGames += 1;
    saveTokenState();
    updateTikTokGameButton();
    updateTokenAvailability();
  });

  tokenGameAvailability.parentNode.insertBefore(button, tokenGameAvailability);
}

function updateTikTokGameButton() {
  const button = document.getElementById("tokenTikTokGameButton");

  if (!button) {
    return;
  }

  const he = currentLanguage === "he";
  button.disabled = tokenTikTokClaimed;
  button.style.opacity = tokenTikTokClaimed ? ".55" : "1";

  if (tokenTikTokClaimed) {
    button.textContent = he
      ? "✓ משחק TikTok כבר התקבל"
      : "✓ TikTok game already claimed";
  }
  else if (tokenTikTokVisitStarted) {
    button.textContent = he
      ? "✓ עקבתי — קבלת משחק חינם"
      : "✓ I followed — claim free game";
  }
  else {
    button.textContent = he
      ? "🎵 עקבו אחרי @3dmshop0 וקבלו משחק חינם"
      : "🎵 Follow @3dmshop0 and get a free game";
  }
}

function updateTokenDisplay() {
  tokenBalance.textContent = tokenBalanceSaved;
  tokenBalanceMini.textContent = "🪙 " + tokenBalanceSaved;
  tokenResultBalance.textContent = tokenBalanceSaved;
}

function updateTokenAvailability() {
  if (tokenGameRunning) {
    return;
  }

  const he = currentLanguage === "he";
  const games = availableTokenGames();

  tokenGameAvailability.classList.toggle("locked", games === 0);
  startTokenGame.disabled = games === 0;

  if (!tokenFreeGameUsed) {
    tokenGameAvailability.textContent = he
      ? "המשחק החינמי שלכם מוכן! 🎉"
      : "Your free game is ready! 🎉";

    startTokenGame.textContent = he ? "🎮 התחלת משחק" : "🎮 Start game";
    return;
  }

  if (tokenExtraGames > 0) {
    tokenGameAvailability.textContent = he
      ? "יש לכם " + tokenExtraGames + " משחקים זמינים 🎮"
      : "You have " + tokenExtraGames + " games available 🎮";

    startTokenGame.textContent = he ? "🎮 התחלת משחק" : "🎮 Start game";
    return;
  }

  if (periodicTokenGameReady()) {
    tokenGameAvailability.textContent = he
      ? "המשחק שמתחדש כל 48 שעות מוכן! 🎉"
      : "Your 48-hour game is ready! 🎉";

    startTokenGame.textContent = he ? "🎮 התחלת משחק" : "🎮 Start game";
    return;
  }

  tokenGameAvailability.textContent = he
    ? "משחק חדש בעוד " + periodicTimeText() + " שעות • או הזמינו מוצר 🔒"
    : "New game in " + periodicTimeText() + " hours • or place an order 🔒";

  startTokenGame.textContent = he ? "🔒 המשחק נעול" : "🔒 Game locked";
}

function openTokenGamePanel() {
  tokenGameIntro.classList.remove("hidden");
  tokenGameActive.classList.add("hidden");
  tokenGameResult.classList.add("hidden");
  tokenGameOverlay.classList.remove("hidden");
  updateTokenDisplay();
  updateTokenAvailability();
}

function closeTokenGamePanel() {
  if (tokenGameRunning) {
    return;
  }

  tokenGameOverlay.classList.add("hidden");
}

function consumeTokenGame() {
  if (!tokenFreeGameUsed) {
    tokenFreeGameUsed = true;
  }
  else if (tokenExtraGames > 0) {
    tokenExtraGames -= 1;
  }
  else if (periodicTokenGameReady()) {
    tokenPeriodicGameTime = Date.now() + TOKEN_PERIOD_MS;
  }

  saveTokenState();
}

function createTokenGameItem() {
  if (!tokenGameRunning) {
    return;
  }

  const item = document.createElement("button");
  const size = window.innerWidth <= 600 ? 52 : 58;
  const maxX = Math.max(0, tokenGameArena.clientWidth - size - 8);
  const maxY = Math.max(0, tokenGameArena.clientHeight - size - 55);

  item.type = "button";
  item.className = "token-game-item";
  item.textContent = tokenIcons[Math.floor(Math.random() * tokenIcons.length)];
  item.style.left = Math.floor(Math.random() * maxX) + "px";
  item.style.top = Math.floor(Math.random() * maxY) + "px";

  item.addEventListener("click", function() {
    if (!tokenGameRunning || item.classList.contains("caught")) {
      return;
    }

    item.classList.add("caught");
    tokenGameScoreValue += 1;
    tokenGameScore.textContent = tokenGameScoreValue;
    tokenGameLiveTokens.textContent = tokenGameScoreValue;

    window.setTimeout(function() {
      item.remove();
    }, 240);
  });

  tokenGameArena.appendChild(item);

  window.setTimeout(function() {
    if (item.isConnected) {
      item.remove();
    }
  }, 1500);
}

function startTokenCatchGame() {
  if (tokenGameRunning || availableTokenGames() <= 0) {
    return;
  }

  consumeTokenGame();

  tokenGameRunning = true;
  tokenGameScoreValue = 0;
  tokenGameSecondsLeft = TOKEN_GAME_SECONDS;

  tokenGameIntro.classList.add("hidden");
  tokenGameResult.classList.add("hidden");
  tokenGameActive.classList.remove("hidden");

  tokenGameScore.textContent = "0";
  tokenGameLiveTokens.textContent = "0";
  tokenGameTimer.textContent = String(TOKEN_GAME_SECONDS);

  tokenGameArena.querySelectorAll(".token-game-item").forEach(function(item) {
    item.remove();
  });

  createTokenGameItem();

  tokenSpawnInterval = window.setInterval(createTokenGameItem, 700);

  tokenTimerInterval = window.setInterval(function() {
    tokenGameSecondsLeft -= 1;
    tokenGameTimer.textContent = tokenGameSecondsLeft;

    if (tokenGameSecondsLeft <= 0) {
      finishTokenCatchGame();
    }
  }, 1000);
}

function finishTokenCatchGame() {
  if (!tokenGameRunning) {
    return;
  }

  tokenGameRunning = false;

  window.clearInterval(tokenTimerInterval);
  window.clearInterval(tokenSpawnInterval);

  tokenGameArena.querySelectorAll(".token-game-item").forEach(function(item) {
    item.remove();
  });

  tokenBalanceSaved += tokenGameScoreValue;
  saveTokenState();

  tokenResultCaught.textContent = tokenGameScoreValue;
  tokenResultTokens.textContent = tokenGameScoreValue;
  tokenResultMoney.textContent = money(tokenGameScoreValue * TOKEN_VALUE);

  tokenGameActive.classList.add("hidden");
  tokenGameResult.classList.remove("hidden");

  updateTokenDisplay();
  renderCart();
}

tokenGameButton.addEventListener("click", openTokenGamePanel);
closeTokenGame.addEventListener("click", closeTokenGamePanel);
tokenResultClose.addEventListener("click", function() {
  tokenGameOverlay.classList.add("hidden");
});
startTokenGame.addEventListener("click", startTokenCatchGame);

languageButton.addEventListener("click", function() {
  window.setTimeout(updateTokenLanguage, 0);
});

sentWhatsappButton.addEventListener("click", function() {
  if (!currentOrder || currentOrder.tokenProcessed) {
    return;
  }

  currentOrder.tokenProcessed = true;

  if (currentOrder.tokensUsed > 0) {
    tokenBalanceSaved = Math.max(0, tokenBalanceSaved - currentOrder.tokensUsed);
  }

  tokenExtraGames += 1;
  useTokensForOrder = false;
  saveTokenState();
  updateTokenDisplay();
  updateTokenAvailability();
});

updateTokenLanguage();
renderCart();

window.setInterval(function() {
  if (!tokenGameRunning) {
    updateTokenAvailability();
  }
}, 60000);
