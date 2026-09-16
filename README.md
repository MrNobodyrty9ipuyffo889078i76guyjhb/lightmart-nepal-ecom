# LightMart Nepal

Build LightMart, a modern, premium, fully responsive Nepalese e-commerce platform for lighting, electrical products, switches, fans, appliances, and clocks.

Visual & Brand Identity:
- Signature palette: Warm Ecru (#E8E0D0 / #F5F1EA accents), Crisp White (#FFFFFF), Bold Black (#111111) text and UI elements.
- Deep blue footer (#0A192F or #0F2038) with white text.
- Clean, minimal, premium lighting showroom aesthetic. Avoid neon colors, cartoon styles, or excessive animations.

Global Header & Navigation:
1. Top Utility Bar: Ecru background. Location "Kathmandu, Nepal", Phone "+977 9845441995", links to Login/Signup, About Us, Contact Us.
2. Main Header: Original LightMart wordmark & lighting icon logo, prominent center search bar with autocomplete suggestions, cart icon with dynamic badge and live dynamic total amount ("Rs. 0.00" updating in real-time).
3. Category Navbar: Explore (triggers a comprehensive Mega Menu with subcategories, brands, and price brackets), Light, Switch, Main (Electrical), Fan, Electric Stove, Clock. Clean horizontal desktop layout, mobile scroll/menu.

Homepage Structure:
- Sticky floating social media bar (Facebook, Instagram, TikTok, WhatsApp) visible ONLY on the homepage.
- Responsive Hero Promotional Slider (auto-advancing every 3s, manual arrows, dots, CTA buttons).
- Featured Categories grid.
- Product sections: Featured Products, New Arrivals, Best Sellers, Popular Lighting.
- Interactive Product Cards: Image, brand/category, title, price (Rs.), optional discount, Quick View modal trigger, Add to Cart button, and direct "Order on WhatsApp" button (pre-filling order message with product details to +9779845441995).
- Quick View modal with specs, gallery, and fast cart/WhatsApp action.
- Commercial Clients logo showcase carousel/grid.
- "Why Shop With LightMart?" 4-feature trust block (Quality Products, Fast Nepal Delivery, Secure Shopping, Support).
- Deep Blue multi-column footer with company info, quick links, policies, and contact.

Data & Features Architecture:
- Rich dataset of 35-45 realistic products spanning Light, Switch, Fan, Electric Stove, Clock, and Main Electrical with ratings, specs, wattage, gangs, stock, and descriptions.
- Dynamic Shopping Cart (/cart) persisted in localStorage with quantity increments/decrements, removal, delivery calculations, and grand total in NPR (Rs.).
- Seamless Checkout (/checkout) with shipping form (Kathmandu Valley & outer provinces), Order Summary, Cash on Delivery, Bank Transfer, and WhatsApp order placement.
- Dedicated Category Pages (/light, /switch, /fan, /electric-stove, /clock, /main) featuring specialized sidebar filters (wattage, color temperature, switch gang count, fan speed/power, price slider, predefined brackets, brand, in-stock toggle), sorting, and grid views.
- Dedicated Product Detail (/product/:slug) with gallery, specs table, related products, and buy/WhatsApp actions.
- Informational & Auth Pages: /about, /contact (with Kathmandu map placeholder and inquiry form), /delivery, /returns, /login, /signup, /shop, and search results page.
- Fully responsive across desktop, tablet, and mobile with drawer navigation and touch-optimized controls.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9e4b671c-dcf6-4ec8-b2c2-800fa989bcf2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
