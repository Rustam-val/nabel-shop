/* =========================================================
   NABEL — общая логика интерфейса
   Меню, скролл-эффекты, анимации появления блоков
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* Хедер: тень при скролле */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 10);
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  /* Бургер-меню (мобильная версия) */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("mainNav");
  burger?.addEventListener("click", () => {
    burger.classList.toggle("open");
    nav.classList.toggle("open");
  });
  nav?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      burger?.classList.remove("open");
      nav?.classList.remove("open");
    })
  );

  /* Плавное появление блоков при скролле */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* Карусель отзывов на главной: стрелки листают на одну карточку */
  const reviewsTrack = document.getElementById("reviewsTrack");
  const reviewsPrev = document.getElementById("reviewsPrev");
  const reviewsNext = document.getElementById("reviewsNext");
  if (reviewsTrack && reviewsPrev && reviewsNext) {
    const cardStep = () => {
      const card = reviewsTrack.querySelector(".review-card");
      if (!card) return 0;
      const gap = parseFloat(getComputedStyle(reviewsTrack).columnGap || 0) || 0;
      return card.getBoundingClientRect().width + gap;
    };
    reviewsPrev.addEventListener("click", () => reviewsTrack.scrollBy({ left: -cardStep(), behavior: "smooth" }));
    reviewsNext.addEventListener("click", () => reviewsTrack.scrollBy({ left: cardStep(), behavior: "smooth" }));
  }
});

/* ---------- Плейсхолдер-иконка для мест без изображения ---------- */
function placeholderIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.2"><path d="M12 3c-2 3-4 5-4 8a4 4 0 0 0 8 0c0-3-2-5-4-8z"/></svg>`;
}

/* ---------- Рендер карточки товара (переиспользуется на разных страницах) ---------- */
function productCardHTML(p) {
  const badge = p.badge ? `<span class="product-badge">${p.badge}</span>` : "";
  // Старую цену показываем только когда у товара нет вариантов объёма — иначе она не
  // соответствует показанной цене варианта по умолчанию (как и на странице товара).
  const oldPrice = p.oldPrice && !p.variants ? `<span class="old">${formatPrice(p.oldPrice)}</span>` : "";
  const disabled = !p.inStock ? "disabled" : "";
  const priceLabel = formatPriceLabel(p);
  return `
  <article class="product-card">
    <a href="product.html?slug=${p.slug}" class="product-media">
      ${badge}
      <img src="${p.images[0]}" alt="${p.name} — ${getCategoryTitle(p.category)} Nabel" loading="lazy">
      <button class="product-quickadd" title="Добавить в корзину" onclick="event.preventDefault(); addToCart(${p.id})" ${disabled}>
        <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M6 6L4 3H2"/></svg>
      </button>
    </a>
    <div class="product-info">
      <div class="product-cat">${getCategoryTitle(p.category)}</div>
      <h3><a href="product.html?slug=${p.slug}">${p.name}</a></h3>
      <p class="product-desc">${p.shortDesc}</p>
      <div class="product-footer">
        <div class="product-price">${oldPrice}${priceLabel}</div>
      </div>
      <div class="product-actions">
        <a href="product.html?slug=${p.slug}" class="btn btn-outline btn-sm btn-block">Подробнее</a>
        <button class="btn btn-primary btn-sm btn-block" onclick="addToCart(${p.id})" ${disabled}>В корзину</button>
      </div>
    </div>
  </article>`;
}

/* ---------- Главная страница: категории + популярные товары ---------- */
function renderCategoriesGrid(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = CATEGORIES.map(
    (c) => `
    <a href="catalog.html?cat=${c.id}" class="category-card reveal">
      <img class="cat-bg" src="${c.image}" alt="${c.title} Nabel" loading="lazy" style="width:100%;height:100%;object-fit:cover;">
      <div>
        <h3>${c.title}</h3>
        <span>${c.subtitle}</span>
      </div>
    </a>`
  ).join("");
}

function renderPopularProducts(targetId, limit = 8) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const popular = [...PRODUCTS].sort((a, b) => b.reviewsCount - a.reviewsCount).slice(0, limit);
  el.innerHTML = popular.map(productCardHTML).join("");
}
