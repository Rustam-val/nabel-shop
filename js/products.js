/* =========================================================
   NABEL — данные товаров
   ---------------------------------------------------------
   Это главный файл, где хранится весь каталог товаров.
   Чтобы добавить, изменить или удалить товар — редактируйте
   этот файл. Подробная инструкция — в README.md
   ========================================================= */

const CATEGORIES = [
  {
    id: "bahur",
    title: "Бахур",
    subtitle: "Оман и Саудовская Аравия",
    image: "images/hero/cat-bahur.svg",
  },
  {
    id: "burners",
    title: "Бахурницы",
    subtitle: "Для окуривания дома",
    image: "images/hero/cat-burners.svg",
  },
  {
    id: "musk",
    title: "Мускус Тахара",
    subtitle: "Чистый и стойкий аромат",
    image: "images/hero/cat-musk.svg",
  },
  {
    id: "accessories",
    title: "Аксессуары",
    subtitle: "Уголь, щипцы, подносы",
    image: "images/hero/cat-accessories.svg",
  },
];

/*
  ПОЛЯ ТОВАРА:
  id            — уникальный номер (не повторять)
  slug          — часть ссылки на товар (латиницей, без пробелов)
  category      — one of: bahur, burners, musk, accessories
  name          — название
  price         — цена в рублях (число)
  oldPrice      — старая цена (если есть скидка), либо null
  badge         — короткая плашка на карточке ("Новинка", "Хит" ...), либо null
  shortDesc     — короткое описание для карточки товара
  description   — полное описание для страницы товара
  notes         — ароматические ноты (массив строк), для бахурниц/аксессуаров можно оставить []
  usage         — способ использования
  inStock       — true / false — есть в наличии или нет
  rating        — рейтинг от 1 до 5 (временное значение, замените на реальное)
  reviewsCount  — количество отзывов (временное значение)
  images        — массив путей к фотографиям товара
  variants      — необязательно: варианты объёма/веса с разной ценой, например:
                  [{ label: "40 г", price: 1490 }, { label: "100 г", price: 2890, default: true }]
                  Если variants не указан — у товара один вариант, используется поле price.
*/

