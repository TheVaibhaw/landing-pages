# 10 Free Modern Landing Page Templates (HTML, CSS, JS)

**Live demo → [thevaibhaw.github.io/landing-pages](https://thevaibhaw.github.io/landing-pages/)**

Fully responsive, ultra-modern website templates built with **plain HTML, CSS and vanilla JavaScript**: no frameworks, no build step. There are 5 e-commerce / shopping landing pages and 5 personal portfolio templates. Each one has its own colour palette, typography and animation style.

Free to use for learning, personal projects and client work.

---

## 🛍️ Shopping / E-commerce Landing Pages

| Template | Niche | Style | Live demo |
|----------|-------|-------|-----------|
| **Aurora** (LUMÉ) | Fashion | Dark glassmorphism, neon gradients, 3D tilt | [View →](https://thevaibhaw.github.io/landing-pages/shopping/aurora.html) |
| **Mint** (Verdé) | Organic grocery | Fresh greens, morphing blob, serif type | [View →](https://thevaibhaw.github.io/landing-pages/shopping/mint.html) |
| **Noir** (Maison Noir) | Luxury watches & jewellery | Black & gold, cinematic parallax | [View →](https://thevaibhaw.github.io/landing-pages/shopping/noir.html) |
| **Sunset** (KICKZ) | Sneakers & streetwear | Neo-brutalist, hard shadows, bold type | [View →](https://thevaibhaw.github.io/landing-pages/shopping/sunset.html) |
| **Ocean** (Voltix) | Electronics | Clean bento grid, gradient text | [View →](https://thevaibhaw.github.io/landing-pages/shopping/ocean.html) |

**Features:** product grid with category filters, cart drawer with fly-to-cart animation, wishlist, countdown deal, testimonial slider, newsletter form, mobile menu, and a cart saved in localStorage.

## 👤 Portfolio Templates

| Template | For | Style | Live demo |
|----------|-----|-------|-----------|
| **Terminal** | Developers | Code window that types itself, monospace | [View →](https://thevaibhaw.github.io/landing-pages/portfolio/terminal.html) |
| **Pastel Bento** | UI/UX & product designers | Bento grid hero, soft pastels | [View →](https://thevaibhaw.github.io/landing-pages/portfolio/pastel.html) |
| **Cyber Neon** | Creative developers | Synthwave grid, neon glow, glitch | [View →](https://thevaibhaw.github.io/landing-pages/portfolio/cyber.html) |
| **Editorial** | Photographers | Magazine serif, staggered gallery | [View →](https://thevaibhaw.github.io/landing-pages/portfolio/editorial.html) |
| **Mesh Glass** | Brand & 3D designers | Animated mesh gradient, glassmorphism | [View →](https://thevaibhaw.github.io/landing-pages/portfolio/mesh.html) |

**Features:** typing effect, custom cursor, magnetic buttons, project filters with popup details, animated skill bars, scroll-filling timeline, contact form with floating labels, and a menu bar that hides as you scroll down.

---

## ✨ Highlights

- 📱 **Fully responsive**: mobile, tablet and desktop
- ⚡ **Fast**: one shared CSS and JS file per collection, lazy-loaded images, scroll handling throttled with `requestAnimationFrame`
- 🎞️ **Smooth animations**: GPU-friendly transforms, scroll reveals, word-by-word headlines
- ♿ **Accessible**: semantic HTML, keyboard support, `prefers-reduced-motion` respected
- 🔍 **SEO-ready**: meta tags, Open Graph, Twitter cards, canonical URLs, sitemap
- 🧩 **Easy to customise**: change the colour tokens in CSS and the demo data in one `<script>` block per page

## 🚀 Usage

```bash
git clone https://github.com/TheVaibhaw/landing-pages.git
cd landing-pages
# open index.html in your browser, or serve locally:
python3 -m http.server 8000
```

**Customise a page:** edit the `window.SHOP` / `window.PF` object at the bottom of any page to change the products, projects, testimonials and so on. Theme colours are CSS variables under `[data-theme="..."]` in `assets/css/style.css`.

## 📁 Structure

```
landing-pages/
├── index.html            # Main gallery of all templates
├── shopping/             # 5 e-commerce landing pages
│   ├── assets/css/style.css
│   ├── assets/js/index.js
│   └── aurora.html, mint.html, noir.html, sunset.html, ocean.html
└── portfolio/            # 5 portfolio templates
    ├── assets/css/style.css
    ├── assets/js/index.js
    └── terminal.html, pastel.html, cyber.html, editorial.html, mesh.html
```

## 📝 Credits

- Placeholder images: [Picsum Photos](https://picsum.photos) · Avatars: [Pravatar](https://pravatar.cc)
- Fonts: [Google Fonts](https://fonts.google.com)
- All names, products and reviews are demo content.

## ⭐ Support

If these templates helped you, please **star the repo**. It helps others find it!

Made by [Vaibhaw Kumar](https://github.com/TheVaibhaw)
