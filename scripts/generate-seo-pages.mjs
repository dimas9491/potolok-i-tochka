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
  {slug:'natyazhnye-potolki-v-moskve', name:'Москве', city:'Москва', group:'Москва', note:'Работаем по всем округам: от обычных квартир до дизайн-проектов с карнизами, треками и теневым профилем.'},
  {slug:'natyazhnye-potolki-v-moskovskoj-oblasti', name:'Московской области', city:'Московская область', group:'Подмосковье', note:'Выезжаем в ближайшие города МО, заранее уточняем адрес, парковку, пропуск и удобный слот замера.'},
  {slug:'natyazhnye-potolki-v-krasnogorske', name:'Красногорске', city:'Красногорск', group:'Подмосковье', note:'Часто считают потолки для новостроек, квартир с панорамными окнами и кухонь-гостиных.'},
  {slug:'natyazhnye-potolki-v-himkah', name:'Химках', city:'Химки', group:'Подмосковье', note:'Поможем подобрать базовый потолок, скрытый карниз или трековый свет для квартиры в новостройке.'},
  {slug:'natyazhnye-potolki-v-balashihe', name:'Балашихе', city:'Балашиха', group:'Подмосковье', note:'Рассчитываем комнаты, кухни, санузлы и квартиры целиком по фото или планировке.'},
  {slug:'natyazhnye-potolki-v-mytishchah', name:'Мытищах', city:'Мытищи', group:'Подмосковье', note:'Подберём решение для вторички, новостройки или квартиры под сдачу без фейковой цены за м².'},
  {slug:'natyazhnye-potolki-v-reutove', name:'Реутове', city:'Реутов', group:'Подмосковье', note:'Удобно считать по фото: быстро понимаем площадь, свет, углы, трубы и уровень решения.'},
  {slug:'natyazhnye-potolki-v-lyubercah', name:'Люберцах', city:'Люберцы', group:'Подмосковье', note:'Делаем спокойные матовые потолки, потолки со светом, карнизы и ремонт полотна.'},
  {slug:'natyazhnye-potolki-v-odincovo', name:'Одинцово', city:'Одинцово', group:'Подмосковье', note:'Для квартир в новых домах удобно прислать планировку: рассчитаем комнаты по зонам.'},
  {slug:'natyazhnye-potolki-v-dolgoprudnom', name:'Долгопрудном', city:'Долгопрудный', group:'Подмосковье', note:'Подберём решение с учётом света, карнизов, мебели и сроков следующего этапа ремонта.'},
  {slug:'natyazhnye-potolki-v-vidnom', name:'Видном', city:'Видное', group:'Подмосковье', note:'Считаем как отдельные комнаты, так и квартиры целиком после приёмки.'},
  {slug:'natyazhnye-potolki-v-kotelnikah', name:'Котельниках', city:'Котельники', group:'Подмосковье', note:'Поможем сравнить базовый, оптимальный и дизайнерский вариант до выезда на замер.'},
  {slug:'natyazhnye-potolki-v-podolsk', name:'Подольске', city:'Подольск', group:'Подмосковье', note:'По дальним адресам условия выезда и слот замера согласуем заранее, без сюрпризов.'},
  {slug:'natyazhnye-potolki-v-domodedovo', name:'Домодедово', city:'Домодедово', group:'Подмосковье', note:'Подходит для квартир, домов и коммерческих помещений, где важен понятный расчёт.'},
  {slug:'natyazhnye-potolki-v-koroleve', name:'Королёве', city:'Королёв', group:'Подмосковье', note:'Для расчёта пришлите фото, площадь, желаемый свет и сроки ремонта.'},
  {slug:'natyazhnye-potolki-v-pushkino', name:'Пушкино', city:'Пушкино', group:'Подмосковье', note:'Сделаем предварительный расчёт по фото и объясним, что влияет на смету.'},
  {slug:'natyazhnye-potolki-v-nahabino', name:'Нахабино', city:'Нахабино', group:'Подмосковье', note:'Учитываем пропуска, парковку, лифты и возможность заноса материала в новостройках.'},
  {slug:'natyazhnye-potolki-v-putilkovo', name:'Путилково', city:'Путилково', group:'Подмосковье', note:'Популярны матовые потолки, скрытые карнизы, точечный свет и трековое освещение.'},
  {slug:'natyazhnye-potolki-v-skolkovo', name:'Сколково', city:'Сколково', group:'Подмосковье', note:'Чаще нужны аккуратные решения для современных квартир: тень, карниз, треки, свет.'},
  {slug:'natyazhnye-potolki-v-zelenograde', name:'Зеленограде', city:'Зеленоград', group:'Москва', note:'Выезд и сроки согласуем по адресу, расчёт можно начать с фото комнаты.'},
  {slug:'natyazhnye-potolki-v-kommunarke', name:'Коммунарке', city:'Коммунарка', group:'Новая Москва', note:'Много квартир после приёмки: удобно считать по планировке и фото пустых помещений.'},
  {slug:'natyazhnye-potolki-v-troicke', name:'Троицке', city:'Троицк', group:'Новая Москва', note:'Для Новой Москвы заранее согласуем логистику замера и дату монтажа.'},
  {slug:'natyazhnye-potolki-v-shcherbinke', name:'Щербинке', city:'Щербинка', group:'Новая Москва', note:'Подберём потолки по комнатам: кухня, спальня, коридор, санузел или вся квартира.'},
  {slug:'natyazhnye-potolki-v-vnukovo', name:'Внуково', city:'Внуково', group:'Новая Москва', note:'Рассчитываем решения для новостроек, квартир под себя и квартир под аренду.'},
  {slug:'natyazhnye-potolki-v-moskovskom', name:'Московском', city:'Московский', group:'Новая Москва', note:'Можно прислать план квартиры: подготовим смету по помещениям и свету.'},
  {slug:'natyazhnye-potolki-v-mitino', name:'Митино', city:'Митино', group:'Районы Москвы', note:'Популярны ровные матовые потолки, скрытые карнизы, подсветка и точечный свет.'},
  {slug:'natyazhnye-potolki-v-krylatskom', name:'Крылатском', city:'Крылатское', group:'Районы Москвы', note:'Для ремонтов “для себя” часто выбирают теневой профиль, карниз и спокойный матовый потолок.'},
  {slug:'natyazhnye-potolki-v-strogino', name:'Строгино', city:'Строгино', group:'Районы Москвы', note:'Считаем потолки для комнат, кухонь-гостиных и квартир с нестандартным светом.'},
  {slug:'natyazhnye-potolki-v-tushino', name:'Тушино', city:'Тушино', group:'Районы Москвы', note:'Поможем выбрать между базовым потолком, точками, треками и скрытым карнизом.'},
  {slug:'natyazhnye-potolki-v-kurkino', name:'Куркино', city:'Куркино', group:'Районы Москвы', note:'Подходит для квартир и таунхаусов, где важны аккуратные примыкания и контроль сроков.'},
  {slug:'natyazhnye-potolki-v-horoshevo-mnevniki', name:'Хорошёво-Мнёвниках', city:'Хорошёво-Мнёвники', group:'Районы Москвы', note:'Часто считают современные решения: треки, световые линии, тень, карниз.'},
  {slug:'natyazhnye-potolki-v-presnenskom-rajone', name:'Пресненском районе', city:'Пресненский район', group:'Районы Москвы', note:'Для квартир бизнес-класса заранее согласуем узлы, свет, карнизы и пропуск на объект.'},
  {slug:'natyazhnye-potolki-v-hamovnikah', name:'Хамовниках', city:'Хамовники', group:'Районы Москвы', note:'Аккуратно работаем с дизайн-проектами, светом, теневым профилем и скрытыми карнизами.'},
  {slug:'natyazhnye-potolki-v-ramenkah', name:'Раменках', city:'Раменки', group:'Районы Москвы', note:'Подберём решение для новостройки, вторички или дизайнерского ремонта.'},
  {slug:'natyazhnye-potolki-v-fili-davydkovo', name:'Фили-Давыдково', city:'Фили-Давыдково', group:'Районы Москвы', note:'Для расчёта по фото учитываем углы, трубы, карниз, свет и состояние стен.'},
  {slug:'natyazhnye-potolki-v-dorogomilovo', name:'Дорогомилово', city:'Дорогомилово', group:'Районы Москвы', note:'Часто нужны аккуратные потолки в квартирах с высокими требованиями к примыканиям.'},
  {slug:'natyazhnye-potolki-v-begovom-rajone', name:'Беговом районе', city:'Беговой район', group:'Районы Москвы', note:'Подберём базовый или дизайнерский сценарий под ремонт, свет и бюджет.'},
  {slug:'natyazhnye-potolki-v-aeroporte', name:'Аэропорте', city:'Аэропорт', group:'Районы Москвы', note:'Рассчитываем комнаты, кухни и квартиры целиком, смету фиксируем после замера.'},
  {slug:'natyazhnye-potolki-v-sokole', name:'Соколе', city:'Сокол', group:'Районы Москвы', note:'Поможем сделать аккуратный потолок без визуального шума или проектное решение со светом.'},
  {slug:'natyazhnye-potolki-v-hovrino', name:'Ховрино', city:'Ховрино', group:'Районы Москвы', note:'Популярны потолки с точечным светом, карнизами и спокойным матовым полотном.'},
  {slug:'natyazhnye-potolki-v-savjolovskom-rajone', name:'Савёловском районе', city:'Савёловский район', group:'Районы Москвы', note:'Удобно начать с фото: покажем 2–3 решения и порядок бюджета.'},
  {slug:'natyazhnye-potolki-v-marfino', name:'Марфино', city:'Марфино', group:'Районы Москвы', note:'Считаем потолки для новостроек и вторички, объясняем, где можно сэкономить.'},
  {slug:'natyazhnye-potolki-v-alekseevskom-rajone', name:'Алексеевском районе', city:'Алексеевский район', group:'Районы Москвы', note:'Подберём свет, карниз и профиль под мебель, шторы и будущий интерьер.'},
  {slug:'natyazhnye-potolki-v-otradnom', name:'Отрадном', city:'Отрадное', group:'Районы Москвы', note:'Сделаем понятный расчёт для спальни, кухни, коридора или всей квартиры.'},
  {slug:'natyazhnye-potolki-v-sviblovo', name:'Свиблово', city:'Свиблово', group:'Районы Москвы', note:'Покажем, чем отличается базовый потолок от решения со светом и карнизом.'},
  {slug:'natyazhnye-potolki-v-izmajlovo', name:'Измайлово', city:'Измайлово', group:'Районы Москвы', note:'Для вторички заранее учитываем трубы, вентиляцию, старое основание и кривизну стен.'},
  {slug:'natyazhnye-potolki-v-sokolnikah', name:'Сокольниках', city:'Сокольники', group:'Районы Москвы', note:'Рассчитываем аккуратные матовые потолки и современные решения со светом.'},
  {slug:'natyazhnye-potolki-v-lefortovo', name:'Лефортово', city:'Лефортово', group:'Районы Москвы', note:'Популярны решения для новостроек: скрытый карниз, точки, тень и треки.'},
  {slug:'natyazhnye-potolki-v-nizhegorodskom-rajone', name:'Нижегородском районе', city:'Нижегородский район', group:'Районы Москвы', note:'Подберём решение под быстрый ремонт, квартиру под себя или коммерческое помещение.'},
  {slug:'natyazhnye-potolki-v-tekstilshchikah', name:'Текстильщиках', city:'Текстильщики', group:'Районы Москвы', note:'Считаем как простые потолки, так и варианты со светом и скрытым карнизом.'},
  {slug:'natyazhnye-potolki-v-pechatnikah', name:'Печатниках', city:'Печатники', group:'Районы Москвы', note:'Учитываем вентиляцию, трубы, санузлы, кухни и сложные углы.'},
  {slug:'natyazhnye-potolki-v-danilovskom-rajone', name:'Даниловском районе', city:'Даниловский район', group:'Районы Москвы', note:'Для современных ЖК часто нужны треки, световые линии, карниз и теневой профиль.'},
  {slug:'natyazhnye-potolki-v-nagatino-sadovnikah', name:'Нагатино-Садовниках', city:'Нагатино-Садовники', group:'Районы Москвы', note:'Подберём потолок для кухни, спальни, санузла или всей квартиры.'},
  {slug:'natyazhnye-potolki-v-donskom-rajone', name:'Донском районе', city:'Донской район', group:'Районы Москвы', note:'Согласуем потолок с электрикой, мебелью, шторами и сроками ремонта.'},
  {slug:'natyazhnye-potolki-v-obruchevskom-rajone', name:'Обручевском районе', city:'Обручевский район', group:'Районы Москвы', note:'Популярны потолки “для себя”: матовое полотно, свет, карниз, тень.'},
  {slug:'natyazhnye-potolki-v-konkovo', name:'Коньково', city:'Коньково', group:'Районы Москвы', note:'Покажем варианты по фото и объясним, где экономия не испортит результат.'},
  {slug:'natyazhnye-potolki-v-yasenevo', name:'Ясенево', city:'Ясенево', group:'Районы Москвы', note:'Считаем потолки для отдельных комнат и квартир целиком с фиксированной сметой.'},
  {slug:'natyazhnye-potolki-v-severnom-butovo', name:'Северном Бутово', city:'Северное Бутово', group:'Районы Москвы', note:'Подберём базовый, оптимальный или дизайнерский вариант под ваш ремонт.'},
  {slug:'natyazhnye-potolki-v-yuzhnom-butovo', name:'Южном Бутово', city:'Южное Бутово', group:'Районы Москвы', note:'Для расчёта пришлите фото, площадь, желаемый свет и примерные сроки.'},
  {slug:'natyazhnye-potolki-v-tyoplom-stane', name:'Тёплом Стане', city:'Тёплый Стан', group:'Районы Москвы', note:'Работаем с комнатами, кухнями, санузлами и сложными узлами по дизайн-проекту.'}
];

