/* =========================================================
   NABEL — логика страницы товара
   ========================================================= */

let currentProduct = null;
let selectedVariant = null;

function initProductPage() {
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");
  const product = getProductBySlug(slug) || PRODUCTS[0];
  currentProduct = product;

  if (!product) return;

  document.title = `${product.name} — Nabel`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", product.shortDesc);

  // Хлебные крошки
  document.getElementById("crumbCategory").textContent = getCategoryTitle(product.category);
  document.getElementById("crumbCategory").href = `catalog.html?cat=${product.category}`;
  document.getElementById("crumbName").textContent = product.name;

  // Галерея
  const mainImg = document.getElementById("pdMainImage");
  mainImg.src = product.images[0];
  mainImg.alt = product.name + " — Nabel";
  const thumbs = document.getElementById("pdThumbs");
  thumbs.innerHTML = product.images
    .map(
      (img, i) => `<button class="pd-thumb ${i === 0 ? "active" : ""}" onclick="setMainImage('${img}', this)">
        <img src="${img}" alt="${product.name} фото ${i + 1}" loading="lazy">
      </button>`
    )
    .join("");
  if (product.images.length < 2) thumbs.style.display = "none";

  document.getElementById("pdCategory").textContent = getCategoryTitle(product.category);
  document.getElementById("pdCategory").href = `catalog.html?cat=${product.category}`;
  document.getElementById("pdName").textContent = product.name;
  document.getElementById("pdRatingStars").textContent = "★★★★★".slice(0, product.rating) + "☆☆☆☆☆".slice(0, 5 - product.rating);
  document.getElementById("pdRatingCount").textContent = `${product.reviewsCount} отзывов`;

  // Варианты объёма/веса (если есть)
  selectedVariant = getDefaultVariant(product);
  const variantsBlock = document.getElementById("pdVariantsBlock");
  if (product.variants && product.variants.length > 0) {
    renderVariantOptions(product);
    variantsBlock.style.display = "block";
  } else {
    variantsBlock.style.display = "none";
  }

  updatePriceDisplay(product);

  document.getElementById("pdDesc").textContent = product.description;

  const availEl = document.getElementById("pdAvailability");
  availEl.innerHTML = product.inStock
    ? `<span class="dot"></span> В наличии`
    : `<span class="dot out"></span> Нет в наличии — уточните дату поступления`;

  const notesBlock = document.getElementById("pdNotesBlock");
  if (product.notes.length > 0) {
    document.getElementById("pdNotes").innerHTML = product.notes.map((n) => `<span class="note-chip">${n}</span>`).join("");
    notesBlock.style.display = "block";
  } else {
    notesBlock.style.display = "none";
  }

  document.getElementById("pdUsage").textContent = product.usage;

  const addBtn = document.getElementById("pdAddToCart");
  addBtn.disabled = !product.inStock;
  addBtn.textContent = product.inStock ? "Добавить в корзину" : "Нет в наличии";
  addBtn.onclick = () => {
    const qty = Number(document.getElementById("pdQtyInput").value) || 1;
    addToCart(product.id, qty, selectedVariant ? selectedVariant.label : null);
  };

  renderSimilarProducts(product);
}

/* Отрисовать кнопки выбора объёма/веса и повесить обработчики */
function renderVariantOptions(product) {
  const el = document.getElementById("pdVariants");
  el.innerHTML = product.variants
    .map(
      (v) => `<button type="button" class="variant-chip ${v.label === selectedVariant.label ? "active" : ""}" onclick="selectVariant('${v.label}')">${v.label}</button>`
    )
    .join("");
}

function selectVariant(label) {
  const v = currentProduct.variants.find((v) => v.label === label);
  if (!v) return;
  selectedVariant = v;
  document.querySelectorAll(".variant-chip").forEach((btn) => {
    btn.classList.toggle("active", btn.textContent === label);
  });
  updatePriceDisplay(currentProduct);
}

function updatePriceDisplay(product) {
  const price = selectedVariant ? selectedVariant.price : product.price;
  document.getElementById("pdPrice").textContent = price == null ? "Цена уточняется" : formatPrice(price);

  const oldPriceEl = document.getElementById("pdPriceOld");
  // Скидка (oldPrice) показываем только когда вариантов нет — иначе цены по объёмам не совпадут со старой ценой
  if (product.oldPrice && !product.variants) {
    oldPriceEl.textContent = formatPrice(product.oldPrice);
    oldPriceEl.style.display = "inline";
  } else {
    oldPriceEl.style.display = "none";
  }
}

function setMainImage(src, btn) {
  document.getElementById("pdMainImage").src = src;
  document.querySelectorAll(".pd-thumb").forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
}

function changeQty(delta) {
  const input = document.getElementById("pdQtyInput");
  const val = Math.max(1, (Number(input.value) || 1) + delta);
  input.value = val;
}

function renderSimilarProducts(product) {
  const el = document.getElementById("similarProducts");
  if (!el) return;
  const similar = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  if (similar.length === 0) {
    document.getElementById("similarSection").style.display = "none";
    return;
  }
  el.innerHTML = similar.map(productCardHTML).join("");
}

document.addEventListener("DOMContentLoaded", initProductPage);
