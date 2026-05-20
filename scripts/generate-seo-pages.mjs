import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const site = {
  url: 'https://premium-ceiling-landing.vercel.app',
  name: 'Потолок и точка',
  phone: '+7 900 655-69-99',
  phoneHref: 'tel:+79006556999',
  telegram: 'https://t.me/dimasic_135',
  whatsapp: 'https://wa.me/79006556999',
  ym: '109271388',
  area: 'Москва и Московская область'
};
const today = '2026-05-20';

const prices = [
  ['Простой матовый потолок в комнату', 'от 20 000 ₽', 'полотно, профиль, монтаж, люстра или вывод под свет'],
  ['Потолок с люстрой', 'от 22 000 ₽', 'закладная под люстру, аккуратное примыкание'],
  ['Потолок с точечными светильниками', 'от 35 000 ₽', '4-8 точек, закладные, подключение'],
  ['Скрытый карниз', 'от 45 000 ₽', 'ниша под шторы, профиль, примыкание'],
  ['Парящий потолок', 'от 75 000 ₽', 'профиль под LED, лента, блок питания'],
  ['Теневой профиль', 'от 55 000 ₽', 'тонкая теневая щель без декоративной вставки'],
  ['Световые линии', 'от 85 000 ₽', 'профиль линии, лента, блоки питания, подключение'],
  ['Трековое освещение', 'от 85 000 ₽', 'закладные, треки, вывод питания'],
  ['Ремонт пореза', 'от 3 500 ₽', 'локальный ремонт, если повреждение технически исправимо'],
  ['Слив воды', 'от 3 000 ₽', 'выезд, слив, просушка, обратная установка'],
  ['Замена полотна', 'от 12 000 ₽', 'демонтаж старого полотна и установка нового']
];

