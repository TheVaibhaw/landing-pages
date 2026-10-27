(() => {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const pf = window.PF || {};
  const img = (seed, w = 900, h = 680) =>
    `https://picsum.photos/seed/${seed}/${w}/${h}`;
  const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Render content ---------- */
  const render = (id, html) => {
    const el = $(id);
    if (el) el.innerHTML = html;
  };

  render(
    "#marquee",
    (() => {
      const s = (pf.marquee || [])
        .map((m) => `<span>${m}</span><span>✺</span>`)
        .join("");
      return `<div class="marquee-track">${s}${s}</div>`;
    })(),
  );

  render(
    "#skills",
    (pf.skills || [])
      .map(
        ([n, v]) => `
    <div class="skill"><div><span>${n}</span><span>${v}%</span></div><div class="bar"><i style="--w:${v}%"></i></div></div>`,
      )
      .join(""),
  );

  render(
    "#services-list",
    (pf.services || [])
      .map(
        (s, i) => `
    <div class="service reveal" style="--d:${i * 0.1}s">
      <span class="num">0${i + 1} /</span><h3>${s.title}</h3><p>${s.text}</p>
      <div class="tags">${s.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
    </div>`,
      )
      .join(""),
  );

  const cats = ["All", ...new Set((pf.projects || []).map((p) => p.cat))];
  render(
    "#filters",
    cats
      .map(
        (c, i) =>
          `<button class="filter-btn${i ? "" : " active"}" data-filter="${c}">${c}</button>`,
      )
      .join(""),
  );

  render(
    "#projects",
    (pf.projects || [])
      .map(
        (p, i) => `
    <article class="project reveal" style="--d:${(i % 2) * 0.12}s" data-cat="${p.cat}" data-open="${i}" tabindex="0" role="button" aria-label="Open ${p.title}">
      <div class="project-media"><img src="${img(p.seed)}" alt="${p.title}" loading="lazy"><span class="view">View</span></div>
      <div class="project-info"><div><h3>${p.title}</h3><small>${p.cat} · ${p.client}</small></div><span class="yr">${p.year}</span></div>
    </article>`,
      )
      .join(""),
  );

  render(
    "#timeline",
    '<span class="fill"></span>' +
      (pf.timeline || [])
        .map(
          (t) => `
    <div class="tl-item reveal"><span class="when">${t.when}</span><h3>${t.role}</h3><h4>${t.org}</h4><p>${t.text}</p></div>`,
        )
        .join(""),
  );

  render(
    "#testimonials",
    (pf.testimonials || [])
      .map(
        (t, i) => `
    <div class="testi reveal" style="--d:${i * 0.1}s"><div class="q">“</div><p>${t.text}</p>
      <div class="who"><img src="https://i.pravatar.cc/100?img=${t.img}" alt="${t.name}" loading="lazy"><div><b>${t.name}</b><small>${t.role}</small></div></div></div>`,
      )
      .join(""),
  );

  /* ---------- Split headline words ---------- */
  $$("[data-split]").forEach((el) => {
    let n = 0;
    el.innerHTML = el.innerHTML
      .split(/(<[^>]+>|\s+)/)
      .map((part) => {
        if (!part.trim() || part.startsWith("<")) return part;
        return `<span class="split-word"><span style="animation-delay:${0.5 + n++ * 0.09}s">${part}</span></span>`;
      })
      .join("");
  });

  /* ---------- Preloader ---------- */
  const pre = $(".preloader");
  const hidePre = () => pre?.classList.add("done");
  addEventListener("load", () => setTimeout(hidePre, 350));
  setTimeout(hidePre, 2500);

  /* ---------- Typing effect ---------- */
  const typed = $(".typed");
  if (typed && pf.roles) {
    let r = 0,
      c = 0,
      del = false;
    const loop = () => {
      const word = pf.roles[r];
      typed.textContent = word.slice(0, (c += del ? -1 : 1));
      let wait = del ? 40 : 90;
      if (!del && c === word.length) {
        del = true;
        wait = 1600;
      } else if (del && c === 0) {
        del = false;
        r = (r + 1) % pf.roles.length;
        wait = 300;
      }
      setTimeout(loop, wait);
    };
    calm ? (typed.textContent = pf.roles[0]) : loop();
  }

  /* ---------- Scroll: nav hide/show, progress, active link, timeline ---------- */
  const nav = $(".nav"),
    bar = $(".progress"),
    top = $(".to-top"),
    tl = $("#timeline"),
    fill = $("#timeline .fill");
  const sections = $$("section[id]"),
    links = $$(".nav-links a");
  let lastY = 0,
    ticking = false;
  const onScroll = () => {
    const y = scrollY,
      max = document.documentElement.scrollHeight - innerHeight;
    nav?.classList.toggle("scrolled", y > 30);
    nav?.classList.toggle(
      "hidden",
      y > lastY && y > 400 && !$(".mobile-menu.open"),
    );
    lastY = y;
    top?.classList.toggle("show", y > 700);
    if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    const current = sections.filter((s) => s.offsetTop - 160 <= y).pop();
    links.forEach((a) =>
      a.classList.toggle(
        "active",
        !!current && a.getAttribute("href") === "#" + current.id,
      ),
    );
    if (tl && fill) {
      const r = tl.getBoundingClientRect(),
        p = Math.min(Math.max((innerHeight * 0.6 - r.top) / r.height, 0), 1);
      fill.style.height = p * (r.height - 12) + "px";
    }
    $$("[data-parallax]").forEach((el) => {
      el.style.transform = `translate3d(0,${y * el.dataset.parallax}px,0)`;
    });
    ticking = false;
  };
  addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true },
  );
  onScroll();
  top?.addEventListener("click", () =>
    scrollTo({ top: 0, behavior: "smooth" }),
  );

  /* ---------- Reveal + counters ---------- */
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        if (e.target.dataset.count) countUp(e.target);
        io.unobserve(e.target);
      }),
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );
  $$(".reveal, .img-reveal, [data-count]").forEach((el) => io.observe(el));

  function countUp(el) {
    const end = +el.dataset.count,
      suf = el.dataset.suffix || "",
      t0 = performance.now();
    const step = (now) => {
      const p = Math.min((now - t0) / 1800, 1),
        v = end * (1 - Math.pow(1 - p, 4));
      el.textContent = Math.round(v) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- Mobile menu ---------- */
  const burger = $(".burger"),
    menu = $(".mobile-menu");
  const toggleMenu = (open) => {
    burger?.classList.toggle("open", open);
    menu?.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger?.addEventListener("click", () =>
    toggleMenu(!menu.classList.contains("open")),
  );
  menu?.addEventListener("click", (e) => {
    if (e.target.closest("a")) toggleMenu(false);
  });

  /* ---------- Project filters ---------- */
  $("#filters")?.addEventListener("click", (e) => {
    const b = e.target.closest(".filter-btn");
    if (!b) return;
    $$(".filter-btn").forEach((x) => x.classList.toggle("active", x === b));
    $$(".project").forEach((p) => {
      const show =
        b.dataset.filter === "All" || p.dataset.cat === b.dataset.filter;
      p.classList.toggle("hide", !show);
      if (show)
        p.animate(
          [
            { opacity: 0, transform: "translateY(30px)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 600, easing: "cubic-bezier(.22,1,.36,1)" },
        );
    });
  });

  /* ---------- Project modal ---------- */
  const modal = $(".modal");
  const openModal = (i) => {
    const p = pf.projects[i];
    $(".modal-content").innerHTML =
      `<img src="${img(p.seed, 1200, 675)}" alt="${p.title}">
      <div class="modal-body"><h3>${p.title}</h3><p>${p.text}</p>
      <div class="modal-meta"><div><b>Client</b>${p.client}</div><div><b>Year</b>${p.year}</div><div><b>Role</b>${p.cat}</div></div>
      <div class="tags" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:22px">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      <a href="#" class="btn btn-primary">View live project ↗</a></div>`;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    modal?.classList.remove("open");
    document.body.style.overflow = "";
  };
  document.addEventListener("click", (e) => {
    const card = e.target.closest("[data-open]");
    if (card) openModal(+card.dataset.open);
    if (e.target === modal || e.target.closest(".modal-close")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      toggleMenu(false);
    }
    if (e.key === "Enter" && e.target.matches("[data-open]"))
      openModal(+e.target.dataset.open);
  });

  /* ---------- Contact form ---------- */
  let tt;
  const toast = (msg) => {
    const t = $(".toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(tt);
    tt = setTimeout(() => t.classList.remove("show"), 2800);
  };
  $(".cform")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const b = e.target.querySelector("[type=submit]"),
      label = b.innerHTML;
    b.innerHTML = "Sending…";
    b.disabled = true;
    setTimeout(() => {
      e.target.reset();
      b.innerHTML = label;
      b.disabled = false;
      toast("✓ Thanks! I’ll get back to you within 24 hours.");
    }, 1100);
  });

  /* ---------- Spotlight on service cards ---------- */
  $$(".service").forEach((s) =>
    s.addEventListener("pointermove", (e) => {
      const r = s.getBoundingClientRect();
      s.style.setProperty("--mx", e.clientX - r.left + "px");
      s.style.setProperty("--my", e.clientY - r.top + "px");
    }),
  );

  /* ---------- Custom cursor + magnetic buttons (fine pointers only) ---------- */
  if (fine && !calm) {
    const ring = $(".cursor"),
      dot = $(".cursor-dot");
    if (ring && dot) {
      let mx = innerWidth / 2,
        my = innerHeight / 2,
        rx = mx,
        ry = my;
      addEventListener("pointermove", (e) => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.transform = `translate(${mx - 3}px,${my - 3}px)`;
      });
      const follow = () => {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
        requestAnimationFrame(follow);
      };
      follow();
      dot.style.left = dot.style.top = ring.style.left = ring.style.top = "0";
      document.addEventListener("pointerover", (e) =>
        ring.classList.toggle(
          "hover",
          !!e.target.closest("a,button,[data-open],label"),
        ),
      );
    }
    $$(".magnetic").forEach((m) => {
      m.addEventListener("pointermove", (e) => {
        const r = m.getBoundingClientRect();
        m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px,${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
      });
      m.addEventListener("pointerleave", () => {
        m.style.transform = "";
      });
    });
    const tilt = $("[data-tilt]");
    tilt?.parentElement.addEventListener("pointermove", (e) => {
      const r = tilt.getBoundingClientRect(),
        x = (e.clientX - r.left) / r.width - 0.5,
        y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });
    tilt?.parentElement.addEventListener("pointerleave", () => {
      tilt.style.transform = "";
    });
  }

  $$(".year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
