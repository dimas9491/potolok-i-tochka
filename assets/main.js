/* =========================================================
   Потолок и точка — main.js
   Общий скрипт всех страниц.
   ВАЖНО: вставьте свой TELEGRAM токен и chat_id в CONFIG ниже.
   ========================================================= */

/* ----- 1. КОНФИГ TELEGRAM ----- */
/* Как получить токен и chat_id:
   1. Откройте https://t.me/BotFather → команда /newbot → задайте имя
   2. BotFather пришлёт строку вида "1234567890:AAH..." — это TG_BOT_TOKEN
   3. Напишите своему боту любое сообщение (хотя бы "/start")
   4. Откройте в браузере: https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates
   5. Найдите "chat":{"id": ЦИФРЫ ...} — это TG_CHAT_ID
   6. Подставьте значения ниже. Не публикуйте бота с правами админа в чужие чаты —
      токен виден в исходниках страницы.                                    */
window.TG_CONFIG = {
  TG_BOT_TOKEN: '8918616271:AAH10t5FA8iCshQKGFI2lKJgtVZVecO9Jws',  // бот @huiuoutt_bot
  TG_CHAT_ID:   '8406991490',                                       // личный чат @dimasic_135
  SITE_NAME:    'Потолок и точка'
};

(function(){
  'use strict';

  var isTouch = window.matchMedia('(hover:none)').matches;
  var $  = function(sel, ctx){ return (ctx||document).querySelector(sel); };
  var $$ = function(sel, ctx){ return Array.prototype.slice.call((ctx||document).querySelectorAll(sel)); };

  /* ----- 2. PROGRESS BAR ----- */
  var prog = $('#progress');
  if(prog){
    function onScroll(){
      var h = document.documentElement;
      var sc = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      prog.style.transform = 'scaleX('+sc+')';
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  /* ----- 3. REVEAL ON SCROLL ----- */
  if('IntersectionObserver' in window){
    var ro = new IntersectionObserver(function(ents){
      ents.forEach(function(e){
        if(e.isIntersecting){
          e.target.classList.add('in');
          ro.unobserve(e.target);
        }
      });
    }, {rootMargin:'0px 0px -10% 0px'});
    $$('.reveal').forEach(function(s){ ro.observe(s); });
    $$('.reveal-stagger').forEach(function(s){ ro.observe(s); });
  }

  /* ----- 4. COUNT-UP для чисел ----- */
  if('IntersectionObserver' in window){
    var countObserver = new IntersectionObserver(function(ents){
      ents.forEach(function(e){
        if(!e.isIntersecting) return;
        var el = e.target;
        var target = parseFloat(el.dataset.count || el.textContent || '0');
        var duration = parseInt(el.dataset.duration || '1400', 10);
        var prefix = el.dataset.prefix || '';
        var suffix = el.dataset.suffix || '';
        var start = performance.now();
        function tick(now){
          var p = Math.min(1, (now - start) / duration);
          var eased = 1 - Math.pow(1 - p, 3);
          var v = Math.floor(target * eased);
          el.textContent = prefix + v.toLocaleString('ru-RU') + suffix;
          if(p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      });
    }, {rootMargin:'0px 0px -20% 0px'});
    $$('[data-count]').forEach(function(el){ countObserver.observe(el); });
  }

  /* ----- 5. MAGNETIC BUTTONS ----- */
  if(!isTouch){
    $$('.btn').forEach(function(btn){
      btn.addEventListener('mousemove', function(e){
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width/2;
        var y = e.clientY - r.top - r.height/2;
        btn.style.transform = 'translate('+(x*0.12)+'px,'+(y*0.16)+'px)';
      });
      btn.addEventListener('mouseleave', function(){ btn.style.transform=''; });
    });
  }

  /* ----- 6. MOBILE DRAWER ----- */
  var burger = $('#burger');
  var drawer = $('#drawer');
  var backdrop = $('#drawerBackdrop');
  var drawerClose = $('#drawerClose');
  function openDrawer(){
    drawer.classList.add('open'); backdrop.classList.add('open');
    burger.classList.add('active'); burger.setAttribute('aria-expanded','true');
    drawer.setAttribute('aria-hidden','false');
    document.body.classList.add('lock');
  }
  function closeDrawer(){
    drawer.classList.remove('open'); backdrop.classList.remove('open');
    burger.classList.remove('active'); burger.setAttribute('aria-expanded','false');
    drawer.setAttribute('aria-hidden','true');
    document.body.classList.remove('lock');
  }
  if(burger && drawer){
    burger.addEventListener('click', function(){
      drawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });
    if(backdrop) backdrop.addEventListener('click', closeDrawer);
    if(drawerClose) drawerClose.addEventListener('click', closeDrawer);
    $$('[data-close]', drawer).forEach(function(a){
      a.addEventListener('click', closeDrawer);
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });
    window.addEventListener('resize', function(){
      if(window.innerWidth > 1080 && drawer.classList.contains('open')) closeDrawer();
    });
  }

  /* ----- 7. PORTFOLIO FILTER ----- */
  var filterBtns = $$('.filter-btn');
  var cards = $$('.pf');
  if(filterBtns.length){
    filterBtns.forEach(function(b){
      b.addEventListener('click', function(){
        filterBtns.forEach(function(x){ x.classList.remove('active'); });
        b.classList.add('active');
        var f = b.dataset.f;
        cards.forEach(function(c){
          var cats = c.dataset.cat || '';
          c.style.display = (f === 'all' || cats.indexOf(f) >= 0) ? '' : 'none';
        });
      });
    });
  }

  /* ----- 8. SEGMENT TABS ----- */
  var st = $('#segTabs');
  if(st){
    st.addEventListener('click', function(e){
      var b = e.target.closest('button'); if(!b) return;
      $$('button', st).forEach(function(x){ x.classList.remove('active'); });
      $$('.seg-panel').forEach(function(p){ p.classList.remove('active'); });
      b.classList.add('active');
      var panel = document.getElementById(b.dataset.p);
      if(panel) panel.classList.add('active');
    });
  }

  /* ----- 9. FAQ OPEN STATE ----- */
  $$('.faq').forEach(function(d){
    d.addEventListener('toggle', function(){
      d.classList.toggle('open', d.open);
    });
  });

  /* ----- 10. HERO TILT (mouse parallax) ----- */
  var heroMedia = $('.hero-media');
  var hero = $('.hero');
  if(heroMedia && hero && !isTouch){
    hero.addEventListener('mousemove', function(e){
      var r = heroMedia.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width/2) / r.width;
      var y = (e.clientY - r.top - r.height/2) / r.height;
      heroMedia.style.transform =
        'perspective(1200px) rotateY('+(x*3)+'deg) rotateX('+(-y*3)+'deg)';
    });
    hero.addEventListener('mouseleave', function(){ heroMedia.style.transform=''; });
  }

  /* ----- 11. PARALLAX BLOBS ----- */
  var blobs = $$('.blob');
  if(blobs.length && !isTouch){
    window.addEventListener('scroll', function(){
      var y = window.scrollY;
      blobs.forEach(function(b, i){
        var speed = (i === 0) ? 0.15 : -0.1;
        b.style.transform = 'translateY('+(y * speed)+'px)';
      });
    }, {passive:true});
  }

  /* ----- 12. TELEGRAM SUBMIT ----- */
  function fmtField(label, value){
    return value ? ('<b>'+label+':</b> '+value) : '';
  }
  function sendToTelegram(payload){
    var cfg = window.TG_CONFIG || {};
    if(!cfg.TG_BOT_TOKEN || cfg.TG_BOT_TOKEN === 'PASTE_YOUR_BOT_TOKEN_HERE'){
      console.warn('[Потолок и точка] TG_BOT_TOKEN не настроен — заявка не отправлена. См. инструкцию в assets/main.js');
      return Promise.resolve({ok:false, mock:true});
    }
    var url = 'https://api.telegram.org/bot' + cfg.TG_BOT_TOKEN + '/sendMessage';
    return fetch(url, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        chat_id: cfg.TG_CHAT_ID,
        text: payload,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    }).then(function(r){ return r.json(); });
  }
  window.sendToTelegram = sendToTelegram;

  /* ----- 13. ОБРАБОТКА ФОРМ ----- */
  $$('form[data-tg-form]').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get('name') || '').trim();
      var contact = (data.get('contact') || '').trim();
      var area = (data.get('area') || '').trim();
      var stage = (data.get('stage') || '').trim();
      var source = form.dataset.source || (location.pathname || '/');

      var msg = '<b>🏠 Новая заявка — ' + (window.TG_CONFIG.SITE_NAME || 'Сайт') + '</b>\n\n' +
        fmtField('Имя', name) + '\n' +
        fmtField('Контакт', contact) + '\n' +
        fmtField('Площадь, м²', area) + '\n' +
        fmtField('Что есть', stage) + '\n\n' +
        '<i>Источник: ' + source + '</i>\n' +
        '<i>Время: ' + new Date().toLocaleString('ru-RU') + '</i>';

      var btn = form.querySelector('button[type="submit"]');
      var origText = btn ? btn.innerHTML : '';
      if(btn){ btn.disabled = true; btn.innerHTML = 'Отправляем…'; }

      sendToTelegram(msg).then(function(res){
        if(res && (res.ok || res.mock)){
          form.querySelector('.thanks') && (form.querySelector('.thanks').style.display = 'block');
          form.querySelector('.body')   && (form.querySelector('.body').style.display   = 'none');
          // отметим в analytics, если подключите
          if(window.ym){ try{ window.ym(0,'reachGoal','lead'); }catch(e){} }
        } else {
          alert('Не удалось отправить заявку. Напишите нам в Telegram @dimasic_135 или WhatsApp.');
          if(btn){ btn.disabled = false; btn.innerHTML = origText; }
        }
      }).catch(function(){
        alert('Не удалось отправить заявку. Напишите нам в Telegram @dimasic_135 или WhatsApp.');
        if(btn){ btn.disabled = false; btn.innerHTML = origText; }
      });
    });
  });

  /* ----- 14. ЛИД-МАГНИТ «5 ошибок» — отправка контакта ----- */
  var leadForm = $('#leadMagnetForm');
  if(leadForm){
    leadForm.addEventListener('submit', function(e){
      e.preventDefault();
      var contact = (leadForm.querySelector('input[name="contact"]').value || '').trim();
      if(!contact){ return; }
      var msg = '<b>📥 Запрос гайда «5 ошибок при выборе натяжного потолка»</b>\n\n' +
        '<b>Контакт:</b> ' + contact + '\n' +
        '<i>Откуда: ' + (location.pathname || '/') + '</i>';
      var btn = leadForm.querySelector('button[type="submit"]');
      var orig = btn.innerHTML;
      btn.disabled = true; btn.innerHTML = 'Отправляем…';
      sendToTelegram(msg).then(function(){
        var ok = $('#leadMagnetOk');
        if(ok){
          ok.style.display = 'flex';
          leadForm.style.display = 'none';
        }
      }).catch(function(){
        alert('Не удалось отправить. Напишите в Telegram @dimasic_135');
        btn.disabled = false; btn.innerHTML = orig;
      });
    });
  }

  /* ----- 15. COOKIE BANNER ----- */
  try {
    if(!localStorage.getItem('cookies_ok')){
      var bar = document.createElement('div');
      bar.className = 'cookie-bar';
      bar.innerHTML = ''
        + '<div class="cookie-bar-text">Мы используем cookies — это нужно для работы сайта и анализа посещаемости. Оставаясь на сайте, вы соглашаетесь с <a href="/privacy.html">политикой конфиденциальности</a>.</div>'
        + '<button class="cookie-bar-btn" type="button">Согласен</button>';
      document.body.appendChild(bar);
      requestAnimationFrame(function(){ bar.classList.add('show'); });
      bar.querySelector('button').addEventListener('click', function(){
        try { localStorage.setItem('cookies_ok','1'); } catch(e){}
        bar.classList.remove('show');
        setTimeout(function(){ bar.remove(); }, 350);
      });
    }
  } catch(e){}

  /* ----- 16. SMOOTH SCROLL для #anchor ----- */
  document.addEventListener('click', function(e){
    var a = e.target.closest('a[href^="#"]');
    if(!a) return;
    var href = a.getAttribute('href');
    if(href.length < 2 || href === '#') return;
    var target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });

  /* ----- 17. ЛОГИРУЕМ ГОД В FOOTER ----- */
  $$('[data-year]').forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

})();
