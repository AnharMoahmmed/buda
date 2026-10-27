# buda | بوضة — Premium Animated Ice Cream Website

A modern, responsive, animated website for **buda | بوضة**, crafted with React, Vite, Tailwind CSS, Framer Motion, and Lucide React.

Inspired directly by the artisanal branding reference: warm peach canvas, rich chocolate hero card, oversized commercial product photography, organic cream wave motifs, rounded pill controls, and bilingual (Arabic & English with real RTL) layout.

---

## 🍦 Features

1. **Faithful Visual Recreation of the Reference Design**:
   - Warm peach background (`#E58B68`)
   - Centered large chocolate-brown hero card with `rounded-[3rem]` and ambient flavor glow
   - Signature brand logo: `buda | بوضة` with smile curve
   - Secondary flavor cup peeking from background in the hero showcase
   - Hand-drawn doodle joy motion lines, sparkles, and doodle cup
   - Bottom organic cream wave with quality badge: *"Real Ingredients / Happier Moments"*
   - Carousel navigation controls (`<-` `->` and pagination dots)

2. **Interactive Multi-Flavor Carousel**:
   - **Belgian Chocolate** (Rich 70% dark cocoa with chocolate chunks & nibs)
   - **Bronte Pistachio** (Authentic Sicilian roasted pistachio cream with crushed nuts)
   - **Fresh Strawberry Swirl** (Sun-ripened berries with sweet cream)
   - Real-time animated transitions for product images, accent colors, taglines, and floating ingredients.

3. **Full Landing Page Sections**:
   - **Section A — Discover Our Flavors**: Filterable category grid with 6 signature flavors, tags, prices, and Quick View modal.
   - **Section B — Our Story**: Artisanal storytelling with 4 quality metrics (100% Whole Milk, 0% Artificial, Daily Fresh Churned, 12+ Flavors).
   - **Section C — Why Buda?**: 4 brand value cards highlighting pure dairy, zero preservatives, slow-churned texture, and eco packaging.
   - **Section D — Featured Product**: Editorial showcase for Chef's Special (Belgian Chocolate Noir & Sea Salt).
   - **Section E — Customer Reviews**: Testimonial carousel with customer ratings, verified badges, and favorite flavors.
   - **Section F — Visit Us & Contact**: Store hours, parlor location, direct WhatsApp order button, and contact form.
   - **Footer**: Brand links, popular flavors, copyright, and social icons.

4. **Interactive Order Bag & WhatsApp Integration**:
   - Size selection (Single Scoop, Double Scoop, 500ml Pint Tub)
   - Floating cart drawer with subtotal calculation
   - 1-click WhatsApp order generator pre-formatting the itemized order in Arabic or English.

5. **Complete English & Arabic Localization (LTR & RTL)**:
   - Dedicated translation dictionary in `src/data/translations.js`
   - Instant language switcher in header and footer
   - Automatic `dir="rtl"` and Arabic typography (`Tajawal`, `Cairo`, `Fredoka`).

---

## 🚀 Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```
