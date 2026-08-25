/* =========================================================
   NABEL — логика страницы каталога: фильтры и сортировка
   ========================================================= */

let activeFilters = {
  categories: new Set(),
  minPrice: null,
  maxPrice: null,
  sort: "popular",
};

function initCatalog() {
  const params = new URLSearchParams(location.search);
  const catParam = params.get("cat");
  if (catParam) activeFilters.categories.add(catParam);

  renderFilterOptions();
  syncFilterInputs();
  applyCatalogFilters();

  document.getElementById("sortSelect")?.addEventListener("change", (e) => {
    activeFilters.sort = e.target.value;
    applyCatalogFilters();
  });

  document.getElementById("priceMin")?.addEventListener("input", (e) => {
    activeFilters.minPrice = e.target.value ? Number(e.target.value) : null;
    applyCatalogFilters();
  });
  document.getElementById("priceMax")?.addEventListener("input", (e) => {
    activeFilters.maxPrice = e.target.value ? Number(e.target.value) : null;
    applyCatalogFilters();
  });

  document.getElementById("mobileFilterOpen")?.addEventListener("click", () => {
    document.getElementById("filtersPanel")?.classList.add("open");
    document.getElementById("filtersOverlay")?.classList.add("open");
  });
  const closeFilters = () => {
    document.getElementById("filtersPanel")?.classList.remove("open");
    document.getElementById("filtersOverlay")?.classList.remove("open");
  };
  document.getElementById("filtersOverlay")?.addEventListener("click", closeFilters);
  document.getElementById("mobileFilterClose")?.addEventListener("click", closeFilters);
}

function renderFilterOptions() {
  const el = document.getElementById("categoryFilters");
  if (!el) return;
  el.innerHTML = CATEGORIES.map((c) => {
    const count = PRODUCTS.filter((p) => p.category === c.id).length;
    const checked = activeFilters.categories.has(c.id) ? "checked" : "";
    return `
    <label class="filter-option">
      <input type="checkbox" value="${c.id}" ${checked} onchange="toggleCategoryFilter('${c.id}', this.checked)">
      ${c.title} <span class="filter-count">${count}</span>
    </label>`;
  }).join("");
}

function toggleCategoryFilter(catId, checked) {
  if (checked) activeFilters.categories.add(catId);
  else activeFilters.categories.delete(catId);
  applyCatalogFilters();
}

function syncFilterInputs() {
  // ничего дополнительно синхронизировать не нужно на старте
}

function applyCatalogFilters() {
  let list = [...PRODUCTS];

  if (activeFilters.categories.size > 0) {
    list = list.filter((p) => activeFilters.categories.has(p.category));
  }
  // Товары без назначенной цены (price: null, "Цена уточняется") не должны выпадать
  // из выдачи при фильтре по диапазону цены — всегда оставляем их в списке.
  if (activeFilters.minPrice != null) {
    list = list.filter((p) => getDisplayPrice(p) == null || getDisplayPrice(p) >= activeFilters.minPrice);
  }
  if (activeFilters.maxPrice != null) {
    list = list.filter((p) => getDisplayPrice(p) == null || getDisplayPrice(p) <= activeFilters.maxPrice);
  }

  switch (activeFilters.sort) {
    case "price-asc":
      list.sort((a, b) => getSortablePrice(a) - getSortablePrice(b));
      break;
    case "price-desc":
      // Товары без цены остаются в конце списка даже при сортировке по убыванию.
      list.sort((a, b) => {
        const pa = getSortablePrice(a);
        const pb = getSortablePrice(b);
        if (pa === Infinity && pb === Infinity) return 0;
        if (pa === Infinity) return 1;
        if (pb === Infinity) return -1;
        return pb - pa;
      });
      break;
    case "new":
      list.sort((a, b) => b.id - a.id);
      break;
    default:
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }

  renderCatalogGrid(list);
}

function renderCatalogGrid(list) {
  const grid = document.getElementById("catalogGrid");
  const empty = document.getElementById("catalogEmpty");
  const count = document.getElementById("catalogCount");
  if (!grid) return;

  if (count) count.textContent = `${list.length} товар${pluralSuffix(list.length)}`;

  if (list.length === 0) {
    grid.innerHTML = "";
    if (empty) empty.style.display = "block";
    return;
  }
  if (empty) empty.style.display = "none";
  grid.innerHTML = list.map(productCardHTML).join("");
}

function pluralSuffix(n) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "";
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return "а";
  return "ов";
}

document.addEventListener("DOMContentLoaded", initCatalog);