const servicePages = [
  {slug:'natyazhnye-potolki-pod-klyuch', title:'Натяжные потолки под ключ', intent:'полный цикл от расчёта и замера до монтажа и фотоотчёта', fit:['нужен потолок без поиска отдельных мастеров','важны договор и фиксированная смета','нужно сравнить базовый и более красивый вариант','хотите закрыть одну комнату или всю квартиру'], includes:['подбор полотна и профиля','расчёт по фото','бесплатный замер','договор и спецификация','монтаж проверенной бригадой-партнёром','фотоотчёт и гарантия'], price:'от 20 000 ₽ за комнату 18 м²'},
  {slug:'matovye-natyazhnye-potolki', title:'Матовые натяжные потолки', intent:'ровный спокойный потолок без бликов, который выглядит как окрашенная поверхность', fit:['делаете аккуратный ремонт без лишнего дизайна','не хотите глянец и отражения','нужен универсальный вариант для спальни, кухни или коридора'], includes:['матовое полотно','стандартный или улучшенный профиль','вывод под люстру или точки','монтаж под ключ','гарантия'], price:'от 20 000 ₽ за комнату 18 м²'},
  {slug:'glyancevye-natyazhnye-potolki', title:'Глянцевые натяжные потолки', intent:'потолок с отражением для помещений, где нужно визуально добавить высоту', fit:['нужно визуально расширить небольшое помещение','подходит современный блестящий эффект','важна простая уборка'], includes:['глянцевое полотно','профиль','обход труб и углов','монтаж','гарантия'], price:'от 22 000 ₽ за комнату 18 м²'},
  {slug:'satinovye-natyazhnye-potolki', title:'Сатиновые натяжные потолки', intent:'мягкая фактура между матовым и глянцевым потолком', fit:['хотите спокойный, но не совсем матовый потолок','важна лёгкая игра света','нужен вариант для спальни или гостиной'], includes:['сатиновое полотно','профиль','выводы под свет','монтаж','гарантия'], price:'от 24 000 ₽ за комнату 18 м²'},
  {slug:'natyazhnye-potolki-s-podsvetkoy', title:'Натяжные потолки с подсветкой', intent:'мягкий вечерний свет по периметру, у окна или в нише', fit:['не хватает уютного сценария света','хотите подсветку у штор или по периметру','делаете спальню, гостиную или кухню-гостиную'], includes:['подбор схемы','LED-лента','профиль или ниша','блок питания','монтаж и подключение','проверка света'], price:'от 60 000 ₽ за комнату 18 м²'},
  {slug:'svetovye-linii', title:'Световые линии в натяжном потолке', intent:'архитектурный свет и зонирование без обычной люстры', fit:['хотите современный архитектурный свет','нужно зонировать кухню-гостиную','делаете ремонт по дизайн-проекту','хотите эффектный потолок'], includes:['подбор схемы','профиль для световой линии','LED-лента','блок питания','монтаж','подключение','проверка света'], price:'от 85 000 ₽ за комнату 18 м²'},
  {slug:'tenevoj-profil', title:'Теневой профиль для натяжного потолка', intent:'тонкая теневая щель по периметру без декоративной вставки', fit:['нужен минимализм без белой вставки','есть ровные стены или планируется подготовка','хотите аккуратное современное примыкание'], includes:['теневой профиль','подготовка узлов','полотно','монтаж','контроль примыкания'], price:'от 55 000 ₽ за комнату 18 м²'},
  {slug:'paryashchij-natyazhnoj-potolok', title:'Парящий натяжной потолок', intent:'эффект лёгкости и световой контур по периметру', fit:['нужен мягкий свет по стенам','хотите визуально отделить потолок от стен','подходит современный интерьер'], includes:['парящий профиль','LED-лента','блок питания','полотно','монтаж','проверка сценариев света'], price:'от 75 000 ₽ за комнату 18 м²'},
  {slug:'skrytyj-karniz', title:'Скрытый карниз в натяжном потолке', intent:'шторы выходят из потолка, а карниз не виден', fit:['хотите, чтобы окно выглядело дороже','нужны шторы без видимого карниза','планируете подсветку у окна'], includes:['ниша под карниз','профиль','закладные','полотно','монтаж','приёмка узла у окна'], price:'от 45 000 ₽ за комнату 18 м²'},
  {slug:'trekovoe-osveshchenie', title:'Трековое освещение в натяжном потолке', intent:'гибкий свет, который можно направлять и менять по сценариям', fit:['нужно зонировать пространство','не хотите одну люстру','делаете кухню-гостиную или студию'], includes:['подбор трека','закладные','вывод питания','монтаж полотна','установка треков','проверка света'], price:'от 85 000 ₽ за комнату 18 м²'},
  {slug:'tochechnye-svetilniki', title:'Натяжные потолки с точечными светильниками', intent:'равномерный свет без крупной центральной люстры', fit:['нужно больше света в комнате','хотите современный потолок без сложных линий','важен баланс цены и внешнего вида'], includes:['схема светильников','закладные','выводы питания','монтаж полотна','установка светильников'], price:'от 35 000 ₽ за комнату 18 м²'},
  {slug:'natyazhnoj-potolok-na-kuhnyu', title:'Натяжной потолок на кухню', intent:'практичный потолок для кухни с учётом света, вытяжки и ухода', fit:['нужен потолок, который легко протереть','есть вытяжка, трубы или сложные углы','хотите точечный свет над рабочей зоной'], includes:['полотно для кухни','профиль','обход коммуникаций','свет','монтаж','гарантия'], price:'от 25 000 ₽ за кухню 10 м²'},
  {slug:'natyazhnoj-potolok-v-vannuyu', title:'Натяжной потолок в ванную', intent:'влагостойкое решение для санузла и ванной комнаты', fit:['нужно закрыть коммуникации','важна влагостойкость','планируете точечный свет'], includes:['влагостойкое полотно','профиль','обход труб','светильники','монтаж'], price:'от 18 000 ₽ за ванную 4 м²'},
  {slug:'natyazhnoj-potolok-v-spalnyu', title:'Натяжной потолок в спальню', intent:'спокойный потолок со светом, карнизом или мягкой подсветкой', fit:['нужен спокойный матовый потолок','хотите шторы из потолка','нужен вечерний свет'], includes:['полотно','профиль','свет или карниз по задаче','монтаж','гарантия'], price:'от 22 000 ₽ за спальню 18 м²'},
  {slug:'natyazhnoj-potolok-v-gostinuyu', title:'Натяжной потолок в гостиную', intent:'потолок, который выглядит аккуратно и поддерживает сценарии света', fit:['гостиная совмещена с кухней','нужны треки или световые линии','важен внешний вид'], includes:['подбор решения','полотно','свет','карниз или профиль','монтаж','фотоотчёт'], price:'от 40 000 ₽ за гостиную 20 м²'},
  {slug:'natyazhnye-potolki-v-novostrojku', title:'Натяжные потолки в новостройку', intent:'быстро закрыть потолки после приёмки квартиры и не сорвать ремонт', fit:['квартира после приёмки','нужно сделать несколько помещений','важны сроки и координация с прорабом'], includes:['расчёт по планировке','замер','смета по комнатам','монтаж по этапам','фотоотчёт'], price:'от 80 000 ₽ за квартиру 40 м²'},
  {slug:'remont-natyazhnyh-potolkov', title:'Ремонт натяжных потолков', intent:'исправить повреждения, провисания, проблемы со светом или полотном', fit:['появился порез или прокол','нужно заменить часть света','после затопления осталась вода','полотно провисло'], includes:['диагностика','варианты ремонта','локальные работы','замена элементов','проверка результата'], price:'от 3 500 ₽'},
  {slug:'sliv-vody-s-natyazhnogo-potolka', title:'Слив воды с натяжного потолка', intent:'аккуратно убрать воду после затопления и вернуть потолок на место', fit:['затопили соседи','полотно провисло пузырём','нужно срочно сохранить потолок'], includes:['выезд мастера','слив воды','просушка','обратная установка','проверка светильников'], price:'от 3 000 ₽'},
  {slug:'zamena-polotna', title:'Замена полотна натяжного потолка', intent:'заменить старое, повреждённое или устаревшее полотно без полной переделки', fit:['полотно испорчено','хотите сменить фактуру или цвет','профиль можно оставить'], includes:['осмотр профиля','подбор нового полотна','демонтаж','натяжка нового полотна','проверка'], price:'от 12 000 ₽'},
  {slug:'remont-poreza', title:'Ремонт пореза натяжного потолка', intent:'оценить, можно ли локально исправить порез без замены всего полотна', fit:['порез рядом со стеной или светильником','нужно понять, ремонтировать или менять','важно скрыть повреждение аккуратно'], includes:['оценка повреждения','вариант ремонта','установка заплатки или декоративного элемента','проверка натяжения'], price:'от 3 500 ₽'}
];

