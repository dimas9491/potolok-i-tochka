# Потолок и точка — натяжные потолки

Одностраничный сайт-лендинг для услуг по натяжным потолкам в Москве и МО.
Визуализация по фото за час → бесплатный замер → договор с фиксированной ценой.

## Структура проекта

```
/
├── index.html                  Главная (одностраничный лендинг)
├── privacy.html                Политика конфиденциальности (152-ФЗ)
├── offer.html                  Договор публичной оферты (ст. 437 ГК РФ)
├── 404.html                    Страница ошибки
├── assets/
│   ├── style.css               Стили
│   ├── main.js                 JS (формы, анимации, drawer, аналитика)
│   ├── logo.png                Логотип
│   ├── apple-touch-icon.png    Иконки
│   ├── favicon-32.png
│   ├── icon-192.png
│   └── img/                    Фото (32 шт., используются на главной)
├── favicon.ico
├── favicon-192.png
├── sitemap.xml                 Карта сайта
├── robots.txt                  Инструкции для поисковиков
└── google8d8b466a27aca686.html Подтверждение Google Search Console
```

## Что нужно настроить перед публикацией

### 1. Telegram-бот для приёма заявок

Заявки с форм отправляются в Telegram-чат через API.

1. Откройте https://t.me/BotFather, отправьте `/newbot`, получите **TG_BOT_TOKEN**
2. Напишите своему боту любое сообщение (`/start`)
3. Откройте `https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates`, найдите `"chat":{"id": ...}` — это **TG_CHAT_ID**
4. В [assets/main.js](assets/main.js) найдите `window.TG_CONFIG` и подставьте значения.

**Безопасность:** токен виден в исходниках страницы. Бот должен быть «частным» — только для приёма заявок. Если нужен закрытый токен — потребуется backend.

### 2. Юридические данные

В [privacy.html](privacy.html) и [offer.html](offer.html) заменить ФИО ИП, ИНН, ОГРНИП на реальные.

### 3. Реальный домен

В `<link rel="canonical">`, `<meta property="og:url">`, [sitemap.xml](sitemap.xml), [robots.txt](robots.txt) и в JSON-LD разметке заменить `premium-ceiling-landing.vercel.app` на актуальный домен.

### 4. Аналитика

Яндекс.Метрика уже подключена (ID 109271388 в [index.html](index.html)) — при необходимости заменить на свой счётчик.

## Локальный запуск

Из-за абсолютных путей (`/assets/...`) нужен HTTP-сервер:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Хостинг

Чистая статика, подойдёт GitHub Pages, Netlify, Vercel или любой shared-хостинг.

Для GitHub Pages: Settings → Pages → Source: `master` / `/ (root)`.

## Контакты

Telegram: [@dimasic_135](https://t.me/dimasic_135)