const zhkPages = [
  {slug:'natyazhnye-potolki-v-zhk-simvol', name:'Символ', area:'Лефортово', note:'часто выбирают современный свет, теневой профиль и скрытый карниз'},
  {slug:'natyazhnye-potolki-v-zhk-seliger-siti', name:'Селигер Сити', area:'Дмитровский район', note:'удобно считать по планировке квартиры и фото после приёмки'},
  {slug:'natyazhnye-potolki-v-zhk-lyublinskij-park', name:'Люблинский парк', area:'Люблино', note:'популярны матовые потолки, точки и решения без переплаты'},
  {slug:'natyazhnye-potolki-v-zhk-zilart', name:'ЗИЛАРТ', area:'Даниловский район', note:'для современных интерьеров часто нужны треки, линии и теневое примыкание'},
  {slug:'natyazhnye-potolki-v-zhk-ostrov', name:'Остров', area:'Мнёвниковская пойма', note:'важно заранее согласовать свет, карниз, кондиционирование и проектные узлы'},
  {slug:'natyazhnye-potolki-v-zhk-serdce-stolicy', name:'Сердце Столицы', area:'Хорошёво-Мнёвники', note:'подходит для квартир с панорамными окнами, треками и скрытыми карнизами'},
  {slug:'natyazhnye-potolki-v-zhk-headliner', name:'Headliner', area:'Шелепиха', note:'часто нужны аккуратные решения для кухни-гостиной и спальни'},
  {slug:'natyazhnye-potolki-v-zhk-vesterdam', name:'Вестердам', area:'Аминьевское шоссе', note:'считаем по комнатам: базовый, оптимальный и дизайнерский сценарий'},
  {slug:'natyazhnye-potolki-v-zhk-nebo', name:'Небо', area:'Раменки', note:'для квартир бизнес-класса заранее согласуем свет, карниз и теневой профиль'},
  {slug:'natyazhnye-potolki-v-zhk-metropoliya', name:'Метрополия', area:'Южнопортовый район', note:'подходит для трекового света, световых линий и скрытых карнизов'},
  {slug:'natyazhnye-potolki-v-zhk-level-michurinskij', name:'Level Мичуринский', area:'Очаково-Матвеевское', note:'удобно считать по планировке и фото, особенно до начала чистовой отделки'},
  {slug:'natyazhnye-potolki-v-zhk-level-nagatinskaya', name:'Level Нагатинская', area:'Нагатино-Садовники', note:'часто выбирают точечный свет, треки и спокойное матовое полотно'},
  {slug:'natyazhnye-potolki-v-zhk-level-yuzhnoportovaya', name:'Level Южнопортовая', area:'Южнопортовый район', note:'можем предложить 2–3 схемы света по фото кухни-гостиной'},
  {slug:'natyazhnye-potolki-v-zhk-level-streshnevo', name:'Level Стрешнево', area:'Покровское-Стрешнево', note:'для современных планировок заранее считаем карнизы, свет и тень'},
  {slug:'natyazhnye-potolki-v-zhk-level-nizhegorodskaya', name:'Level Нижегородская', area:'Нижегородский район', note:'подходит для быстрого расчёта по планировке и фото помещений'},
  {slug:'natyazhnye-potolki-v-zhk-level-prichalnyj', name:'Level Причальный', area:'Шелепиха', note:'часто нужны аккуратные узлы у окон, карнизы и архитектурный свет'},
  {slug:'natyazhnye-potolki-v-zhk-shagal', name:'Shagal', area:'ЗИЛ', note:'для квартир после приёмки удобно считать потолки сразу по всем помещениям'},
  {slug:'natyazhnye-potolki-v-zhk-portland', name:'Portland', area:'Печатники', note:'подберём потолки для кухни-гостиной, спальни, санузла и коридора'},
  {slug:'natyazhnye-potolki-v-zhk-river-park', name:'River Park', area:'Нагатинский Затон', note:'часто выбирают скрытый карниз, подсветку у окна и матовое полотно'},
  {slug:'natyazhnye-potolki-v-zhk-beregovoj', name:'Береговой', area:'Филёвский Парк', note:'важны точность примыканий, свет и согласование с дизайн-проектом'},
  {slug:'natyazhnye-potolki-v-zhk-badaevskij', name:'Бадаевский', area:'Кутузовский проспект', note:'страница для предварительного расчёта по проекту, фото или планировке'},
  {slug:'natyazhnye-potolki-v-zhk-sobytie', name:'Событие', area:'Раменки', note:'подходит для скрытых карнизов, трекового света и теневого профиля'},
  {slug:'natyazhnye-potolki-v-zhk-will-towers', name:'Will Towers', area:'Раменки', note:'для высоких требований к интерьеру заранее разбираем узлы и сценарии света'},
  {slug:'natyazhnye-potolki-v-zhk-hide', name:'Hide', area:'Раменки', note:'считаем дизайнерские решения со светом, тенью, карнизами и треками'},
  {slug:'natyazhnye-potolki-v-zhk-kutuzovskij-12', name:'Кутузовский 12', area:'Дорогомилово', note:'поможем оценить бюджет сложных потолков до выезда на замер'},
  {slug:'natyazhnye-potolki-v-zhk-sadovye-kvartaly', name:'Садовые кварталы', area:'Хамовники', note:'для проектных ремонтов согласуем профиль, свет, карниз и материалы'},
  {slug:'natyazhnye-potolki-v-zhk-rezidencii-arhitektorov', name:'Резиденции Архитекторов', area:'Басманный район', note:'часто важны спокойные фактуры, аккуратное примыкание и контроль сроков'},
  {slug:'natyazhnye-potolki-v-zhk-skandinaviya', name:'Скандинавия', area:'Коммунарка', note:'удобно считать потолки по планировке квартиры и очередности ремонта'},
  {slug:'natyazhnye-potolki-v-zhk-ispanskie-kvartaly', name:'Испанские кварталы', area:'Коммунарка', note:'популярны матовые потолки, скрытые карнизы и точки по комнатам'},
  {slug:'natyazhnye-potolki-v-zhk-prokshino', name:'Прокшино', area:'Новая Москва', note:'рассчитаем квартиру после приёмки по фото и планировке'},
  {slug:'natyazhnye-potolki-v-zhk-buninskie-luga', name:'Бунинские луга', area:'Новая Москва', note:'подберём потолки для типовых комнат без лишней сложности'},
  {slug:'natyazhnye-potolki-v-zhk-novoe-vnukovo', name:'Новое Внуково', area:'Внуково', note:'для Новой Москвы заранее уточняем логистику замера и монтажный слот'},
  {slug:'natyazhnye-potolki-v-zhk-pervyj-moskovskij', name:'Первый Московский', area:'Московский', note:'можно прислать планировку и получить смету по помещениям'},
  {slug:'natyazhnye-potolki-v-zhk-salarevo-park', name:'Саларьево Парк', area:'Саларьево', note:'популярны базовые потолки, точки, карнизы и ремонт полотна'},
  {slug:'natyazhnye-potolki-v-zhk-desnareche', name:'Деснаречье', area:'Новая Москва', note:'подберём потолок под этап ремонта, мебель и свет'},
  {slug:'natyazhnye-potolki-v-zhk-novoe-vidnoe', name:'Новое Видное', area:'Видное', note:'часто считают квартиры целиком: кухня, спальни, коридор и санузлы'},
  {slug:'natyazhnye-potolki-v-zhk-eko-vidnoe-2', name:'Эко Видное 2.0', area:'Видное', note:'поможем сравнить базовый и оптимальный варианты без фейковой цены за м²'},
  {slug:'natyazhnye-potolki-v-zhk-prigorod-lesnoe', name:'Пригород Лесное', area:'Ленинский округ', note:'удобно считать по фото, если ремонт только начинается'},
  {slug:'natyazhnye-potolki-v-zhk-lyubercy-park', name:'Люберцы Парк', area:'Люберцы', note:'подходит для матовых потолков, точек и скрытых карнизов'},
  {slug:'natyazhnye-potolki-v-zhk-tomilino-park', name:'Томилино Парк', area:'Томилино', note:'считаем отдельные комнаты и всю квартиру по планировке'},
  {slug:'natyazhnye-potolki-v-zhk-pehra', name:'Пехра', area:'Балашиха', note:'подберём потолки под бюджет: от базового до решения со светом'},
  {slug:'natyazhnye-potolki-v-zhk-izmajlovskij-les', name:'Измайловский лес', area:'Балашиха', note:'популярны ровные потолки, точки и скрытые карнизы'},
  {slug:'natyazhnye-potolki-v-zhk-odincovo-1', name:'Одинцово-1', area:'Одинцово', note:'рассчитаем потолки по комнатам, свету и желаемому уровню решения'},
  {slug:'natyazhnye-potolki-v-zhk-skolkovskij', name:'Сколковский', area:'Одинцово', note:'часто нужны современные решения с карнизами, светом и тенью'},
  {slug:'natyazhnye-potolki-v-zhk-rublevskij-kvartal', name:'Рублёвский квартал', area:'Западное направление', note:'для проектных ремонтов заранее согласуем технические узлы'},
  {slug:'natyazhnye-potolki-v-zhk-mjakinino-park', name:'Мякинино Парк', area:'Красногорск', note:'подходит для расчёта по фото и планировке после приёмки'},
  {slug:'natyazhnye-potolki-v-zhk-sputnik', name:'Спутник', area:'Строгино / Мякинино', note:'популярны карнизы, точки и световые сценарии для кухни-гостиной'},
  {slug:'natyazhnye-potolki-v-zhk-opaliha-o3', name:'Опалиха О3', area:'Красногорск', note:'считаем квартиры, кухни, спальни и санузлы по фото'},
  {slug:'natyazhnye-potolki-v-zhk-ilinskie-luga', name:'Ильинские луга', area:'Красногорск', note:'подберём решение под новостройку и сроки ремонта'},
  {slug:'natyazhnye-potolki-v-zhk-bolshoe-putilkovo', name:'Большое Путилково', area:'Путилково', note:'поможем сравнить матовый потолок, точки, карниз и подсветку'},
  {slug:'natyazhnye-potolki-v-zhk-tushino-2018', name:'Город на реке Тушино-2018', area:'Покровское-Стрешнево', note:'часто нужны треки, световые линии, тень и скрытые карнизы'},
  {slug:'natyazhnye-potolki-v-zhk-alia', name:'ALIA', area:'Покровское-Стрешнево', note:'подходит для современных интерьеров с архитектурным светом'},
  {slug:'natyazhnye-potolki-v-zhk-primavera', name:'Primavera', area:'Покровское-Стрешнево', note:'заранее согласуем профиль, свет, карниз и примыкания'},
  {slug:'natyazhnye-potolki-v-zhk-now', name:'NOW', area:'Нагатинский Затон', note:'рассчитаем потолки для квартиры с учётом света и мебели'},
  {slug:'natyazhnye-potolki-v-zhk-dream-towers', name:'Dream Towers', area:'Нагатинский Затон', note:'подберём 2–3 решения под дизайн, сроки и бюджет'},
  {slug:'natyazhnye-potolki-v-zhk-sydney-city', name:'Sydney City', area:'Хорошёво-Мнёвники', note:'часто выбирают аккуратные узлы, трековый свет и скрытый карниз'},
  {slug:'natyazhnye-potolki-v-zhk-festival-park', name:'Фестиваль Парк', area:'Левобережный район', note:'считаем потолки по комнатам и сценариям света'},
  {slug:'natyazhnye-potolki-v-zhk-baltijskij', name:'Балтийский', area:'Войковский район', note:'подберём решение для спальни, кухни, коридора и санузла'},
  {slug:'natyazhnye-potolki-v-zhk-dmitrovskoe-nebo', name:'Дмитровское небо', area:'Дмитровский район', note:'удобно начать с фото и планировки квартиры'},
  {slug:'natyazhnye-potolki-v-zhk-fizteh-siti', name:'ФизтехСити', area:'Долгопрудный', note:'рассчитаем потолки для новостройки, квартиры под себя или аренду'}
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
  <div><h5>Навигация</h5><ul><li><a href="/ceny/">Цены</a></li><li><a href="/kalkulyator/">Калькулятор</a></li><li><a href="/raschet-po-foto/">Расчёт по фото</a></li><li><a href="/geo/">География</a></li><li><a href="/zhk/">ЖК и новостройки</a></li><li><a href="/avito/">Для Avito</a></li><li><a href="/blog/">Блог</a></li></ul></div>
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

const geoGroups = [...new Set(geoPages.map(g => g.group))];
writeFile('geo/index.html', layout({title:`География работ — ${site.name}`, description:'Выезжаем на замеры по Москве, районам, Новой Москве и ближайшему Подмосковью. Страницы по городам, районам и ЖК.', path:'/geo/', h1:'География работ', lead:'Выезжаем на замеры в Москве, ближайшем Подмосковье, районах и новостройках. Выберите свой район или город и пришлите фото комнаты для предварительного расчёта.', body:`${geoGroups.map(group=>`<section class="page-section"><h2>${group}</h2><div class="page-grid">${geoPages.filter(g=>g.group===group).map(g=>`<article><h2>Натяжные потолки в ${g.name}</h2><p>${g.note}</p><a href="/geo/${g.slug}/">Открыть</a></article>`).join('')}</div></section>`).join('')}${cta()}`}));
for (const geo of geoPages) {
  const relatedGeo = geoPages.filter(g => g.group === geo.group && g.slug !== geo.slug).slice(0, 6);
  writeFile(`geo/${geo.slug}/index.html`, layout({title:`Натяжные потолки в ${geo.name} под ключ — ${site.name}`, description:`Натяжные потолки в ${geo.name}: расчёт по фото, бесплатный замер, 2–3 варианта сметы и монтаж проверенной бригадой-партнёром.`, path:`/geo/${geo.slug}/`, h1:`Натяжные потолки в ${geo.name} под ключ`, lead:`Выезжаем на замеры в ${geo.city} и рядом. ${geo.note} Работаем с квартирами в новостройках, вторичке и коммерческими помещениями.`, body:`<section class="page-section"><h2>Какие потолки делаем в ${geo.name}</h2><div class="page-grid">${servicePages.slice(0,8).map(s=>`<article><h3>${s.title}</h3><p>${s.intent}.</p><a href="/uslugi/${s.slug}/">Подробнее</a></article>`).join('')}</div></section><section class="page-section"><h2>Что важно для выезда</h2><ul class="page-list"><li>точный адрес и удобное время замера</li><li>фото комнаты или планировка</li><li>пожелания по свету и шторам</li><li>нужен ли пропуск, парковка или согласование с управляющей компанией</li></ul></section>${priceTable()}${faqBlock()}<section class="page-section"><h2>Рядом также считаем</h2><div class="page-grid">${relatedGeo.map(g=>`<article><h3>Натяжные потолки в ${g.name}</h3><p>${g.note}</p><a href="/geo/${g.slug}/">Открыть</a></article>`).join('')}</div></section>${cta()}`}));
}

const zhkGroups = [...new Set(zhkPages.map(z => z.area))];
writeFile('zhk/index.html', layout({title:`Натяжные потолки в ЖК и новостройках — ${site.name}`, description:'Страницы для жителей ЖК: расчёт по фото или планировке, решения по комнатам, свет, карнизы и замер.', path:'/zhk/', h1:'Натяжные потолки в ЖК и новостройках', lead:'Рассчитаем потолок по фото или планировке, предложим 2–3 варианта и приедем на бесплатный замер. Страницы ЖК сделаны для удобного расчёта, без фейковых отзывов и выдуманных объектов.', body:`<section class="page-section"><h2>ЖК по районам и направлениям</h2><div class="page-grid">${zhkGroups.map(group=>`<article><h3>${group}</h3><p>${zhkPages.filter(z=>z.area===group).slice(0,4).map(z=>`ЖК ${z.name}`).join(', ')}</p></article>`).join('')}</div></section><section class="page-section"><h2>Все ЖК</h2><div class="page-grid">${zhkPages.map(z=>`<article><h2>ЖК ${z.name}</h2><p>${z.area}: ${z.note}. Честная страница под расчёт по фото и планировке.</p><a href="/zhk/${z.slug}/">Открыть</a></article>`).join('')}</div></section>${cta()}`}));
for (const zhk of zhkPages) {
  const relatedZhk = zhkPages.filter(z => z.area === zhk.area && z.slug !== zhk.slug).slice(0, 6);
  const relatedBlock = relatedZhk.length ? `<section class="page-section"><h2>Другие ЖК рядом</h2><div class="page-grid">${relatedZhk.map(z=>`<article><h3>ЖК ${z.name}</h3><p>${z.note}.</p><a href="/zhk/${z.slug}/">Открыть</a></article>`).join('')}</div></section>` : '';
  writeFile(`zhk/${zhk.slug}/index.html`, layout({title:`Натяжные потолки в ЖК ${zhk.name} — ${site.name}`, description:`Натяжные потолки в ЖК ${zhk.name}: расчёт по фото или планировке, 2–3 варианта, бесплатный замер.`, path:`/zhk/${zhk.slug}/`, h1:`Натяжные потолки в ЖК ${zhk.name}`, lead:`Рассчитаем потолок по фото или планировке квартиры в ЖК ${zhk.name}. Для ${zhk.area} ${zhk.note}; предложим 2–3 варианта и приедем на бесплатный замер.`, body:`<section class="page-section"><h2>Для каких помещений считаем</h2><div class="page-grid">${['кухня','спальня','санузел','коридор','кухня-гостиная','вся квартира'].map(x=>`<article><h3>${x}</h3><p>Подберём матовый потолок, свет, карниз, треки или теневой профиль под вашу планировку.</p></article>`).join('')}</div></section><section class="page-section"><h2>Что прислать для расчёта</h2><ul class="page-list"><li>план квартиры или экспликацию</li><li>фото помещения после приёмки</li><li>примерную площадь по комнатам</li><li>пожелания по свету, шторам и карнизам</li><li>если есть — дизайн-проект или референсы</li></ul></section><section class="page-section"><h2>Честно про эту страницу</h2><p>Это посадочная страница для жителей ЖК ${zhk.name}. Мы не публикуем фейковые отзывы и не утверждаем, что уже выполняли работы в этом доме, если это не подтверждено реальным объектом. Задача страницы — быстро принять фото или планировку и подготовить понятный расчёт.</p></section>${priceTable()}${relatedBlock}${cta(`Пришлите планировку ЖК ${zhk.name} — рассчитаем 2–3 варианта`)}`}));
}

writeFile('thank-you/index.html', layout({title:`Спасибо! Заявка отправлена — ${site.name}`, description:'Мы получили заявку и свяжемся с вами для уточнения деталей и предварительного расчёта.', path:'/thank-you/', h1:'Спасибо! Заявка отправлена', lead:'Мы свяжемся с вами, уточним детали и подготовим предварительный расчёт.', noindex:true, showLeadForm:false, body:`<section class="page-cta"><h2>Хотите быстрее?</h2><p>Напишите нам в Telegram или WhatsApp и приложите фото комнаты.</p><div><a class="btn indigo" href="${site.telegram}">Telegram</a><a class="btn ghost" href="${site.whatsapp}">WhatsApp</a></div></section><section class="page-section"><h2>Пока ждёте</h2><p>Посмотрите <a href="/primery-rabot/">примеры решений</a>, <a href="/ceny/">цены</a> или откройте <a href="/kalkulyator/">калькулятор</a>.</p></section>`}));

const urls = ['/', '/ceny/','/kalkulyator/','/besplatnyj-zamer/','/primery-rabot/','/garantiya/','/dogovor/','/otzyvy/','/faq/','/raschet-po-foto/','/avito/','/partneram/','/dizajneram/','/prorabam/','/kontakty/','/uslugi/','/blog/','/geo/','/zhk/']
  .concat(servicePages.map(s=>`/uslugi/${s.slug}/`))
  .concat(blogPosts.map(([slug])=>`/blog/${slug}/`))
  .concat(geoPages.map(g=>`/geo/${g.slug}/`))
  .concat(zhkPages.map(z=>`/zhk/${z.slug}/`))
  .concat(['/privacy.html','/offer.html']);
writeFile('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url><loc>${site.url}${u}</loc><lastmod>${today}</lastmod><changefreq>${u==='/'?'weekly':'monthly'}</changefreq><priority>${u==='/'?'1.0':'0.7'}</priority></url>`).join('\n')}\n</urlset>\n`);
console.log(`Generated ${urls.length} URLs`);