const blogPosts = [
  ['skolko-stoit-natyazhnoj-potolok','Сколько стоит натяжной потолок в 2026 году','Разбираем реальные ориентиры, почему цена зависит не только от м² и как получить честный расчёт.'],
  ['pochemu-cena-ot-299-ne-finalnaya','Почему цена “от 299 ₽/м²” почти никогда не является финальной','Что обычно не входит в рекламную цену и как не попасть на доплаты на замере.'],
  ['chto-vliyaet-na-cenu-potolka','Что влияет на стоимость натяжного потолка','Площадь, периметр, углы, трубы, свет, карниз, профиль и сложность монтажа простым языком.'],
  ['matovyj-ili-glyancevyj-potolok','Матовый или глянцевый потолок: что выбрать','Сравнение фактур для кухни, спальни, ванной и гостиной.'],
  ['satinovyj-potolok-plyusy-i-minusy','Сатиновый потолок: плюсы и минусы','Когда сатин выглядит лучше матового и где он может быть неуместен.'],
  ['natyazhnoj-potolok-na-kuhnyu-kakoj-material-vybrat','Натяжной потолок на кухню: какой материал выбрать','Практичность, уход, свет, вытяжка и нюансы монтажа на кухне.'],
  ['natyazhnoj-potolok-v-vannuyu','Натяжной потолок в ванную: плюсы, минусы, нюансы','Влагостойкость, светильники, вентиляция и что делать при затоплении.'],
  ['svetovye-linii-plyusy-i-minusy','Световые линии в потолке: плюсы, минусы и цена','Кому подходят световые линии, чем отличаются от треков и что влияет на бюджет.'],
  ['tenevoj-profil-chto-eto','Теневой профиль: что это и когда нужен','Как выглядит теневое примыкание и почему стены должны быть подготовлены.'],
  ['skrytyj-karniz-v-natyazhnom-potolke','Скрытый карниз в натяжном потолке: как выглядит и сколько стоит','Ниша под шторы, подсветка у окна и частые ошибки.'],
  ['trekovoe-osveshchenie-v-natyazhnom-potolke','Трековое освещение в натяжном потолке: что важно знать','Закладные, питание, сценарии света и ограничения.'],
  ['paryashchij-potolok-kogda-stoit-delat','Парящий потолок: когда стоит делать, а когда нет','Где парящий эффект смотрится дорого, а где лучше выбрать другое решение.'],
  ['kak-podgotovit-komnatu-k-montazhu-potolka','Как подготовить комнату к монтажу натяжного потолка','Что убрать, как защитить мебель и какие работы закончить до монтажа.'],
  ['chto-delat-esli-zatopili-natyazhnoj-potolok','Что делать, если затопили натяжной потолок','Пошагово: отключить свет, не прокалывать полотно, вызвать мастера.'],
  ['kak-ubrat-vodu-iz-natyazhnogo-potolka','Как убрать воду из натяжного потолка','Почему не стоит сливать воду самостоятельно и как проходит работа мастера.'],
  ['remont-poreza-natyazhnogo-potolka','Ремонт пореза натяжного потолка: что можно исправить','Когда можно обойтись локальным ремонтом, а когда нужна замена полотна.'],
  ['kakie-svetilniki-podhodyat-dlya-natyazhnogo-potolka','Какие светильники подходят для натяжного потолка','Температура, мощность, закладные, треки и точечный свет.'],
  ['natyazhnoj-potolok-v-novostrojku','Натяжной потолок в новостройку: когда лучше делать','Как вписать потолки в этапы ремонта и не сорвать мебель, шторы и свет.'],
  ['7-oshibok-pri-vybore-natyazhnogo-potolka','7 ошибок при выборе натяжного потолка','Цена за м², отсутствие договора, гарантия только на полотно и другие ловушки.'],
  ['kak-vybrat-kompaniyu-po-natyazhnym-potolkam','Как выбрать компанию по натяжным потолкам и не попасть на обман','Чек-лист проверки подрядчика, сметы, гарантии и отзывов.']
];

const geoPages = [
  ['natyazhnye-potolki-v-moskve','Москве','Москва'],
  ['natyazhnye-potolki-v-moskovskoj-oblasti','Московской области','МО'],
  ['natyazhnye-potolki-v-krasnogorske','Красногорске','Красногорск'],
  ['natyazhnye-potolki-v-himkah','Химках','Химки'],
  ['natyazhnye-potolki-v-balashihe','Балашихе','Балашиха'],
  ['natyazhnye-potolki-v-mitino','Митино','Митино'],
  ['natyazhnye-potolki-v-kommunarke','Коммунарке','Коммунарка']
];

const zhkPages = [
  ['natyazhnye-potolki-v-zhk-simvol','Символ'],
  ['natyazhnye-potolki-v-zhk-seliger-siti','Селигер Сити'],
  ['natyazhnye-potolki-v-zhk-lyublinskij-park','Люблинский парк']
];

