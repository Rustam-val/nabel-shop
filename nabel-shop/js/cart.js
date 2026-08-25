/* =========================================================
   NABEL — логика корзины
   Хранит корзину в localStorage браузера, поэтому она
   сохраняется между визитами (пока не очистить браузер).

   Товары с вариантами (объём/вес, поле variants в products.js)
   хранятся в корзине как отдельные позиции: один и тот же товар
   с разным объёмом — это две разные строки корзины.
   ========================================================= */

const CART_KEY = "nabel_cart_v1";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

/* Находим позицию корзины по товару + варианту (label варианта или null) */
function findCartItem(cart, productId, variantLabel) {
  return cart.find((i) => i.id === productId && (i.variantLabel || null) === (variantLabel || null));
}

/* Цена конкретной позиции корзины (с учётом варианта) */
function cartItemUnitPrice(item) {
  const p = PRODUCTS.find((pr) => pr.id === item.id);
  if (!p) return 0;
  if (item.variantLabel && p.variants) {
    const v = p.variants.find((v) => v.label === item.variantLabel);
    if (v) return v.price;
  }
  return p.price;
}

function addToCart(productId, qty = 1, variantLabel = null) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product || !product.inStock) return;

  // Если у товара есть варианты, а конкретный не передан — берём вариант по умолчанию
  let resolvedVariant = variantLabel;
  if (!resolvedVariant && product.variants) {
    const def = getDefaultVariant(product);
    resolvedVariant = def ? def.label : null;
  }

  const cart = getCart();
  const existing = findCartItem(cart, productId, resolvedVariant);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty, variantLabel: resolvedVariant || null });
  }
  saveCart(cart);
  renderCartDrawer();
  const variantSuffix = resolvedVariant ? `, ${resolvedVariant}` : "";
  showToast(`«${product.name}${variantSuffix}» добавлен в корзину`);
  openCartDrawer();
}

function removeFromCart(productId, variantLabel = null) {
  let cart = getCart();
  cart = cart.filter((i) => !(i.id === productId && (i.variantLabel || null) === (variantLabel || null)));
  saveCart(cart);
  renderCartDrawer();
  renderCartPage();
}

function updateCartQty(productId, variantLabel, qty) {
  const cart = getCart();
  const item = findCartItem(cart, productId, variantLabel);
  if (!item) return;
  item.qty = Math.max(1, qty);
  saveCart(cart);
  renderCartDrawer();
  renderCartPage();
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + cartItemUnitPrice(item) * item.qty, 0);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartCount() {
  const count = getCartCount();
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = count;
    el.classList.toggle("show", count > 0);
  });
}

/* ---------- Мини-корзина (drawer) ---------- */
function renderCartDrawer() {
  const container = document.getElementById("cartDrawerItems");
  const footer = document.getElementById("cartDrawerFooter");
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M6 6L4 3H2"/></svg>
        <p>Ваша корзина пока пуста</p>
        <a href="catalog.html" class="btn btn-outline btn-sm">Перейти в каталог</a>
      </div>`;
    if (footer) footer.style.display = "none";
    return;
  }

  if (footer) footer.style.display = "block";

  container.innerHTML = cart
    .map((item) => {
      const p = PRODUCTS.find((pr) => pr.id === item.id);
      if (!p) return "";
      const unitPrice = cartItemUnitPrice(item);
      const variantLine = item.variantLabel ? `, ${item.variantLabel}` : "";
      const vAttr = item.variantLabel ? `'${item.variantLabel}'` : "null";
      return `
      <div class="cart-item">
        <img src="${p.images[0]}" alt="${p.name}">
        <div>
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-cat">${getCategoryTitle(p.category)}${variantLine}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateCartQty(${p.id}, ${vAttr}, ${item.qty - 1})">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty(${p.id}, ${vAttr}, ${item.qty + 1})">+</button>
          </div>
        </div>
        <div>
          <button class="cart-item-remove icon-btn" onclick="removeFromCart(${p.id}, ${vAttr})" aria-label="Удалить">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
          </button>
          <div class="cart-item-price">${formatPrice(unitPrice * item.qty)}</div>
        </div>
      </div>`;
    })
    .join("");

  const totalEl = document.getElementById("cartDrawerTotal");
  if (totalEl) totalEl.textContent = formatPrice(getCartTotal());
}

function openCartDrawer() {
  document.getElementById("cartOverlay")?.classList.add("open");
  document.getElementById("cartDrawer")?.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCartDrawer() {
  document.getElementById("cartOverlay")?.classList.remove("open");
  document.getElementById("cartDrawer")?.classList.remove("open");
  document.body.style.overflow = "";
}

/* ---------- Полная страница корзины (cart.html) ---------- */
function renderCartPage() {
  const container = document.getElementById("cartPageList");
  if (!container) return;
  const cart = getCart();
  const emptyBlock = document.getElementById("cartPageEmpty");
  const layout = document.getElementById("cartPageLayout");

  if (cart.length === 0) {
    if (layout) layout.style.display = "none";
    if (emptyBlock) emptyBlock.style.display = "block";
    return;
  }
  if (layout) layout.style.display = "grid";
  if (emptyBlock) emptyBlock.style.display = "none";

  container.innerHTML = cart
    .map((item) => {
      const p = PRODUCTS.find((pr) => pr.id === item.id);
      if (!p) return "";
      const unitPrice = cartItemUnitPrice(item);
      const variantLine = item.variantLabel ? `, ${item.variantLabel}` : "";
      const vAttr = item.variantLabel ? `'${item.variantLabel}'` : "null";
      return `
      <div class="cart-page-item">
        <img src="${p.images[0]}" alt="${p.name}">
        <div>
          <a href="product.html?slug=${p.slug}"><h3 style="font-size:1.05rem;margin-bottom:.3rem;">${p.name}</h3></a>
          <div class="cart-item-cat">${getCategoryTitle(p.category)}${variantLine}</div>
          <div class="cart-item-qty" style="margin-top:.6rem;">
            <button class="qty-btn" onclick="updateCartQty(${p.id}, ${vAttr}, ${item.qty - 1})">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty(${p.id}, ${vAttr}, ${item.qty + 1})">+</button>
          </div>
        </div>
        <div class="cart-item-price">${formatPrice(unitPrice * item.qty)}</div>
        <button class="cart-item-remove icon-btn" onclick="removeFromCart(${p.id}, ${vAttr})" aria-label="Удалить">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
        </button>
      </div>`;
    })
    .join("");

  const subtotal = getCartTotal();
  document.getElementById("summarySubtotal").textContent = formatPrice(subtotal);
  document.getElementById("summaryTotal").textContent = formatPrice(subtotal);

  const tgLink = document.getElementById("checkoutTelegram");
  if (tgLink) {
    tgLink.href = `https://t.me/+tSqxZyzablowZjQy`;
  }
}

