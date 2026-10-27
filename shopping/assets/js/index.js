/* ==========================================================
   Shared behaviour for all shopping landing pages.
   Each page defines window.SHOP = { products, categories, ... }
   ========================================================== */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const shop = window.SHOP || {};
  const cur = shop.currency || '$';
  const img = (seed, w = 600, h = 660) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
  const money = n => cur + n.toFixed(2);

  const ICON = {
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
    arrow: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.5 9a9 9 0 0 1 14.8-3.4L23 10M1 14l4.6 4.4A9 9 0 0 0 20.5 15"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
  };

  /* ---------- Render demo content ---------- */
  const render = (id, html) => { const el = $(id); if (el) el.innerHTML = html; };

  render('#marquee', (() => {
    const items = (shop.brands || []).map(b => `<span>${b}</span><span>✦</span>`).join('');
    return `<div class="marquee-track">${items}${items}</div>`;
  })());

  render('#categories', (shop.categories || []).map((c, i) => `
    <a href="#shop" class="cat-card reveal" style="--d:${i * .1}s">
      <img src="${img(c.seed, 500, 660)}" alt="${c.name}" loading="lazy">
      <span class="arrow">${ICON.arrow}</span>
      <div><h3>${c.name}</h3><small>${c.count} products</small></div>
    </a>`).join(''));

  const cats = ['All', ...new Set((shop.products || []).map(p => p.cat))];
  render('#filters', cats.map((c, i) => `<button class="filter-btn${i ? '' : ' active'}" data-filter="${c}">${c}</button>`).join(''));

  render('#products', (shop.products || []).map((p, i) => `
    <article class="product reveal" style="--d:${(i % 4) * .08}s" data-cat="${p.cat}" data-id="${i}">
      <div class="product-media">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
        <button class="wish" aria-label="Add to wishlist">${ICON.heart}</button>
        <img src="${img(p.seed)}" alt="${p.name}" loading="lazy">
        <button class="quick-add" data-add="${i}">Add to cart</button>
      </div>
      <div class="product-info">
        <small>${p.cat}</small>
        <h4>${p.name}</h4>
        <div class="price-row">
          <span class="price">${money(p.price)}${p.old ? `<del>${money(p.old)}</del>` : ''}</span>
          <span class="stars">★ ${p.rating || '4.8'}</span>
        </div>
      </div>
    </article>`).join(''));

  const features = shop.features || [
    ['truck', 'Free Shipping', 'On every order over $75, worldwide.'],
    ['refresh', '30-Day Returns', 'Changed your mind? Send it back free.'],
    ['shield', 'Secure Payments', '256-bit SSL encrypted checkout.'],
    ['chat', '24/7 Support', 'Real humans, ready whenever you are.']
  ];
  render('#features', features.map(([ic, t, d], i) => `
    <div class="feature reveal" style="--d:${i * .1}s"><div class="ic">${ICON[ic]}</div><h4>${t}</h4><p>${d}</p></div>`).join(''));

  render('#testimonials', (shop.testimonials || []).map((t, i) => `
    <div class="testi">
      <span class="stars">★★★★★</span>
      <p>“${t.text}”</p>
      <div class="who"><img src="https://i.pravatar.cc/100?img=${t.img || i + 10}" alt="${t.name}" loading="lazy"><div><b>${t.name}</b><small>${t.role}</small></div></div>
    </div>`).join(''));

  /* ---------- Split hero headline into animated words ---------- */
  $$('[data-split]').forEach(el => {
    let n = 0;
    el.innerHTML = el.innerHTML.split(/(<[^>]+>|\s+)/).map(part => {
      if (!part.trim() || part.startsWith('<')) return part;
      return `<span class="split-word"><span style="animation-delay:${.15 + n++ * .08}s">${part}</span></span>`;
    }).join('');
  });

  /* ---------- Loader ---------- */
  window.addEventListener('load', () => $('.loader')?.classList.add('done'));
  setTimeout(() => $('.loader')?.classList.add('done'), 2500);

  /* ---------- Scroll: nav, progress, to-top (rAF throttled) ---------- */
  const nav = $('.nav'), bar = $('.progress'), top = $('.to-top');
  let ticking = false;
  const onScroll = () => {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    nav?.classList.toggle('scrolled', y > 20);
    top?.classList.toggle('show', y > 600);
    if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    $$('[data-parallax]').forEach(el => { el.style.transform = `translate3d(0,${y * el.dataset.parallax}px,0)`; });
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();
  top?.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Reveal on scroll + counters ---------- */
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    if (e.target.dataset.count) countUp(e.target);
    io.unobserve(e.target);
  }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal, .reveal-zoom, [data-count]').forEach(el => io.observe(el));

  function countUp(el) {
    const end = +el.dataset.count, suffix = el.dataset.suffix || '', t0 = performance.now(), dur = 1600;
    const step = now => {
      const p = Math.min((now - t0) / dur, 1), v = end * (1 - Math.pow(1 - p, 3));
      el.textContent = (end % 1 ? v.toFixed(1) : Math.round(v).toLocaleString()) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- Mobile menu ---------- */
  const menu = $('.mobile-menu');
  $('.menu-toggle')?.addEventListener('click', () => menu.classList.add('open'));
  menu?.addEventListener('click', e => { if (e.target.closest('a, .close')) menu.classList.remove('open'); });

  /* ---------- Filters ---------- */
  $('#filters')?.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn'); if (!btn) return;
    $$('.filter-btn').forEach(b => b.classList.toggle('active', b === btn));
    const f = btn.dataset.filter;
    $$('.product').forEach(p => {
      const show = f === 'All' || p.dataset.cat === f;
      p.classList.toggle('hide', !show);
      if (show) p.animate([{ opacity: 0, transform: 'scale(.94)' }, { opacity: 1, transform: 'none' }], { duration: 500, easing: 'cubic-bezier(.22,1,.36,1)' });
    });
  });

  /* ---------- Cart (persisted per page) ---------- */
  const key = 'cart:' + location.pathname;
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(key)) || []; } catch (_) {}
  const drawer = $('.drawer'), overlay = $('.overlay');

  const saveCart = () => { try { localStorage.setItem(key, JSON.stringify(cart)); } catch (_) {} };
  const drawCart = () => {
    const count = cart.reduce((a, c) => a + c.qty, 0);
    $$('.cart-count').forEach(el => { el.textContent = count; el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); });
    const body = $('.drawer-body'); if (!body) return;
    body.innerHTML = cart.length ? cart.map((c, i) => {
      const p = shop.products[c.id];
      return `<div class="drawer-item"><img src="${img(p.seed, 120, 120)}" alt=""><div><b>${p.name}</b><br><span class="muted">${c.qty} × ${money(p.price)}</span></div><button data-remove="${i}" aria-label="Remove">×</button></div>`;
    }).join('') : '<p class="empty">Your bag is empty.<br>Time to treat yourself ✨</p>';
    $('.cart-total').textContent = money(cart.reduce((a, c) => a + c.qty * shop.products[c.id].price, 0));
  };
  const openCart = open => { drawer?.classList.toggle('open', open); overlay?.classList.toggle('show', open); };

  document.addEventListener('click', e => {
    const add = e.target.closest('[data-add]');
    if (add) {
      const id = +add.dataset.add, item = cart.find(c => c.id === id);
      item ? item.qty++ : cart.push({ id, qty: 1 });
      saveCart(); drawCart(); toast(`Added “${shop.products[id].name}” to bag`);
      flyToCart(add.closest('.product')?.querySelector('img'));
    }
    const rm = e.target.closest('[data-remove]');
    if (rm) { cart.splice(+rm.dataset.remove, 1); saveCart(); drawCart(); }
    if (e.target.closest('.open-cart')) openCart(true);
    if (e.target.closest('.close-cart') || e.target === overlay) openCart(false);
    const wish = e.target.closest('.wish');
    if (wish) { wish.classList.toggle('on'); toast(wish.classList.contains('on') ? 'Saved to wishlist ♥' : 'Removed from wishlist'); }
  });
  addEventListener('keydown', e => { if (e.key === 'Escape') { openCart(false); menu?.classList.remove('open'); } });
  drawCart();

  function flyToCart(source) {
    const target = $('.open-cart');
    if (!source || !target || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const a = source.getBoundingClientRect(), b = target.getBoundingClientRect();
    const clone = source.cloneNode();
    Object.assign(clone.style, { position: 'fixed', left: a.left + 'px', top: a.top + 'px', width: a.width + 'px', height: a.height + 'px', borderRadius: '16px', zIndex: 95, pointerEvents: 'none', objectFit: 'cover' });
    document.body.appendChild(clone);
    clone.animate([
      { transform: 'none', opacity: 1 },
      { transform: `translate(${b.left - a.left - a.width / 2 + 20}px,${b.top - a.top - a.height / 2 + 20}px) scale(.06)`, opacity: .4 }
    ], { duration: 800, easing: 'cubic-bezier(.65,0,.35,1)' }).onfinish = () => clone.remove();
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $('.toast'); if (!t) return;
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
  }

  /* ---------- Newsletter ---------- */
  $$('.nl-form').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault(); f.reset(); toast('🎉 You’re in! Check your inbox for 15% off.');
  }));

  /* ---------- Button ripple ---------- */
  document.addEventListener('pointerdown', e => {
    const b = e.target.closest('.btn'); if (!b) return;
    const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height), span = document.createElement('span');
    span.className = 'ripple';
    Object.assign(span.style, { width: s + 'px', height: s + 'px', left: e.clientX - r.left - s / 2 + 'px', top: e.clientY - r.top - s / 2 + 'px' });
    b.appendChild(span); setTimeout(() => span.remove(), 600);
  });

  /* ---------- Countdown (rolls over every 3 days) ---------- */
  const cd = $('.countdown');
  if (cd) {
    const end = Math.ceil(Date.now() / 259200000) * 259200000;
    const tick = () => {
      let s = Math.max(0, Math.floor((end - Date.now()) / 1000));
      const parts = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
      cd.innerHTML = parts.map((v, i) => `<div><b>${String(v).padStart(2, '0')}</b><span>${['Days', 'Hours', 'Mins', 'Secs'][i]}</span></div>`).join('');
    };
    tick(); setInterval(tick, 1000);
  }

  /* ---------- Testimonial slider ---------- */
  const track = $('#testimonials');
  if (track) {
    let idx = 0;
    const perView = () => innerWidth <= 600 ? 1 : innerWidth <= 900 ? 2 : 3;
    const go = d => {
      const max = track.children.length - perView();
      idx = (idx + d + max + 1) % (max + 1);
      const card = track.children[0];
      track.style.transform = `translateX(-${idx * (card.offsetWidth + 24)}px)`;
    };
    $('.testi-prev')?.addEventListener('click', () => go(-1));
    $('.testi-next')?.addEventListener('click', () => go(1));
    let auto = setInterval(() => go(1), 5000);
    track.parentElement.addEventListener('pointerenter', () => clearInterval(auto));
    track.parentElement.addEventListener('pointerleave', () => { auto = setInterval(() => go(1), 5000); });
    addEventListener('resize', () => { idx = 0; go(0); });
  }

  /* ---------- Hero tilt (pointer devices only) ---------- */
  const tilt = $('[data-tilt]');
  if (tilt && matchMedia('(hover:hover)').matches) {
    tilt.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)';
    tilt.parentElement.addEventListener('pointermove', e => {
      const r = tilt.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      tilt.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    tilt.parentElement.addEventListener('pointerleave', () => { tilt.style.transform = ''; });
  }

  $$('.year').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