const PRODUCTS = [
  {
    id: 1,
    slug: "bahur-omani-royal",
    category: "bahur",
    name: "Бахур Омани Royal",
    price: 2890,
    oldPrice: null,
    badge: "Хит продаж",
    shortDesc: "Тёплый древесно-смолистый аромат с оманскими корнями",
    description:
      "Бахур Omani Royal — насыщенная древесно-смолистая композиция, вдохновлённая традициями Омана. При нагревании раскрывается тёплым, обволакивающим шлейфом, который наполняет дом атмосферой уюта и спокойствия. Подходит для ежедневного окуривания и особых случаев.",
    notes: ["Уд", "Амбра", "Смола", "Тёплые пряности"],
    usage:
      "Поместите небольшое количество бахура на раскалённый уголь в бахурнице. Дайте аромату раскрыться 2–3 минуты. Для гостиной достаточно 1 таблетки, для спальни — половины.",
    inStock: true,
    rating: 5,
    reviewsCount: 24,
    images: [
      "images/products/bahur-oman-1.svg",
      "images/products/bahur-oman-2.svg",
    ],
    variants: [
      { label: "40 г", price: 1490 },
      { label: "100 г", price: 2890, default: true },
      { label: "250 г", price: 6290 },
    ],
  },
  {
    id: 2,
    slug: "bahur-saudi-elite",
    category: "bahur",
    name: "Бахур Saudi Elite",
    price: 3490,
    oldPrice: 3990,
    badge: "Элитная линия",
    shortDesc: "Элитный бахур из Саудовской Аравии с нотами уда и мускуса",
    description:
      "Saudi Elite — элитная композиция, созданная для тех, кто ценит глубокие и стойкие ароматы. В основе — благородный уд, дополненный мускусом и лёгкой цветочной нотой. Шлейф держится в доме несколько часов после окуривания.",
    notes: ["Уд", "Мускус", "Роза", "Сандал"],
    usage:
      "Используйте на раскалённом угле в бахурнице. Рекомендуемое количество — 1 таблетка на помещение до 20 м².",
    inStock: true,
    rating: 5,
    reviewsCount: 31,
    images: [
      "images/products/bahur-saudi-1.svg",
      "images/products/bahur-saudi-2.svg",
    ],
    variants: [
      { label: "40 г", price: 1790 },
      { label: "100 г", price: 3490, default: true },
      { label: "250 г", price: 7590 },
    ],
  },
  {
    id: 3,
    slug: "bahur-royal-oud",
    category: "bahur",
    name: "Бахур Royal Oud",
    price: 3990,
    oldPrice: null,
    badge: null,
    shortDesc: "Насыщенный уд с бальзамическим шлейфом",
    description:
      "Royal Oud — плотная, бальзамическая композиция для истинных ценителей уда. Раскрывается медленно, оставляя глубокий и благородный аромат, который надолго задерживается в тканях и воздухе.",
    notes: ["Уд", "Бальзам", "Ваниль"],
    usage:
      "На раскалённый уголь в бахурнице, 1 таблетка на комнату среднего размера. Время раскрытия — 3–5 минут.",
    inStock: true,
    rating: 4,
    reviewsCount: 12,
    images: ["images/products/bahur-royal.svg", "images/products/bahur-royal-2.svg"],
    variants: [
      { label: "40 г", price: 2090 },
      { label: "100 г", price: 3990, default: true },
      { label: "250 г", price: 8590 },
    ],
  },
  {
    id: 4,
    slug: "bahur-amber-dream",
    category: "bahur",
    name: "Бахур Amber Dream",
    price: 2590,
    oldPrice: null,
    badge: "Новинка",
    shortDesc: "Мягкий янтарный аромат для вечернего уюта",
    description:
      "Amber Dream — мягкая янтарная композиция с лёгкой сладостью, которая создаёт спокойную и тёплую атмосферу вечером. Хорошо подходит для спальни и гостиной.",
    notes: ["Янтарь", "Ваниль", "Мускус"],
    usage: "Небольшое количество на раскалённый уголь, время раскрытия — 2 минуты.",
    inStock: true,
    rating: 5,
    reviewsCount: 8,
    images: ["images/products/bahur-amber.svg", "images/products/bahur-amber-2.svg"],
    variants: [
      { label: "40 г", price: 1390 },
      { label: "100 г", price: 2590, default: true },
      { label: "250 г", price: 5590 },
    ],
  },
  {
    id: 101,
    slug: "bahur-mukhallat",
    category: "bahur",
    name: "Бахур Мухаллят",
    price: 3190,
    oldPrice: null,
    badge: null,
    shortDesc: "Насыщенный микс масел уда, амбры и мускуса",
    description:
      "Мухаллят — густая маслянистая композиция, объединяющая несколько ароматических масел в одной формуле. Даёт плотный, многослойный шлейф, который раскрывается постепенно — от первых тёплых нот до глубокого мускусного финала.",
    notes: ["Уд", "Амбра", "Мускус", "Шафран"],
    usage:
      "Небольшое количество на раскалённый уголь. Из-за насыщенности состава хватает совсем небольшой порции.",
    inStock: true,
    rating: 5,
    reviewsCount: 5,
    images: ["images/products/bahur-mukhallat-1.svg", "images/products/bahur-mukhallat-2.svg"],
    variants: [
      { label: "40 г", price: 1690 },
      { label: "100 г", price: 3190, default: true },
      { label: "250 г", price: 6890 },
    ],
  },
  {
    id: 102,
    slug: "bahur-dahn-al-oudh",
    category: "bahur",
    name: "Бахур Dahn Al Oudh",
    price: 4290,
    oldPrice: null,
    badge: "Элитная линия",
    shortDesc: "Концентрированное масло уда — глубокий и долгий шлейф",
    description:
      "Dahn Al Oudh — один из самых насыщенных ароматов в линейке Nabel. Плотная маслянистая текстура и высокая концентрация уда дают исключительно долгий и глубокий шлейф, который постепенно раскрывается в течение всего вечера.",
    notes: ["Уд", "Смола", "Тёмный мёд"],
    usage: "Совсем небольшое количество на раскалённый уголь — аромат очень концентрированный.",
    inStock: true,
    rating: 5,
    reviewsCount: 3,
    images: ["images/products/bahur-dahn-oudh-1.svg", "images/products/bahur-dahn-oudh-2.svg"],
    variants: [
      { label: "40 г", price: 2290 },
      { label: "100 г", price: 4290, default: true },
      { label: "250 г", price: 9290 },
    ],
  },
  {
    id: 103,
    slug: "bahur-sandalwood",
    category: "bahur",
    name: "Бахур Sandalwood",
    price: 2790,
    oldPrice: null,
    badge: null,
    shortDesc: "Мягкий сандаловый аромат с молочной нотой",
    description:
      "Sandalwood — тёплая, мягкая композиция на основе сандалового дерева с лёгкой молочной нотой. Создаёт спокойную, почти медитативную атмосферу — хорошо подходит для вечернего окуривания перед сном.",
    notes: ["Сандал", "Молочная нота", "Кедр"],
    usage: "На раскалённый уголь, время раскрытия — 2–3 минуты.",
    inStock: true,
    rating: 4,
    reviewsCount: 6,
    images: ["images/products/bahur-sandalwood.svg"],
    variants: [
      { label: "40 г", price: 1450 },
      { label: "100 г", price: 2790, default: true },
      { label: "250 г", price: 5990 },
    ],
  },
  {
    id: 104,
    slug: "bahur-frankincense",
    category: "bahur",
    name: "Бахур Ладан (Frankincense)",
    price: 2390,
    oldPrice: null,
    badge: "Новинка",
    shortDesc: "Чистая смолистая нота ладана — светлый и строгий аромат",
    description:
      "Классический ладан в чистом виде — смолистый, светлый и слегка терпкий аромат без сладких добавок. Один из самых узнаваемых восточных ароматов, подходит и для дома, и для особых моментов окуривания.",
    notes: ["Ладан", "Смола", "Лёгкая цитрусовая нота"],
    usage: "Небольшой кусочек смолы на раскалённый уголь, время раскрытия — 3 минуты.",
    inStock: true,
    rating: 5,
    reviewsCount: 4,
    images: ["images/products/bahur-frankincense-1.svg", "images/products/bahur-frankincense-2.svg"],
    variants: [
      { label: "40 г", price: 1250 },
      { label: "100 г", price: 2390, default: true },
      { label: "250 г", price: 5090 },
    ],
  },
  {
    id: 122,
    slug: "bahur-abdul-as-samt-kuraishi",
    category: "bahur",
    name: "Бахур Абдул Ас-Самт Курайши",
    price: null,
    oldPrice: null,
    badge: "Хит продаж",
    shortDesc: "Парфюмированный бахур в фирменном шестигранном флаконе Blue Agarwood",
    description:
      "Парфюмированный бахур (агарвуд) в стильном шестигранном стеклянном флаконе с золотистой крышкой, от бренда Asmi Alqurashia. На тёмно-синей этикетке — надписи «Perfumed Incense (Agarwood)», «Blue Agarwood» и «Carefully Hand-selected Perfumed Agarwood Bakhoor». Элегантная упаковка подойдёт как для дома, так и в подарок.",
    notes: ["Уд", "Агарвуд", "Восточные смолы"],
    usage: "Небольшое количество бахура на раскалённый уголь или электрокурильницу, время раскрытия — 2–3 минуты.",
    inStock: false,
    rating: 5,
    reviewsCount: 0,
    images: ["images/products/bahur-bottle-blue-agarwood.jpg"],
  },
  {
    id: 123,
    slug: "bahur-ud-hijazi",
    category: "bahur",
    name: "Бахур Уд Хиджази",
    price: null,
    oldPrice: null,
    badge: null,
    shortDesc: "Крупные ароматные щепки уда в металлической банке",
    description:
      "Тёмные ароматные щепки уда неправильной формы, с заметной смолистой текстурой, в удобной металлической банке с крышкой. Насыщенный, глубокий древесный аромат при окуривании.",
    notes: ["Уд", "Древесная смола", "Тёплые пряности"],
    usage: "1–2 щепки на раскалённый уголь, время раскрытия — 3–4 минуты.",
    inStock: false,
    rating: 5,
    reviewsCount: 0,
    images: ["images/products/bahur-tin-mixed-chips-1.jpg"],
  },
  {
    id: 124,
    slug: "bahur-ud-zaafran",
    category: "bahur",
    name: "Бахур Уд Заафран",
    price: null,
    oldPrice: null,
    badge: null,
    shortDesc: "Щепки уда с лёгким рыжеватым оттенком и смолистой присыпкой",
    description:
      "Щепки уда с характерным рыжевато-коричневым оттенком и заметной смолистой присыпкой на поверхности, упакованы в металлическую банку. Тёплый, насыщенный аромат для регулярного окуривания дома.",
    notes: ["Уд", "Смола", "Пряная нота"],
    usage: "1–2 щепки на раскалённый уголь, время раскрытия — 3–4 минуты.",
    inStock: false,
    rating: 5,
    reviewsCount: 0,
    images: ["images/products/bahur-tin-mixed-chips-2.jpg"],
  },
  {
    id: 125,
    slug: "bahur-ud-asvad",
    category: "bahur",
    name: "Бахур Уд Асвад",
    price: null,
    oldPrice: null,
    badge: null,
    shortDesc: "Мелко расщеплённые тёмные пластинки уда в металлической банке",
    description:
      "Мелко расщеплённые, почти чёрно-коричневые пластинки уда в металлической банке. Плотная текстура и насыщенный тёмный оттенок — для тех, кто любит глубокий, стойкий древесный аромат.",
    notes: ["Уд", "Тёмная смола", "Древесная нота"],
    usage: "Небольшая щепотка на раскалённый уголь, время раскрытия — 3 минуты.",
    inStock: false,
    rating: 5,
    reviewsCount: 0,
    images: ["images/products/bahur-tin-dark-chips.jpg"],
  },
  {
    id: 126,
    slug: "bahur-ud-imperial",
    category: "bahur",
    name: "Бахур Уд Империал",
    price: null,
    oldPrice: null,
    badge: null,
    shortDesc: "Крупные матово-чёрные куски уда в металлической банке",
    description:
      "Крупные, плотные куски уда матово-чёрного цвета в металлической банке. Выразительная, почти обугленная текстура — насыщенный и стойкий аромат при окуривании.",
    notes: ["Уд", "Смолистая нота", "Глубокая древесная база"],
    usage: "1 крупный кусок на раскалённый уголь, время раскрытия — 3–4 минуты.",
    inStock: false,
    rating: 5,
    reviewsCount: 0,
    images: ["images/products/bahur-tin-black-chunks.jpg"],
  },
  {
    id: 5,
    slug: "burner-classic-clay",
    category: "burners",
    name: "Бахурница «Мидха» классическая",
    price: 1690,
    oldPrice: null,
    badge: null,
    shortDesc: "Традиционная керамическая бахурница ручной работы",
    description:
      "Классическая бахурница «Мидха» — простая и удобная форма для домашнего окуривания. Устойчивое основание, термостойкий материал, компактный размер.",
    notes: [],
    usage:
      "Положите раскалённый уголь внутрь бахурницы, сверху добавьте бахур. Ставьте на термостойкую поверхность.",
    inStock: true,
    rating: 5,
    reviewsCount: 19,
    images: ["images/products/burner-classic.svg"],
  },
  {
    id: 6,
    slug: "burner-gold-edition",
    category: "burners",
    name: "Бахурница «Мидха» Gold",
    price: 2990,
    oldPrice: null,
    badge: "Премиум",
    shortDesc: "Бахурница с золотыми акцентами для особых случаев",
    description:
      "Бахурница Gold Edition сочетает традиционную форму с элегантным золотым декором. Прекрасно смотрится на журнальном столике и станет украшением интерьера.",
    notes: [],
    usage: "Аналогично классической бахурнице: уголь внутрь, бахур сверху.",
    inStock: true,
    rating: 5,
    reviewsCount: 6,
    images: ["images/products/burner-gold.svg"],
  },
  {
    id: 7,
    slug: "burner-electric",
    category: "burners",
    name: "Электрическая бахурница",
    price: 3290,
    oldPrice: null,
    badge: null,
    shortDesc: "Без угля и открытого огня — безопасно и удобно",
    description:
      "Электрическая бахурница нагревает бахур без открытого огня и угля. Удобна для ежедневного использования, безопасна для дома с детьми и животными.",
    notes: [],
    usage: "Включите в сеть, поместите бахур на нагревательную пластину, дождитесь раскрытия аромата.",
    inStock: false,
    rating: 4,
    reviewsCount: 4,
    images: ["images/products/burner-electric.svg"],
  },
  {
    id: 105,
    slug: "burner-wooden",
    category: "burners",
    name: "Бахурница деревянная резная",
    price: 2390,
    oldPrice: null,
    badge: null,
    shortDesc: "Тёплая фактура натурального дерева ручной резьбы",
    description:
      "Деревянная бахурница с резным орнаментом на ножке — сочетает тёплую фактуру натурального дерева и устойчивую керамическую чашу для угля. Хорошо смотрится как часть домашнего декора даже вне окуривания.",
    notes: [],
    usage: "Уголь помещается во внутреннюю керамическую чашу, сверху — бахур. Ставьте на термостойкую поверхность.",
    inStock: true,
    rating: 5,
    reviewsCount: 9,
    images: ["images/products/burner-wood-1.svg", "images/products/burner-wood-2.svg"],
  },
  {
    id: 106,
    slug: "burner-mini-ceramic",
    category: "burners",
    name: "Бахурница мини керамическая",
    price: 1190,
    oldPrice: null,
    badge: "Новинка",
    shortDesc: "Компактная бахурница для небольших комнат и офиса",
    description:
      "Компактная керамическая бахурница подойдёт для небольшой комнаты, ванной или рабочего стола в офисе. Несмотря на размер, полностью термостойкая и удобная в ежедневном использовании.",
    notes: [],
    usage: "Уголь внутрь чаши, бахур сверху. Из-за компактного размера используйте небольшое количество угля.",
    inStock: true,
    rating: 5,
    reviewsCount: 14,
    images: ["images/products/burner-mini-ceramic.svg"],
  },
  {
    id: 107,
    slug: "burner-travel",
    category: "burners",
    name: "Бахурница дорожная с крышкой",
    price: 1990,
    oldPrice: null,
    badge: null,
    shortDesc: "Закрывается крышкой — удобно брать с собой в поездки",
    description:
      "Дорожная бахурница с плотной крышкой безопасно закрывается после использования и остывания — можно взять с собой в поездку или убрать сразу после окуривания, не боясь запачкать поверхность золой.",
    notes: [],
    usage: "Используйте как обычную бахурницу. Закрывайте крышкой только после того, как уголь полностью остыл.",
    inStock: true,
    rating: 4,
    reviewsCount: 5,
    images: ["images/products/burner-travel-1.svg", "images/products/burner-travel-2.svg"],
  },
  {
    id: 108,
    slug: "burner-filigree-dome",
    category: "burners",
    name: "Бахурница «Купол» ажурная",
    price: 3000,
    oldPrice: null,
    badge: "Новинка",
    shortDesc: "Ажурный купол с восточным орнаментом на резном основании",
    description:
      "Бахурница «Купол» — эффектная форма с ажурной резной крышкой в виде купола и орнаментом ручной работы на основании. Сквозные узоры позволяют аромату дыма свободно распространяться по комнате, а сама бахурница выглядит как самостоятельное украшение интерьера даже без использования.",
    notes: [],
    usage: "Поместите раскалённый уголь на основание бахурницы, сверху добавьте бахур и накройте ажурным куполом. Ставьте на термостойкую поверхность.",
    inStock: true,
    rating: 5,
    reviewsCount: 1,
    images: ["images/products/burner-filigree-dome.jpg"],
  },
  {
    id: 109,
    slug: "burner-sphere-dotted",
    category: "burners",
    name: "Бахурница «Шар» перфорированная",
    price: 950,
    oldPrice: null,
    badge: null,
    shortDesc: "Лаконичная шарообразная бахурница со сквозными отверстиями",
    description:
      "Бахурница «Шар» — сдержанная округлая форма без лишнего декора, с крышкой, перфорированной аккуратными отверстиями для выхода дыма. Хорошо впишется в минималистичный интерьер и подойдёт для ежедневного использования.",
    notes: [],
    usage: "Поместите раскалённый уголь внутрь основания, сверху добавьте бахур и накройте перфорированной крышкой.",
    inStock: true,
    rating: 5,
    reviewsCount: 1,
    images: ["images/products/burner-sphere-dotted.jpg"],
  },
  {
    id: 110,
    slug: "burner-teardrop-lattice",
    category: "burners",
    name: "Бахурница «Капля» ажурная",
    price: 3000,
    oldPrice: null,
    badge: "Новинка",
    shortDesc: "Каплевидная ажурная крышка на резном основании",
    description:
      "Бахурница «Капля» — вытянутая ажурная форма в виде капли на невысоком резном основании с золотистой окантовкой. Сквозная резьба позволяет аромату свободно распространяться, а сама форма делает бахурницу заметным акцентом на полке или столе.",
    notes: [],
    usage: "Поместите раскалённый уголь на основание, сверху добавьте бахур и накройте ажурной крышкой.",
    inStock: true,
    rating: 5,
    reviewsCount: 1,
    images: ["images/products/burner-teardrop-lattice.jpg"],
  },
  {
    id: 111,
    slug: "burner-wood-round-lid",
    category: "burners",
    name: "Бахурница деревянная круглая",
    price: 2500,
    oldPrice: null,
    badge: null,
    shortDesc: "Округлая деревянная бахурница с ажурной металлической крышкой",
    description:
      "Округлая бахурница из дерева с плотной, приятной на ощупь фактурой и ажурной металлической крышкой с орнаментом по кайме. Тёплый природный материал корпуса контрастирует с металлическим декором крышки.",
    notes: [],
    usage: "Поместите раскалённый уголь на основание, сверху добавьте бахур и накройте металлической крышкой.",
    inStock: true,
    rating: 5,
    reviewsCount: 1,
    images: ["images/products/burner-wood-round-lid.jpg"],
  },
  {
    id: 112,
    slug: "burner-cylinder-calligraphy",
    category: "burners",
    name: "Бахурница цилиндр с орнаментом",
    price: 2500,
    oldPrice: null,
    badge: null,
    shortDesc: "Чёрная бахурница с золотистым восточным орнаментом и позолоченной чашей",
    description:
      "Строгая цилиндрическая бахурница из двух частей: нижняя — с гравированным золотистым восточным орнаментом по всей окружности, верхняя — открытая чаша с позолоченным внутренним покрытием. Лаконичный силуэт сочетается с насыщенным декором.",
    notes: [],
    usage: "Поместите раскалённый уголь в верхнюю чашу, сверху добавьте бахур.",
    inStock: true,
    rating: 5,
    reviewsCount: 1,
    images: ["images/products/burner-cylinder-calligraphy.jpg"],
  },
  {
    id: 113,
    slug: "burner-ring-calligraphy",
    category: "burners",
    name: "Бахурница «Кольцо» с орнаментом",
    price: 3200,
    oldPrice: null,
    badge: "Премиум",
    shortDesc: "Скульптурная бахурница в форме кольца с золотистым орнаментом",
    description:
      "Необычная скульптурная бахурница в форме овального кольца на устойчивой подставке, полностью покрытая гравированным золотистым восточным орнаментом на чёрном фоне. Выглядит как самостоятельный предмет декора даже без использования.",
    notes: [],
    usage: "Используйте по инструкции производителя для окуривания — уголь и бахур помещаются в предусмотренное углубление формы.",
    inStock: true,
    rating: 5,
    reviewsCount: 1,
    images: ["images/products/burner-ring-calligraphy.jpg"],
  },
  {
    id: 114,
    slug: "burner-glass-lotus",
    category: "burners",
    name: "Бахурница стеклянная «Лотос»",
    price: 750,
    oldPrice: null,
    badge: null,
    shortDesc: "Гранёная стеклянная чаша на золотистой ножке в форме цветка",
    description:
      "Изящная бахурница из гранёного стекла в форме раскрытого цветка на невысокой золотистой ножке. Лёгкая и нарядная — хорошо подойдёт для праздничного стола или в качестве украшения туалетного столика.",
    notes: [],
    usage: "Поместите раскалённый уголь в чашу, сверху добавьте бахур. Ставьте на термостойкую поверхность.",
    inStock: true,
    rating: 5,
    reviewsCount: 1,
    images: ["images/products/burner-glass-lotus.jpg"],
  },
  {
    id: 115,
    slug: "burner-cone-twist-black",
    category: "burners",
    name: "Бахурница «Вихрь» чёрная",
    price: 2500,
    oldPrice: null,
    badge: "Новинка",
    shortDesc: "Скульптурная чёрная бахурница асимметричной формы с ажурной решёткой",
    description:
      "Бахурница необычной скульптурной формы — асимметричный купол с плавным изгибом и ажурной геометрической решёткой, у основания — тонкая золотистая полоса с восточным орнаментом. Смотрится как арт-объект даже без использования.",
    notes: [],
    usage: "Поместите тлеющий уголь внутрь купола, сверху добавьте бахур. Ставьте на термостойкую поверхность.",
    inStock: true,
    rating: 5,
    reviewsCount: 1,
    images: ["images/products/burner-cone-twist-black.jpg"],
  },
  {
    id: 116,
    slug: "burner-dome-honeycomb-brass",
    category: "burners",
    name: "Бахурница «Соты» с каллиграфией",
    price: 2000,
    oldPrice: null,
    badge: null,
    shortDesc: "Бронзовый купол с ажурным сотовым узором на основании с арабской вязью",
    description:
      "Бахурница с куполом в виде ажурных сот и остроконечным навершием, на основании — гравировка в стиле арабской каллиграфии тёплого бронзового оттенка. Сочетание строгой формы и восточного орнамента.",
    notes: [],
    usage: "Поместите тлеющий уголь внутрь купола, сверху добавьте бахур. Ставьте на термостойкую поверхность.",
    inStock: true,
    rating: 5,
    reviewsCount: 1,
    images: ["images/products/burner-dome-honeycomb-brass.jpg"],
  },
  {
    id: 117,
    slug: "burner-dome-ribbed-bronze",
    category: "burners",
    name: "Бахурница «Шатёр» бронзовая",
    price: 2000,
    oldPrice: null,
    badge: null,
    shortDesc: "Бронзовая бахурница с ребристым куполом-шатром и остроконечным навершием",
    description:
      "Лаконичная бахурница с ребристым куполом в форме шатра и изящным остроконечным навершием. Глубокий бронзовый оттенок и сдержанная форма — подойдёт для тех, кто предпочитает минимум декора.",
    notes: [],
    usage: "Поместите тлеющий уголь внутрь купола, сверху добавьте бахур. Ставьте на термостойкую поверхность.",
    inStock: true,
    rating: 5,
    reviewsCount: 1,
    images: ["images/products/burner-dome-ribbed-bronze.jpg"],
  },
  {
    id: 118,
    slug: "burner-cylinder-lattice-maroon",
    category: "burners",
    name: "Бахурница «Мозаика» цилиндрическая",
    price: 2800,
    oldPrice: null,
    badge: null,
    shortDesc: "Цилиндрическая бахурница тёмно-бордового оттенка с мозаичной решёткой",
    description:
      "Бахурница цилиндрической формы на устойчивом круглом основании, стенки украшены плотной геометрической решёткой в тёмно-бордовом оттенке. Свет от угля красиво пробивается сквозь узор.",
    notes: [],
    usage: "Поместите тлеющий уголь внутрь, сверху добавьте бахур. Ставьте на термостойкую поверхность.",
    inStock: true,
    rating: 5,
    reviewsCount: 1,
    images: ["images/products/burner-cylinder-lattice-maroon.jpg"],
  },
  {
    id: 119,
    slug: "burner-pyramid-calligraphy-maroon",
    category: "burners",
    name: "Бахурница «Пирамида» с каллиграфией",
    price: 3000,
    oldPrice: null,
    badge: "Премиум",
    shortDesc: "Бахурница пирамидальной формы с ажурным узором и золотистой каллиграфией",
    description:
      "Бахурница в форме вытянутой пирамиды с ажурным геометрическим узором наверху и золотистой арабской каллиграфией на основании тёмно-бордового оттенка. Выразительная скульптурная форма для тех, кто любит характерный декор.",
    notes: [],
    usage: "Поместите тлеющий уголь внутрь, сверху добавьте бахур. Ставьте на термостойкую поверхность.",
    inStock: true,
    rating: 5,
    reviewsCount: 1,
    images: ["images/products/burner-pyramid-calligraphy-maroon.jpg"],
  },
  {
    id: 120,
    slug: "burner-box-drawer-maroon",
    category: "burners",
    name: "Бахурница-шкатулка «Ларец» с ящиком",
    price: 1650,
    oldPrice: null,
    badge: null,
    shortDesc: "Деревянная бахурница-шкатулка с ажурной крышкой, застёжкой и выдвижным ящиком",
    description:
      "Бахурница необычного формата — деревянная шкатулка с ажурной пирамидальной крышкой, латунной застёжкой и выдвижным ящиком для хранения угля или бахура. Удобно и красиво: всё нужное — в одном предмете.",
    notes: [],
    usage: "Поместите тлеющий уголь под ажурную крышку, сверху добавьте бахур. Ящик используйте для хранения угля или бахура.",
    inStock: true,
    rating: 5,
    reviewsCount: 1,
    images: ["images/products/burner-box-drawer-maroon.jpg"],
  },
  {
    id: 121,
    slug: "burner-dome-honeycomb-white",
    category: "burners",
    name: "Бахурница «Жемчуг» белая",
    price: 1200,
    oldPrice: null,
    badge: null,
    shortDesc: "Белая бахурница с ажурным сотовым куполом на золотистом основании с вязью",
    description:
      "Светлая бахурница с ажурным куполом-сотами и изящным навершием, на контрастном золотистом основании с орнаментом в стиле арабской каллиграфии. Хорошо впишется в светлый интерьер.",
    notes: [],
    usage: "Поместите тлеющий уголь внутрь купола, сверху добавьте бахур. Ставьте на термостойкую поверхность.",
    inStock: true,
    rating: 5,
    reviewsCount: 1,
    images: ["images/products/burner-dome-honeycomb-white.jpg"],
  },
  {
    id: 8,
    slug: "musk-tahara-classic",
    category: "musk",
    name: "Мускус Тахара классический",
    price: 1290,
    oldPrice: null,
    badge: "Хит продаж",
    shortDesc: "Чистый белый мускус с деликатным шлейфом",
    description:
      "Мускус Тахара — деликатный, чистый аромат без содержания спирта. Подходит для ежедневного использования, не раздражает кожу, оставляет лёгкий стойкий шлейф.",
    notes: ["Белый мускус", "Лёгкая пудра"],
    usage: "Нанесите небольшое количество на запястья, шею или одежду.",
    inStock: true,
    rating: 5,
    reviewsCount: 27,
    images: ["images/products/musk-tahara-1.svg"],
  },
  {
    id: 9,
    slug: "musk-tahara-rose",
    category: "musk",
    name: "Мускус Тахара с розой",
    price: 1390,
    oldPrice: null,
    badge: null,
    shortDesc: "Белый мускус с нежной нотой розы",
    description:
      "Сочетание чистого мускуса и нежной розы создаёт мягкий, женственный аромат. Идеален для повседневного использования.",
    notes: ["Белый мускус", "Роза", "Пудра"],
    usage: "Нанесите на точки пульса. Не содержит спирта.",
    inStock: true,
    rating: 5,
    reviewsCount: 15,
    images: ["images/products/musk-tahara-2.svg"],
  },
  {
    id: 10,
    slug: "musk-white-pure",
    category: "musk",
    name: "White Musk Pure",
    price: 1490,
    oldPrice: 1690,
    badge: "Скидка",
    shortDesc: "Концентрированный белый мускус",
    description:
      "Плотная, концентрированная формула белого мускуса. Небольшого количества достаточно для стойкого аромата на весь день.",
    notes: ["Белый мускус", "Амбра"],
    usage: "Наносите точечно — капли достаточно на несколько часов аромата.",
    inStock: true,
    rating: 4,
    reviewsCount: 9,
    images: ["images/products/musk-white.svg"],
  },
  {
    id: 11,
    slug: "acc-coal-natural",
    category: "accessories",
    name: "Уголь для бахура натуральный",
    price: 490,
    oldPrice: null,
    badge: null,
    shortDesc: "Быстро разгорается, горит без резкого запаха",
    description:
      "Натуральный уголь для окуривания — быстро разгорается и долго держит тепло, не перебивая аромат бахура посторонним запахом.",
    notes: [],
    usage: "Подожгите уголь, дождитесь, пока он полностью разгорится (появится сероватый налёт), затем поместите в бахурницу.",
    inStock: true,
    rating: 5,
    reviewsCount: 33,
    images: ["images/products/acc-coal.svg"],
  },
  {
    id: 12,
    slug: "acc-tongs",
    category: "accessories",
    name: "Щипцы для угля",
    price: 690,
    oldPrice: null,
    badge: null,
    shortDesc: "Удобные металлические щипцы с деревянной ручкой",
    description:
      "Щипцы для угля с удобной деревянной ручкой — безопасно и комфортно перемещать раскалённый уголь в бахурницу.",
    notes: [],
    usage: "Используйте для безопасного обращения с раскалённым углём.",
    inStock: true,
    rating: 5,
    reviewsCount: 11,
    images: ["images/products/acc-tongs.svg"],
  },
  {
    id: 13,
    slug: "acc-tray",
    category: "accessories",
    name: "Поднос для бахурницы",
    price: 990,
    oldPrice: null,
    badge: "Новинка",
    shortDesc: "Термостойкий поднос для безопасного окуривания",
    description:
      "Термостойкий поднос защищает поверхность мебели от нагрева и делает процесс окуривания дома более удобным и аккуратным.",
    notes: [],
    usage: "Поставьте бахурницу на поднос перед началом окуривания.",
    inStock: true,
    rating: 5,
    reviewsCount: 7,
    images: ["images/products/acc-tray.svg"],
  },
];