/* Собираем текст заказа для WhatsApp: товары, количество, итог и данные покупателя */
function buildOrderText(cart, total, buyerName, buyerPhone) {
  let text = "Здравствуйте! Хочу оформить заказ на сайте Nabel:\n\n";
  cart.forEach((item) => {
    const p = PRODUCTS.find((pr) => pr.id === item.id);
    if (!p) return;
    const unitPrice = cartItemUnitPrice(item);
    const variantLine = item.variantLabel ? ` (${item.variantLabel})` : "";
    text += `• ${p.name}${variantLine} — ${item.qty} шт. (${formatPrice(unitPrice * item.qty)})\n`;
  });
  text += `\nИтого: ${formatPrice(total)}`;
  text += `\n\nИмя: ${buyerName}`;
  text += `\nТелефон: ${buyerPhone}`;
  return text;
}

/* Собираем заказ, проверяем, что имя и телефон заполнены, и открываем WhatsApp */
const BUYER_KEY = "nabel_buyer_v1";

function loadBuyerInfo() {
  const nameInput = document.getElementById("buyerName");
  const phoneInput = document.getElementById("buyerPhone");
  if (!nameInput || !phoneInput) return;
  try {
    const saved = JSON.parse(localStorage.getItem(BUYER_KEY)) || {};
    if (saved.name) nameInput.value = saved.name;
    if (saved.phone) phoneInput.value = saved.phone;
  } catch (e) {
    /* ничего страшного, просто оставляем поля пустыми */
  }
}

function handleWhatsappCheckout() {
  const nameInput = document.getElementById("buyerName");
  const phoneInput = document.getElementById("buyerPhone");
  const name = (nameInput?.value || "").trim();
  const phone = (phoneInput?.value || "").trim();

  if (!name || !phone) {
    showToast("Пожалуйста, укажите имя и телефон");
    (name ? phoneInput : nameInput)?.focus();
    return;
  }

  try {
    localStorage.setItem(BUYER_KEY, JSON.stringify({ name, phone }));
  } catch (e) {
    /* localStorage может быть недоступен — заказ всё равно оформится */
  }

  const cart = getCart();
  const total = getCartTotal();
  const text = encodeURIComponent(buildOrderText(cart, total, name, phone));
  window.open(`https://wa.me/79373447992?text=${text}`, "_blank", "noopener");
}

/* ---------- Toast-уведомление ---------- */
let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.querySelector("span").textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCartDrawer();
  renderCartPage();
  loadBuyerInfo();

  document.getElementById("cartToggle")?.addEventListener("click", openCartDrawer);
  document.getElementById("cartClose")?.addEventListener("click", closeCartDrawer);
  document.getElementById("cartOverlay")?.addEventListener("click", closeCartDrawer);
  document.getElementById("checkoutWhatsapp")?.addEventListener("click", handleWhatsappCheckout);
});
