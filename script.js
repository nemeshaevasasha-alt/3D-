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
    heroDelivery: "🚚 משלוחים לפי עיר",
    heroExpress: "⚡ EXPRESS — תוספת ₪4.90",

    customBuild: "🛠 בנייה עצמית",

    customIntro:
      "יש לכם רעיון משלכם? ספרו לנו מה תרצו שנדפיס.<br><strong>💰 בנייה עצמית בתשלום נוסף החל מ־5 ₪!</strong>",

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

    priceByCity: "מחיר לפי עיר",

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
      "1–14 ימי עסקים",

    expressTime:
      "יום עסקים 1<br>+₪4.90",

    regularSelected:
      "🚚 נבחר משלוח רגיל — 1–14 ימי עסקים",

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
      "💰 בנייה עצמית בתשלום נוסף החל מ־5 ₪!",

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
      "🚚 זמן משלוח משוער: 1–14 ימי עסקים.",

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
    heroDelivery: "🚚 Delivery by city",
    heroExpress: "⚡ EXPRESS — +₪4.90",

    customBuild: "🛠 Custom Build",

    customIntro:
      "Have your own idea? Tell us what you would like us to print.<br><strong>💰 Custom builds from an additional ₪5!</strong>",

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

    priceByCity: "Price by city",

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
      "1–14 business days",

    expressTime:
      "1 business day<br>+₪4.90",

    regularSelected:
      "🚚 Standard delivery selected — 1–14 business days",

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
      "💰 Custom builds from an additional ₪5!",

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
      "🚚 Estimated delivery time: 1–14 business days.",

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

const DELIVERY_CITIES = {

  "haifa": {
    he: "חיפה",
    en: "Haifa",
    price: 9.90
  },

  "tel-aviv": {
    he: "תל אביב",
    en: "Tel Aviv",
    price: 19.90
  }

};


/* HELPERS */

function t(key) {
  return translations[currentLanguage][key];
}


function money(value) {
  return "₪" + Number(value || 0).toFixed(2);
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

const customerCity = document.getElementById("customerCity");
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

    return {
      type: "pickup",
      name: t("pickup"),
      price: 0
    };

  }

  if (deliveryMethod === "delivery") {

    const city =
      DELIVERY_CITIES[customerCity.value];

    if (city) {

      return {
        type: "delivery",
        name: city[currentLanguage],
        price: city.price
      };

    }

  }

  return {
    type: null,
    name: t("notSelected"),
    price: 0
  };

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

  const subtotal =
    cart.reduce(function(total, item) {

      return total + item.price * item.quantity;

    }, 0);

  const delivery = getDelivery();

  const express = getExpressPrice();

  return {
    subtotal,
    shipping: delivery.price,
    express,
    total:
      subtotal +
      delivery.price +
      express
  };

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
      money(delivery.price);

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
      money(delivery.price);

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

  const city =
    DELIVERY_CITIES[customerCity.value];

  if (
    deliveryMethod === "delivery" &&
    city
  ) {

    deliveryStatus.textContent =
      "🚚 " +
      city[currentLanguage] +
      " — " +
      money(city.price);

  }

  else if (deliveryMethod === "delivery") {

    deliveryStatus.textContent =
      t("chooseDeliveryCity");

  }

  else if (deliveryMethod === "pickup") {

    deliveryStatus.textContent =
      t("pickupSelected");

  }

  else {

    deliveryStatus.textContent =
      t("noDeliverySelected");

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

  setText(
    "chooseCityOption",
    t("chooseCity")
  );

  customerCity.options[1].text =
    t("haifa") + " — ₪9.90";

  customerCity.options[2].text =
    t("telAviv") + " — ₪19.90";

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

    cityKey:
      customerCity.value,

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

    const city =
      DELIVERY_CITIES[order.cityKey];

    html +=
      "🚚 " +
      t("delivery") +
      ": " +
      escapeHTML(city[currentLanguage]) +
      " — " +
      money(order.shipping);

    html +=
      "<br>📍 " +
      escapeHTML(order.address);

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

      const city =
        DELIVERY_CITIES[order.cityKey];

      text +=
        "🚚 *City:* " +
        city.en +
        "\n";

      text +=
        "📍 *Address:* " +
        order.address +
        "\n";

      text +=
        "💵 *Delivery:* " +
        money(order.shipping) +
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
      money(order.shipping) +
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

    const city =
      DELIVERY_CITIES[order.cityKey];

    text +=
      "🚚 *עיר:* " +
      city.he +
      "\n";

    text +=
      "📍 *כתובת:* " +
      order.address +
      "\n";

    text +=
      "💵 *מחיר משלוח:* " +
      money(order.shipping) +
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

customerCity.onchange = function() {

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
      t("successRegular");

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
        "💰 I understand that custom builds cost an additional ₪5 or more.";

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
        "💰 ידוע לי שבנייה עצמית כרוכה בתשלום נוסף החל מ־5 ₪.";

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
    