function esc(s=''){
  return String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
function writeFile(rel, html){
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), {recursive:true});
  fs.writeFileSync(file, html);
}
function schema(data){
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g,'\\u003c')}</script>`;
}
function breadcrumbs(items){
  return schema({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":items.map((it,i)=>({"@type":"ListItem","position":i+1,"name":it[0],"item":site.url+it[1]}))});
}
function layout({title, description, path: pagePath, h1, lead, body, type='WebPage', faq=[], noindex=false, showLeadForm=true}){
  const canonical = `${site.url}${pagePath}`;
  const graph = {
    "@context":"https://schema.org",
    "@graph":[
      {"@type":"LocalBusiness","@id":`${site.url}/#business`,"name":site.name,"url":site.url,"telephone":site.phone,"areaServed":["Москва","Московская область"],"openingHours":"Mo-Su 09:00-22:00","priceRange":"₽₽","sameAs":[site.telegram,site.whatsapp]},
      {"@type":type,"@id":`${canonical}#page`,"url":canonical,"name":title,"description":description,"isPartOf":{"@id":`${site.url}/#website`}},
      ...(faq.length ? [{"@type":"FAQPage","mainEntity":faq.map(([q,a])=>({"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}}))}] : [])
    ]
  };
  return `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  ${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${site.url}/assets/img/02-after-small-room-shadow-line.jpg">
  <link rel="icon" href="/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/style.css">
  ${schema(graph)}
  ${breadcrumbs([['Главная','/'],[h1,pagePath]])}
</head>
<body class="seo-body">
<div id="progress"></div>
${header()}
<main class="site-page">
  <section class="page-hero${showLeadForm ? '' : ' page-hero-simple'}">
    <div>
      <span class="page-kicker">Расчёт по фото · бесплатный замер · ${site.area}</span>
      <h1>${esc(h1)}</h1>
      <p>${esc(lead)}</p>
      <div class="page-hero-actions">
        <a class="btn primary" href="/raschet-po-foto/">Получить расчёт по фото</a>
        <a class="btn ghost" href="${site.whatsapp}" target="_blank" rel="noopener">Написать в WhatsApp</a>
      </div>
      <div class="page-trust">
        <span>2–3 варианта сметы</span><span>Договор</span><span>Проверенные бригады-партнёры</span><span>Гарантия на монтаж</span>
      </div>
    </div>
    ${showLeadForm ? `<form class="page-lead-form" data-tg-form data-source="${pagePath}">
      <h2>Быстрый расчёт</h2>
      <input name="name" placeholder="Имя" required>
      <input name="contact" placeholder="+7 или @telegram" required>
      <input name="city" placeholder="Город / район">
      <input name="area" placeholder="Площадь, м²">
      <select name="stage"><option>${esc(h1)}</option><option>Ровный потолок</option><option>Свет без люстры</option><option>Шторы из потолка</option><option>Ремонт / слив воды</option><option>Помогите выбрать</option></select>
      <input type="file" name="photo" accept="image/*">
      <textarea name="comment" placeholder="Комментарий или пожелания"></textarea>
      <button class="btn indigo" type="submit">Отправить заявку</button>
      <p class="mini-note">После отправки можно сразу написать в Telegram или WhatsApp.</p>
    </form>` : ''}
  </section>
  ${body}
</main>
${mobileBar()}
${footer()}
<script src="/assets/main.js" defer></script>
${metrika()}
</body>
</html>`;
}
function header(){
  return `<header class="topnav">
  <div class="topnav-inner">
    <a href="/" class="logo"><img src="/assets/logo.png" alt="${site.name}" width="855" height="676"></a>
    <nav class="main">
      <a href="/uslugi/">Услуги</a><a href="/ceny/">Цены</a><a href="/kalkulyator/">Калькулятор</a><a href="/primery-rabot/">Примеры</a><a href="/garantiya/">Гарантия</a><a href="/partneram/">Партнёрам</a><a href="/faq/">FAQ</a>
    </nav>
    <a href="${site.phoneHref}" class="phone phone-flat" data-goal="phone_click">${site.phone}</a>
    <a href="/raschet-po-foto/" class="btn primary">Рассчитать</a>
    <a href="${site.phoneHref}" class="ic-link" aria-label="Позвонить" data-goal="phone_click">☎</a>
    <button class="burger" id="burger" aria-label="меню" aria-controls="drawer" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>
</header>
<div class="drawer-backdrop" id="drawerBackdrop"></div>
<aside class="drawer" id="drawer" aria-hidden="true">
  <div class="drawer-head"><a href="/" class="logo"><img src="/assets/logo.png" alt="${site.name}"></a><button class="drawer-close" id="drawerClose" aria-label="Закрыть меню">×</button></div>
  <nav class="drawer-nav">
    <a href="/uslugi/" data-close>Услуги</a><a href="/ceny/" data-close>Цены</a><a href="/kalkulyator/" data-close>Калькулятор</a><a href="/primery-rabot/" data-close>Примеры</a><a href="/garantiya/" data-close>Гарантия</a><a href="/partneram/" data-close>Партнёрам</a><a href="/faq/" data-close>FAQ</a><a href="/kontakty/" data-close>Контакты</a>
  </nav>
</aside>`;
}
function footer(){
  return `<footer><div class="foot-grid">
  <div><a href="/" class="logo"><img src="/assets/logo.png" alt="${site.name}"></a><p>Натяжные потолки под ключ: от простого матового потолка до дизайнерского света.</p></div>
  <div><h5>Услуги</h5><ul>${servicePages.slice(0,8).map(s=>`<li><a href="/uslugi/${s.slug}/">${s.title}</a></li>`).join('')}</ul></div>
  <div><h5>Навигация</h5><ul><li><a href="/ceny/">Цены</a></li><li><a href="/kalkulyator/">Калькулятор</a></li><li><a href="/raschet-po-foto/">Расчёт по фото</a></li><li><a href="/avito/">Для Avito</a></li><li><a href="/blog/">Блог</a></li></ul></div>
  <div><h5>Контакты</h5><ul><li><a href="${site.phoneHref}">${site.phone}</a></li><li><a href="${site.telegram}">Telegram</a></li><li><a href="${site.whatsapp}">WhatsApp</a></li><li>Ежедневно 09:00–22:00</li></ul></div>
  </div><div class="foot-bottom"><span>© 2026 ${site.name}. Проверенные бригады-партнёры, договор, фотоотчёт.</span><span><a href="/privacy.html">Политика</a> · <a href="/offer.html">Оферта</a></span></div></footer>`;
}
function mobileBar(){
  return `<nav class="mobile-actionbar" aria-label="Быстрые действия">
    <a href="${site.phoneHref}" data-goal="phone_click">Позвонить</a>
    <a href="${site.telegram}" data-goal="telegram_click">Telegram</a>
    <a href="${site.whatsapp}" data-goal="whatsapp_click">WhatsApp</a>
    <a href="/kalkulyator/" data-goal="calculator_click">Рассчитать</a>
  </nav>`;
}
function metrika(){
  return `<script>(function(){function loadYM(){(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=${site.ym}','ym');ym(${site.ym},'init',{ssr:true,webvisor:true,clickmap:true,accurateTrackBounce:true,trackLinks:true});}if('requestIdleCallback'in window){requestIdleCallback(loadYM,{timeout:2500});}else{setTimeout(loadYM,1500);}})();</script><noscript><div><img src="https://mc.yandex.ru/watch/${site.ym}" style="position:absolute;left:-9999px" alt=""></div></noscript>`;
}
function cta(text='Хотите понять стоимость для вашей комнаты?'){
  return `<section class="page-cta"><h2>${text}</h2><p>Пришлите фото комнаты — подготовим 2–3 варианта: базовый, оптимальный и дизайнерский.</p><div><a class="btn indigo" href="/raschet-po-foto/">Рассчитать по фото</a><a class="btn ghost" href="/kalkulyator/">Открыть калькулятор</a></div></section>`;
}
function priceTable(){
  return `<section class="page-section"><h2>Ориентиры по цене</h2><div class="page-table"><table><thead><tr><th>Решение</th><th>Ориентир</th><th>Что входит</th></tr></thead><tbody>${prices.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody></table></div><p class="mini-note">Цены ориентировочные. Финальная смета фиксируется после замера и зависит от периметра, углов, труб, профиля, света, карниза и состояния стен.</p></section>`;
}
function faqBlock(items=[
  ['Можно ли назвать точную цену по телефону?','Точную цену безопаснее фиксировать после замера: нужно увидеть периметр, углы, трубы, стены, свет и карниз. По фото даём честный ориентир.'],
  ['Замер бесплатный?','Да, выезд на замер бесплатный по Москве и ближнему Подмосковью. По дальним адресам условия уточняем заранее.'],
  ['Кто выполняет монтаж?','Монтаж выполняют проверенные бригады-партнёры по нашему регламенту, чек-листу и договору ответственности.'],
  ['Будут ли доплаты?','После согласования сметы состав работ фиксируется в договоре. Доплаты возможны только за новые работы, которые вы отдельно согласовали.']
]){
  return `<section class="page-section"><h2>FAQ</h2><div class="faq-list">${items.map(([q,a])=>`<details class="faq"><summary>${q}<span class="toggle">+</span></summary><div class="body"><p>${a}</p></div></details>`).join('')}</div></section>`;
}
function serviceBody(s){
  return `
  <section class="page-section"><h2>Подходит, если</h2><div class="page-grid">${s.fit.map(x=>`<article><h3>${x}</h3><p>Покажем, как это будет выглядеть в вашей комнате, и объясним, какой вариант будет рациональнее.</p></article>`).join('')}</div></section>
  <section class="page-section"><h2>Что входит в работу</h2><ul class="page-list">${s.includes.map(x=>`<li>${x}</li>`).join('')}</ul></section>
  ${priceTable()}
  <section class="page-section"><h2>Что влияет на стоимость</h2><p>На цену влияют не только квадратные метры: важны периметр, количество углов, трубы, тип профиля, свет, карниз, подготовка стен и сложность доступа. Поэтому мы сначала показываем ориентир, а финальную смету фиксируем после замера.</p></section>
  <section class="page-section"><h2>Как проходит работа</h2><ol class="page-steps"><li>Вы присылаете фото или оставляете заявку.</li><li>Мы задаём 3–5 уточняющих вопросов.</li><li>Показываем 2–3 варианта и ориентир по бюджету.</li><li>Назначаем бесплатный замер.</li><li>Фиксируем смету и дату монтажа.</li><li>Бригада-партнёр выполняет работу, мы принимаем фотоотчёт.</li></ol></section>
  <section class="page-section"><h2>Почему безопаснее с нами</h2><p>Мы не отправляем случайных мастеров. Монтаж выполняют проверенные бригады-партнёры, которые работают по регламенту, чек-листу и договору ответственности. Клиент общается с нами, а мы контролируем сроки, смету, фотоотчёт и гарантию.</p></section>
  ${faqBlock()}
  ${cta(`Пришлите фото — предложим 2–3 варианта: ${s.title.toLowerCase()}`)}`;
}

function calcBody(){
  return `<section class="page-section"><h2>Квиз-калькулятор</h2><form class="quiz-form" data-tg-form data-source="/kalkulyator/">
    ${quizSelect('service','Что нужно?',['Обычный натяжной потолок','Потолок с подсветкой','Световые линии','Теневой профиль','Скрытый карниз','Трековое освещение','Ремонт','Слив воды','Пока не знаю, нужна консультация'])}
    ${quizSelect('room','Где нужен потолок?',['Комната','Кухня','Ванная','Спальня','Гостиная','Кухня-гостиная','Вся квартира','Коммерческое помещение'])}
    ${quizSelect('area','Площадь',['до 10 м²','10–20 м²','20–40 м²','40–70 м²','70+ м²','не знаю'])}
    ${quizSelect('lighting','Освещение',['Люстра','Точечные светильники','Световые линии','Треки','Подсветка по периметру','Без света','Пока не знаю'])}
    ${quizSelect('deadline','Когда нужно сделать?',['Срочно','На этой неделе','В течение месяца','Пока сравниваю варианты'])}
    <input name="city" placeholder="Город / район">
    <input name="name" placeholder="Имя" required>
    <input name="contact" placeholder="Телефон или Telegram" required>
    <textarea name="comment" placeholder="Комментарий"></textarea>
    <button class="btn indigo" type="submit">Получить предварительный расчёт</button>
  </form></section>${cta('После квиза подготовим 2–3 варианта сметы')}`;
}
function quizSelect(name,label,options){
  return `<label><span>${label}</span><select name="${name}">${options.map(o=>`<option>${o}</option>`).join('')}</select></label>`;
}

function corePage(slug, h1, lead, extra=''){
  writeFile(`${slug}/index.html`, layout({title:`${h1} — ${site.name}`, description:lead, path:`/${slug}/`, h1, lead, body: extra + priceTable() + faqBlock() + cta(), faq:[['Замер бесплатный?','Да, по Москве и ближнему Подмосковью.'],['Можно рассчитать по фото?','Да, пришлите фото, площадь и пожелания.']]}));
}

corePage('ceny','Цены на натяжные потолки под ключ','Показываем честные ориентиры, а не заманиваем ценой 299 ₽/м². Финальная стоимость зависит от площади, профиля, углов, труб, светильников, карниза и сложности монтажа.', `<section class="page-section"><h2>Примеры расчётов</h2><div class="page-grid">${['Комната 12 м²','Комната 18 м²','Кухня 10 м²','Кухня-гостиная 25 м²','Ванная 4 м²','Квартира 40 м²','Квартира 60 м²'].map(x=>`<article><h3>${x}</h3><p>Подберём базовый, оптимальный и дизайнерский сценарий, покажем, что входит в смету и сколько займёт монтаж.</p><a href="/raschet-po-foto/">Хочу похожий расчёт</a></article>`).join('')}</div></section>`);
writeFile('kalkulyator/index.html', layout({title:`Калькулятор стоимости натяжного потолка — ${site.name}`, description:'Предварительный расчёт натяжного потолка по комнате, площади, свету и срокам. Заявка уходит в Telegram.', path:'/kalkulyator/', h1:'Калькулятор стоимости натяжного потолка', lead:'Ответьте на несколько вопросов — мы подготовим предварительный расчёт и предложим 2–3 варианта: базовый, оптимальный и дизайнерский.', body:calcBody(), faq:[['Это точная цена?','Нет, это предварительный ориентир. Финальную смету фиксируем после замера.']]}));
corePage('besplatnyj-zamer','Бесплатный замер натяжного потолка','Приедем, измерим помещение, проверим стены, профиль, трубы, свет и карниз. После замера фиксируем точную смету.');
corePage('primery-rabot','Примеры решений и работ','Показываем типовые решения: простой матовый потолок, свет, скрытый карниз, теневой профиль, ремонт, слив воды и потолки во всей квартире.', `<section class="page-section"><h2>Варианты решений</h2><div class="page-grid">${['Комната 18 м² — матовый потолок с люстрой','Кухня 10 м² — точечные светильники','Спальня — скрытый карниз и подсветка','Кухня-гостиная — световые линии','Гостиная — трековое освещение','Санузел — влагостойкое решение','Новостройка — потолки во всей квартире','Ремонт пореза','Слив воды после затопления','Дизайнерский потолок с теневым профилем'].map(x=>`<article><h3>${x}</h3><p>Задача, состав работ, срок и ориентир бюджета обсуждаем после фото или замера. Не выдаём визуализации за реальные отзывы.</p></article>`).join('')}</div></section>`);
corePage('garantiya','Гарантия на натяжные потолки и монтаж','Что покрывает гарантия, как обратиться по гарантии и почему важны договор, смета и фотоотчёт.');
corePage('dogovor','Работаем по договору','В договоре фиксируем состав работ, смету, сроки, гарантию, порядок оплаты и ответственность сторон.');
corePage('otzyvy','Отзывы клиентов','Пока собираем реальные отзывы после монтажей. Не публикуем фейковые оценки и не придумываем кейсы.', `<section class="page-section"><h2>Как собираем отзывы</h2><p>После каждого монтажа просим клиента оценить работу, прислать комментарий и разрешение на публикацию фото. До появления подтверждённых отзывов показываем только честные варианты решений.</p></section>`);
corePage('faq','Вопросы и ответы по натяжным потолкам','Большой FAQ: стоимость, замер, расчёт по фото, материалы, гарантия, свет, ремонт, слив воды и подготовка комнаты.');
corePage('raschet-po-foto','Расчёт натяжного потолка по фото','Пришлите фото комнаты, примерную площадь и пожелания — предложим 2–3 варианта потолка и дадим ориентир по бюджету.', `<section class="page-section"><h2>Что прислать</h2><ul class="page-list"><li>2–3 фото комнаты</li><li>примерную площадь</li><li>город или район</li><li>что хотите: ровный потолок, свет, карниз, ремонт</li><li>если есть — планировку или дизайн-проект</li></ul></section>`);
corePage('avito','Вы пришли с Avito? Получите расчёт потолка по фото','На Avito сложно показать все варианты и детали. Здесь можно отправить фото комнаты, получить ориентир по цене и записаться на бесплатный замер.', `<section class="page-section"><h2>Почему удобнее здесь</h2><p>Заявки с этой страницы помечаются как источник Avito. Мы видим контекст, быстрее отвечаем и можем отправить вам 2–3 варианта решения.</p></section>`);
corePage('partneram','Партнёрская программа для ремонтников, дизайнеров, электриков и риэлторов','Передавайте клиентов на натяжные потолки и получайте вознаграждение после оплаченного заказа.', `<section class="page-section"><h2>Для кого программа</h2><div class="page-grid">${['ремонтные бригады','дизайнеры интерьеров','прорабы','электрики','мебельные компании','кухни','оконные компании','риэлторы','управляющие ЖК','строительные магазины'].map(x=>`<article><h3>${x}</h3><p>Фиксируем клиента, ведём расчёт, замер, смету и монтаж.</p></article>`).join('')}</div></section>`);
corePage('dizajneram','Натяжные потолки для дизайнеров и дизайн-проектов','Реализуем потолки по дизайн-проекту: теневой профиль, световые линии, треки, скрытые карнизы, парящие потолки и сложные узлы.');
corePage('prorabam','Натяжные потолки для прорабов и ремонтных бригад','Быстро выезжаем на замер, фиксируем смету, соблюдаем сроки и не срываем этапы ремонта.');
corePage('kontakty','Контакты','Свяжитесь с нами для расчёта по фото, бесплатного замера, партнёрства или вопроса по гарантии.');

writeFile('uslugi/index.html', layout({title:`Услуги по натяжным потолкам — ${site.name}`, description:'Все услуги: потолки под ключ, матовые потолки, подсветка, световые линии, теневой профиль, ремонт и слив воды.', path:'/uslugi/', h1:'Все услуги по натяжным потолкам', lead:'Выберите задачу: простой ровный потолок, свет, карниз, теневой профиль, ремонт или слив воды.', body:`<section class="page-section"><div class="page-grid">${servicePages.map(s=>`<article><h2>${s.title}</h2><p>${s.intent}.</p><a href="/uslugi/${s.slug}/">Открыть услугу</a></article>`).join('')}</div></section>${cta()}`}));
for (const s of servicePages) {
  writeFile(`uslugi/${s.slug}/index.html`, layout({title:`${s.title} — цена, замер, монтаж под ключ`, description:`${s.title}: ${s.intent}. Расчёт по фото, бесплатный замер, договор, проверенная бригада-партнёр.`, path:`/uslugi/${s.slug}/`, h1:s.title, lead:`${s.intent}. Покажем 2–3 варианта по фото, рассчитаем ориентир по бюджету и запишем на бесплатный замер.`, body:serviceBody(s), type:'Service', faq:[['Сколько стоит? ',`Ориентир: ${s.price}. Точная сумма зависит от помещения и фиксируется после замера.`],['Можно рассчитать по фото?','Да, пришлите фото, площадь и пожелания.']]}));
}

writeFile('blog/index.html', layout({title:`Блог о натяжных потолках — ${site.name}`, description:'Статьи о цене, выборе материалов, световых линиях, теневом профиле, ремонте и подготовке к монтажу.', path:'/blog/', h1:'Блог о натяжных потолках', lead:'Пишем без воды: как выбрать потолок, понять цену, избежать доплат и подготовиться к монтажу.', body:`<section class="page-section"><div class="page-grid">${blogPosts.map(([slug,title,desc])=>`<article><h2>${title}</h2><p>${desc}</p><a href="/blog/${slug}/">Читать</a></article>`).join('')}</div></section>${cta()}`}));
for (const [slug,title,desc] of blogPosts) {
  writeFile(`blog/${slug}/index.html`, layout({title:`${title} — ${site.name}`, description:desc, path:`/blog/${slug}/`, h1:title, lead:`Короткий ответ: ${desc} Ниже — практичный разбор, ориентиры и ссылки на расчёт.`, type:'Article', body:`<section class="page-section"><h2>Коротко</h2><p>${desc} Если нужно понять стоимость именно для вашей комнаты, пришлите фото — мы подготовим 2–3 варианта.</p></section><section class="page-section"><h2>Что важно знать</h2><ul class="page-list"><li>Цена за м² редко показывает итоговую сумму.</li><li>Свет, профиль, карниз, углы и трубы считаются отдельно.</li><li>Финальная смета должна фиксироваться после замера.</li><li>Монтаж должна выполнять проверенная бригада по чек-листу.</li></ul></section>${priceTable()}<section class="page-section"><h2>Полезные ссылки</h2><p><a href="/ceny/">Цены</a> · <a href="/kalkulyator/">Калькулятор</a> · <a href="/raschet-po-foto/">Расчёт по фото</a> · <a href="/uslugi/">Все услуги</a></p></section>${faqBlock()}${cta()}`, faq:[['Как узнать цену для своей комнаты?','Пришлите фото и примерную площадь — дадим ориентир и предложим 2–3 варианта.']]}));
}

writeFile('geo/index.html', layout({title:`География работ — ${site.name}`, description:'Выезжаем на замеры по Москве и Московской области. Страницы по городам, районам и ЖК.', path:'/geo/', h1:'География работ', lead:'Выезжаем на замеры в Москве, ближайшем Подмосковье, районах и новостройках.', body:`<section class="page-section"><div class="page-grid">${geoPages.map(([slug,name])=>`<article><h2>Натяжные потолки в ${name}</h2><p>Расчёт по фото, бесплатный замер, 2–3 варианта сметы.</p><a href="/geo/${slug}/">Открыть</a></article>`).join('')}</div></section>${cta()}`}));
for (const [slug, name, city] of geoPages) {
  writeFile(`geo/${slug}/index.html`, layout({title:`Натяжные потолки в ${name} под ключ — ${site.name}`, description:`Натяжные потолки в ${name}: расчёт по фото, бесплатный замер, 2–3 варианта сметы и монтаж проверенной бригадой-партнёром.`, path:`/geo/${slug}/`, h1:`Натяжные потолки в ${name} под ключ`, lead:`Выезжаем на замеры в ${city} и рядом. Работаем с квартирами в новостройках, вторичке и коммерческими помещениями.`, body:`<section class="page-section"><h2>Какие потолки делаем в ${name}</h2><div class="page-grid">${servicePages.slice(0,8).map(s=>`<article><h3>${s.title}</h3><p>${s.intent}.</p><a href="/uslugi/${s.slug}/">Подробнее</a></article>`).join('')}</div></section>${priceTable()}${faqBlock()}${cta()}`}));
}

writeFile('zhk/index.html', layout({title:`Натяжные потолки в ЖК и новостройках — ${site.name}`, description:'Страницы для жителей ЖК: расчёт по фото или планировке, решения по комнатам, свет, карнизы и замер.', path:'/zhk/', h1:'Натяжные потолки в ЖК и новостройках', lead:'Рассчитаем потолок по фото или планировке, предложим 2–3 варианта и приедем на бесплатный замер.', body:`<section class="page-section"><div class="page-grid">${zhkPages.map(([slug,name])=>`<article><h2>ЖК ${name}</h2><p>Честная страница под расчёт по фото и планировке. Не публикуем фейковые кейсы.</p><a href="/zhk/${slug}/">Открыть</a></article>`).join('')}</div></section>${cta()}`}));
for (const [slug, name] of zhkPages) {
  writeFile(`zhk/${slug}/index.html`, layout({title:`Натяжные потолки в ЖК ${name} — ${site.name}`, description:`Натяжные потолки в ЖК ${name}: расчёт по фото или планировке, 2–3 варианта, бесплатный замер.`, path:`/zhk/${slug}/`, h1:`Натяжные потолки в ЖК ${name}`, lead:'Рассчитаем потолок по фото или планировке, предложим 2–3 варианта и приедем на бесплатный замер.', body:`<section class="page-section"><h2>Решения для типовых помещений</h2><div class="page-grid">${['кухня','спальня','санузел','коридор','кухня-гостиная'].map(x=>`<article><h3>${x}</h3><p>Подберём матовый потолок, свет, карниз, треки или теневой профиль под вашу планировку.</p></article>`).join('')}</div></section><section class="page-section"><h2>Что прислать для расчёта</h2><ul class="page-list"><li>план квартиры</li><li>фото помещения</li><li>площадь</li><li>пожелания по свету</li></ul></section>${priceTable()}${cta()}`}));
}

writeFile('thank-you/index.html', layout({title:`Спасибо! Заявка отправлена — ${site.name}`, description:'Мы получили заявку и свяжемся с вами для уточнения деталей и предварительного расчёта.', path:'/thank-you/', h1:'Спасибо! Заявка отправлена', lead:'Мы свяжемся с вами, уточним детали и подготовим предварительный расчёт.', noindex:true, showLeadForm:false, body:`<section class="page-cta"><h2>Хотите быстрее?</h2><p>Напишите нам в Telegram или WhatsApp и приложите фото комнаты.</p><div><a class="btn indigo" href="${site.telegram}">Telegram</a><a class="btn ghost" href="${site.whatsapp}">WhatsApp</a></div></section><section class="page-section"><h2>Пока ждёте</h2><p>Посмотрите <a href="/primery-rabot/">примеры решений</a>, <a href="/ceny/">цены</a> или откройте <a href="/kalkulyator/">калькулятор</a>.</p></section>`}));

const urls = ['/', '/ceny/','/kalkulyator/','/besplatnyj-zamer/','/primery-rabot/','/garantiya/','/dogovor/','/otzyvy/','/faq/','/raschet-po-foto/','/avito/','/partneram/','/dizajneram/','/prorabam/','/kontakty/','/uslugi/','/blog/','/geo/','/zhk/']
  .concat(servicePages.map(s=>`/uslugi/${s.slug}/`))
  .concat(blogPosts.map(([slug])=>`/blog/${slug}/`))
  .concat(geoPages.map(([slug])=>`/geo/${slug}/`))
  .concat(zhkPages.map(([slug])=>`/zhk/${slug}/`))
  .concat(['/privacy.html','/offer.html']);
writeFile('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url><loc>${site.url}${u}</loc><lastmod>${today}</lastmod><changefreq>${u==='/'?'weekly':'monthly'}</changefreq><priority>${u==='/'?'1.0':'0.7'}</priority></url>`).join('\n')}\n</urlset>\n`);
console.log(`Generated ${urls.length} URLs`);