/* Вспомогательные функции — используются в разных js-файлах */
function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}
function getCategoryTitle(id) {
  const c = CATEGORIES.find((c) => c.id === id);
  return c ? c.title : id;
}
function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}

/* Для товаров с вариантами (объём/вес) — вернуть вариант по умолчанию */
function getDefaultVariant(product) {
  if (!product.variants || product.variants.length === 0) return null;
  return product.variants.find((v) => v.default) || product.variants[0];
}

/* Цена, которую показываем на карточке товара (цена варианта по умолчанию, либо обычная цена) */
function getDisplayPrice(product) {
  const v = getDefaultVariant(product);
  return v ? v.price : product.price;
}

/* Цена для сортировки — товары без цены (price: null, "уточняется") всегда уходят в конец списка,
   независимо от направления сортировки (по возрастанию/убыванию) */
function getSortablePrice(product) {
  const price = getDisplayPrice(product);
  return price == null ? Infinity : price;
}

/* Текст цены для отображения — если цена ещё не назначена (price: null), показываем "Цена уточняется"
   вместо 0 ₽ или "undefined ₽" */
function formatPriceLabel(product) {
  const displayPrice = getDisplayPrice(product);
  if (displayPrice == null) return "Цена уточняется";
  return product.variants ? `от ${formatPrice(displayPrice)}` : formatPrice(displayPrice);
}
